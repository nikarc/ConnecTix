import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import {
    ORDER_COOKIE,
} from '../utils/constants';

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

