import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import {
    ORDER_COOKIE,
    GQL_FETCH_HEADERS,
    EVENT_ATTRIBUTES
} from '../utils/constants';

const { REACT_APP_APOLLO_URI } = process.env;
const cookies = new Cookies();
const order = cookies.get(ORDER_COOKIE) || {events: {}};
const cookiePath = { path: '/' };

export const slice = createSlice({
    name: 'order',
    initialState: {
        order
    },
    reducers: {
        createOrUpdateOrder: (state, action) => {
            const { orderData } = action.payload;

            state.order = Object.assign(orderData, { events: {} });
            cookies.set(ORDER_COOKIE, state.order, cookiePath);
        },
        addTicketsToOrder: (state, action) => {
            const { event } = action.payload;

            state.order.events[event.id] = event;
            cookies.set(ORDER_COOKIE, state.order, cookiePath);
        },
        removeTicketsFromOrderEvent: (state, action) => {
            const { eventId, ticketCount } = action.payload;
            const eventTickets = state.order.events[eventId].available_tickets;

            if (eventTickets.length <= ticketCount) {
                delete state.order.events[eventId];
            } else {
                state.order.events[eventId].available_tickets.splice(-ticketCount, ticketCount);
            }

            cookies.set(ORDER_COOKIE, state.order, cookiePath);
        },
        finalizeOrder: async state => new Promise(resolve => {
            state.order = {};
            cookies.remove(ORDER_COOKIE, cookiePath);
            resolve();
        })
    },
});

export const {
    createOrUpdateOrder,
    addTicketsToOrder,
    finalizeOrder,
    removeTicketsFromOrderEvent,
} = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//     setTimeout(() => {
//         dispatch(incrementByAmount(amount));
//     }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectOrder = state => state.order;

export default slice.reducer;

// Asynchronus Thunk logic
const userQuery = userEmail => `
    query userQuery {
      users(limit: 1, where: { email: { _eq: "${userEmail}"}}){
        id
        orders(limit: 1, where: { status: { _eq: 2}}) {
            id
        }
      }
    }
`;

const CREATE_ORDER = (userId, orderId) => `
    mutation createOrder {
      insert_orders(objects: [{
        ${orderId ? `id: ${orderId},` : ''}
        ${userId ? `user: ${userId},` : ''}
        status: 2
      }], on_conflict: {constraint: orders_pkey, update_columns: [id]}) {
        returning {
          id
        }
      }
    }
`;

export const updateOrderById = (userEmail, idToken) => async (dispatch) => {
    return new Promise(async resolve => {
        // Headers are shared across fetch requests
        const headers = GQL_FETCH_HEADERS({ idToken });

        // Query to get user with pending order id's
        const userRes = await fetch(REACT_APP_APOLLO_URI, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query: userQuery( userEmail ) })
        });
        const { data: userData } = await userRes.json();

        // User/Order id's are not required for anonymous checkout
        let userId;
        let orderId;

        if (userData && userData.users && userData.users.length) {
            const user = userData.users[0];
            userId = user.id;

            const [ order ] = user.orders;
            if (order) orderId = order.id;
        }

        const orderQuery = CREATE_ORDER(userId, orderId);

        // update or create order
        const orderRes = await fetch(REACT_APP_APOLLO_URI, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query: orderQuery })
        });
        const orderJson = await orderRes.json();

        try {
            const { data: { insert_orders: { returning: [ upsertedOrder ] }}} = orderJson;

            // update store
            dispatch(createOrUpdateOrder({ orderData: upsertedOrder }))
            resolve();
        } catch (err) {
            console.error(err);
        }
    });
};

const GET_TICKETS_FOR_EVENT = (eventId, ticketCount) => `
    query getAvailableTicketsForEvent {
        events_by_pk(id: ${eventId}) {
            ${EVENT_ATTRIBUTES}
            venueByVenue {
              name
            }
            addressByAddress {
                address_1
                address_2
                city
                state
                zip
            }
            available_tickets(limit: ${ticketCount}) {
                id
                price
            }
        }
    }
`;

const UPDATE_TICKET_ORDER = (tickets, orderId) => `
    mutation updateTicketOrder {
        update_tickets(where: { _and: {id: { _in: [${tickets}]}}}, _set: { order: ${orderId}}) {
            affected_rows
        }
    }
`;

export const addTickets = (eventId, ticketCount, idToken) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        const query = GET_TICKETS_FOR_EVENT(eventId, ticketCount);
        const headers = GQL_FETCH_HEADERS({ idToken })
        const res = await fetch(REACT_APP_APOLLO_URI, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query })
        });

        const { data: { events_by_pk: event } } = await res.json();
        if (!event.available_tickets.length) return reject(new Error('No tickets available for this event'));

        // Update tickets with order
        const { order } = getState().order;
        const ticketQuery = UPDATE_TICKET_ORDER(event.available_tickets.map(t => t.id), order.id);

        await fetch(REACT_APP_APOLLO_URI, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query: ticketQuery })
        });

        dispatch(addTicketsToOrder({ event }));

        resolve();
    });
};

const GET_TICKETS_TO_REMOVE = (eventId, ticketCount) =>`
    query getTicketsToRemove {
        tickets(where: { event: { _eq: ${eventId} }}, limit: ${ticketCount}) {
            id
        }
    }
`;

const REMOVE_TICKETS_FROM_ORDER = (ticketIds) => `
    mutation removeTicketsFromOrder($ticketIds: [Int!]) {
      update_tickets(where: {
        id: {
          _in: ${ticketIds}
        }
      }, _set: { order: null }) {
        returning {
          id
        }
      }
    }
`;

export const removeTickets = (eventId, ticketCount, idToken) => dispatch => new Promise(async (resolve, reject) => {
    try {
        const headers = GQL_FETCH_HEADERS({ idToken });
        let query = GET_TICKETS_TO_REMOVE(eventId, ticketCount);
        const ticketRes = await fetch(REACT_APP_APOLLO_URI, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query })
        });
        const { data: ticketData } = await ticketRes.json();

        if (!ticketData || !ticketData.tickets) return reject(new Error('No ticket data returned for ticket remove'));

        query = REMOVE_TICKETS_FROM_ORDER(ticketData.tickets.map(t => t.id));
        await fetch(REACT_APP_APOLLO_URI, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query })
        });

        dispatch(removeTicketsFromOrderEvent({ eventId, ticketCount }));

        resolve();
    } catch (err) {
        reject(err);
    }
})

