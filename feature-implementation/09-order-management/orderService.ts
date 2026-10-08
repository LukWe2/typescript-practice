import type { CancelledOrder, Order, PaidOrder, ShippedOrder } from "./types.js";

export function calculateOrderTotal(order: Order): number {

    let orderTotal = 0;

    for (const item of order.items) {
        orderTotal += item.unitPrice * item.quantity;
    }

    return orderTotal;
};

export function getOrdersByStatus(orders: Order[], status: Order["status"]): Order[] {

    const filteredOrders = orders.filter((order) => {

        return order.status === status;
    });

    return filteredOrders;
};

export function payOrder(orders: Order[], orderId: number, paidAt: string): Order[] {

    // .find() returned erstes Element das zutrifft auf die Bedingung und gibt ein Order Objekt zurück, kein Order[] Array, da wir nur das eine Objekt suchen passt das
    // und gibt Oder | undefined zurück was ebenfalls convenient ist, weil wir so direkt prüfen können wenn es undefined ist, gibt es kein Order Objekt mit dieser ID
    const desiredOrder = orders.find((order) => {

        return order.id === orderId;
    });


    if (desiredOrder !== undefined && desiredOrder.status === "pending"){

        // Struggle damit wie ich jetzt den einen Order den wir hier mit desiredOrder haben verändern (verändern eigentlich nicht sondern erzeugen eine veränderte Kopie) und das paidAt Property einfügen, dachte auch mit { ...desiredOrder, paidAt: paidAt } oder so

        // explizit als PaidOrder typisieren, weil TypeScript sonst beim neu erstellten
        // Objekt status: "paid" zu status: string widen kann.
        // Für die discriminated Union Order muss status aber exakt der Literal-Typ
        // "paid" sein, damit das Objekt als PaidOrder erkannt wird.
        const paidOrder: PaidOrder = {

            // hier ist desiredOrder ein Order Objekt bzw. genauer ein PendingOrder Objekt, deswegen kopieren wir es so hinein mit dem Spread Operator ...
            // kopieren mit Spread ...desiredOrder das originale PendingOrder Order in neues Order Objekt und überschreiben dann den status zu "paid" statt "pending" und fügen paidAt Property noch hinzu
            ...desiredOrder,
            status: "paid",
            paidAt: paidAt
        };
       
        // das ist falsch, weil durch die geschweiften Klammern {} ein neues Objekt erstellt wird
        // und kein neues Array. Der Spread ...orders verteilt die Elemente des Arrays dann nur
        // als Properties mit den Keys 0, 1, 2, ... in dieses Objekt.
        //
        // Zusätzlich würde paidOrder hier nur als weitere Property an dieses Objekt angehängt werden.
        // Der alte Order mit derselben ID würde dadurch nicht ersetzt werden.
        //
        // Für ein neues Array müsste man [] verwenden, z. B. [...orders].
        // Da hier aber gezielt ein bestimmter Order ersetzt werden soll, ist .map() passender.
        /*
        const newOrderArrayWithPaidOrder = {

            ...orders,
            paidOrder
        };

        return newOrderArrayWithPaidOrder;
        */

        // Mit .map() erstellen wir ein neues Array.
        // Beim Order mit der passenden ID setzen wir das neu erstellte paidOrder-Objekt ein.
        // Alle anderen Orders werden unverändert zurückgegeben und behalten deshalb ihre
        // ursprüngliche Objektreferenz:
        const newOrderArrayWithPaidOrder = orders.map((order) => {

            if (order.id === orderId){

                return paidOrder;
            }

            // ist kein neues Objekt sondern gleiche Referenz wie in Originalobjekt, aber da es für diese Aufgabe egal ist erstellen wir nicht auch noch neue Objekte also mit neuen Referenzen, würde mit return { ...order }; gehen
            return order;
        });

        return newOrderArrayWithPaidOrder;

    } else {

        throw new Error("Order not found or order is not pending.");
    }

    

    // Wir haben ein bestimmtes Order-Objekt gesucht, daraus ein neues und verändertes
    // PaidOrder-Objekt erstellt und dieses anschließend in einem neuen Order[] anstelle
    // des ursprünglichen Orders eingesetzt. Die anderen Order-Objekte bleiben unverändert
    // und behalten ihre bisherigen Referenzen, sind also nicht komplett enue Objekte
};


export function shipOrder(orders: Order[], orderId: number, shippedAt: string): Order[] {

    const desiredOrder = orders.find((order) => {

        return order.id === orderId;
    });

    if (desiredOrder !== undefined && desiredOrder.status === "paid"){

        // auch hier, kopieren das Order Objekt (bzw. genauer das Objekt vom Typ PaidOrder weil soll ja nur Orders sein die paid sind) in neues Objekt und ersetzen dann den status und fügen shippedAt Property hinzu
        const changedPaidToShippedOrder: ShippedOrder = {

            ...desiredOrder,
            status: "shipped",
            shippedAt: shippedAt
        }

        // auch hier: erstellen mit .map() neues Array und fügen für jedes iterierte Objekt im originalen orders Array wird das bestehende also originale Objekt zurückgegeben, wenn id passt dann eben das oben drüber neu erstellte, sonst eben das originale wieder
        // erstellen auch hier kein komplett neues Objekt mit neuer Referenz (außer für das neue changedPaidToShippedOrder natürlich) sondern hat noch gleiche Referenz, 
        // wenn wir order hier mutablen würden, würde auch Originalobjekt in Originalarray orders verändert werden, aber ist ja in dieser Aufgabe nicht relevant deswegn passt so

        const newOrderArrayWithShippedOrder = orders.map((order) => {

            if (order.id === orderId){

                return changedPaidToShippedOrder;
            }

            return order;
        });

        // ohne den expliziten Typen bei const changedPaidToShippedOrder: ShippedOrder bekommt man Fehler:
        /*Type '(PendingOrder | PaidOrder | CancelledOrder | { status: string; shippedAt: string; id: number; customer: string; items: OrderItem[]; paidAt: string; })[]' is not assignable to type 'Order[]'.
        Type 'PendingOrder | PaidOrder | CancelledOrder | { status: string; shippedAt: string; id: number; customer: string; items: OrderItem[]; paidAt: string; }' is not assignable to type 'Order'.
            Type '{ status: string; shippedAt: string; id: number; customer: string; items: OrderItem[]; paidAt: string; }' is not assignable to type 'Order'.
            Type '{ status: string; shippedAt: string; id: number; customer: string; items: OrderItem[]; paidAt: string; }' is not assignable to type 'ShippedOrder'.
                Type '{ status: string; shippedAt: string; id: number; customer: string; items: OrderItem[]; paidAt: string; }' is not assignable to type '{ status: "shipped"; paidAt: string; shippedAt: string; }'.
                Types of property 'status' are incompatible.
                    Type 'string' is not assignable to type '"shipped"'
        weil: Ohne die explizite Typisierung als ShippedOrder wird "shipped" bei der Objektinferenz zu string widened. Dann kann TypeScript nicht mehr garantieren, dass das Objekt wirklich die ShippedOrder-Variante der discriminated Union ist.             
        */
        
        return newOrderArrayWithShippedOrder;

    } else {

        throw new Error("No order with this id or is not paid!");
    }
};


export function cancelOrder(orders: Order[], orderId: number, cancelledAt: string, reason: string): Order[] {

    const desiredOrder = orders.find((order) => {

        return order.id === orderId;
    });

    if (desiredOrder !== undefined && (desiredOrder.status === "pending" || desiredOrder.status === "paid")){

        const cancelledOrder: CancelledOrder = {

            ...desiredOrder,
            status: "cancelled",
            cancelledAt: cancelledAt,
            reason: reason
        };

        const newOrderArrayWithCancelledOrder = orders.map((order) => {

            if (order.id === orderId){

                return cancelledOrder;
            }

            return order;
        });


        return newOrderArrayWithCancelledOrder;
    } else {

        throw new Error("No order with this id or order is not pending or paid!");
    }
};


type CustomerSummary = {

    customer: string,
    orderCount: number,
    totalSpent: number,
    activeOrderCount: number
};


export function getCustomerSummary(orders: Order[], customer: string): CustomerSummary {

    const ordersFromCustomer: Order[] = orders.filter((order) => {

        return order.customer === customer;
    });

    const orderCount = ordersFromCustomer.length;

    // struggle gerade damit, wie ich jetzt die einzelnen Summen der Order zusammenzähle, weil ja calculateOrderTotal() die Ausgaben für einen Order rechnet und eine Zahl/number zurückgibt, und ich jetzt alle Ausgaben von allen Order haben möchte, könnte mit map auf jede Order in ordersFromCustomer die calculateOrderTotal() ausführen,
    // dann hätte ich ein Array aus den Ausgaben pro Order, dann könnte ich aus diesem Array alle Elemente zusammenzählen, aber gibt es noch bessere Lösung?
    let totalSpentOrdersForCustormer = 0;
    
    for (const order of ordersFromCustomer){

        // hier wieder so, wenn die linke Seite true ist wird die rechte nicht mehr geprüft und ganzer Ausdruck ist true, wenn links false ist wird rechts noch geprüft, wenn rechte Seite true (und links false) dann ganzer Ausdruck true, wenn rechts auch false dann ganzer Ausdruck false
        if (order.status === "paid" || order.status === "shipped"){

            totalSpentOrdersForCustormer += calculateOrderTotal(order)
        }
    };

    let activeOrderCountForCustormer = 0;

    for (const order of ordersFromCustomer){

        if (order.status === "pending" || order.status === "paid"){

            activeOrderCountForCustormer += 1;
        }
    }


    return {

        customer: customer,
        orderCount: orderCount,
        totalSpent: totalSpentOrdersForCustormer,
        activeOrderCount: activeOrderCountForCustormer
    }
};


export function getOrdersAboveTotal(orders: Order[], minimumTotal: number): Order[] {

    const filteredObjects = orders.filter((order) => {

        if (calculateOrderTotal(order) >= minimumTotal){

            return order;
        }
    });

    return filteredObjects;
};