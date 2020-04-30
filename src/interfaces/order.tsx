export interface Order {
    id: number
    order_status: {
        type: string
    }
    total: number
    confirmation: string
    tickets: [{
        id: number
        price: number
    }]
}
