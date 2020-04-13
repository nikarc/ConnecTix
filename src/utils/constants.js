/* GraphQL */
export const EVENT_ATTRIBUTES = `
    id
	date
	image
	title
	description
    venueByVenue {
      name
    }
`;
export const GQL_FETCH_HEADERS = ({ idToken }) => ({
    'Authorization': `Bearer ${idToken}`,
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
    'Content-Type': 'application/json'
});

/* Cookies */
export const COOKIE_EXPIRES = 30; // days
export const TICKET_COOKIE = 'tickets';
export const ORDER_COOKIE = 'order';
