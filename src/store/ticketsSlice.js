import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { TICKET_COOKIE } from '../utils/constants';

const cookies = new Cookies();
const ticketsCookie = cookies.get(TICKET_COOKIE) || {};

export const slice = createSlice({
    name: 'tickets',
    initialState: {
        events: ticketsCookie
    },
    reducers: {
        updateForEvent: (state, action) => {
            const { eventId, events_by_pk } = action.payload;
            if (!state.events[eventId]) state.events[eventId] = Object.assign(events_by_pk, { tickets: [] });

            state.events[eventId].tickets.push(...events_by_pk.available_tickets);
            cookies.set(TICKET_COOKIE, JSON.stringify(state.events), { path: '/' });
        },
        removeTicket: (state, { payload }) => {
            const { eventId } = payload;
            const ticketCookie = cookies.get(TICKET_COOKIE);

            if (state.events[eventId].tickets.length) {
                state.events[eventId].tickets.pop();
                ticketCookie[eventId].tickets.pop();
                cookies.set(TICKET_COOKIE, JSON.stringify(ticketCookie), { path: '/' })
            }
        }
    },
});

export const { updateForEvent, removeTicket } = slice.actions;

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
export const selectTickets = state => state.tickets.events;

export default slice.reducer;
