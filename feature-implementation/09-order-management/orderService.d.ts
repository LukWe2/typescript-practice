import type { Order } from "./types.js";
export declare function calculateOrderTotal(order: Order): number;
export declare function getOrdersByStatus(orders: Order[], status: Order["status"]): Order[];
export declare function payOrder(orders: Order[], orderId: number, paidAt: string): Order[];
export declare function shipOrder(orders: Order[], orderId: number, shippedAt: string): Order[];
export declare function cancelOrder(orders: Order[], orderId: number, cancelledAt: string, reason: string): Order[];
type CustomerSummary = {
    customer: string;
    orderCount: number;
    totalSpent: number;
    activeOrderCount: number;
};
export declare function getCustomerSummary(orders: Order[], customer: string): CustomerSummary;
export declare function getOrdersAboveTotal(orders: Order[], minimumTotal: number): Order[];
export {};
//# sourceMappingURL=orderService.d.ts.map