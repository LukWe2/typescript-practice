import { orders } from "./data.js";
import { calculateOrderTotal, cancelOrder, getCustomerSummary, getOrdersAboveTotal, getOrdersByStatus, payOrder, shipOrder } from "./orderService.js";


function main() {

    // const firstOrder: Order | undefined -> müssen erst prüfen ob Array Element existiert um es zu benutzen
    const firstOrder = orders[0];

    if (firstOrder !== undefined){

        console.log("Total of first order: ", calculateOrderTotal(firstOrder));
    }

    const pendingOrders = getOrdersByStatus(orders, "pending");
    console.log("Pending orders: ", pendingOrders);

    console.log("Original unpayed order: ", orders[0]);
    const nowPayedOrder = payOrder(orders, 1, "2026-10-08");
    console.log("Now newly payed order: ", nowPayedOrder);

    console.log("Original unshipped order: ", orders[1]);
    const nowShippedOrder = shipOrder(orders, 2, "2026-10-08");
    console.log("Now newly shipped order: ", nowShippedOrder);

    console.log("Original uncancelled order: ", orders[4]);
    const nowCancelledOrder = cancelOrder(orders, 5, "2026-10-08", "No longer needed");
    console.log("Now newly cancelled order: ", nowCancelledOrder);

    const customerSummary = getCustomerSummary(orders, "Lukas");
    console.log("Customer Summary: ", customerSummary);

    const ordersAboveTotal = getOrdersAboveTotal(orders, 150);
    console.log("Orders above total: ", ordersAboveTotal);
    
    console.log("Original orders: ", orders);
};

main();