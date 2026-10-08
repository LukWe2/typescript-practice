export type OrderItem = {
    productId: number;
    name: string;
    unitPrice: number;
    quantity: number;
};

type OrderBase = {
    id: number;
    customer: string;
    items: OrderItem[];
};

export type PendingOrder = OrderBase & {
    status: "pending";
};

export type PaidOrder = OrderBase & {
    status: "paid";
    paidAt: string;
};

export type ShippedOrder = OrderBase & {
    status: "shipped";
    paidAt: string;
    shippedAt: string;
};

export type CancelledOrder = OrderBase & {
    status: "cancelled";
    cancelledAt: string;
    reason: string;
};

export type Order =
    | PendingOrder
    | PaidOrder
    | ShippedOrder
    | CancelledOrder;