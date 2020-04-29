import { Venue } from './venue'
import { Ticket } from './ticket'
import { Address } from './address'

export interface Event {
    id: number
    date: string
    image: string
    title: string
    description: string
    venueByVenueId: Venue
    available_tickets?: [Ticket]
    addressByAddressId?: Address
}

export interface Events {
    [key: string]: Event
}
