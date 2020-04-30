import { Order } from './order'

export interface User {
    id: number
    email: string
    picture: string
    name: string
    orders: [Order]
}
