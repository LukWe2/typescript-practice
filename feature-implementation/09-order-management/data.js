export const orders = [
    {
        id: 1,
        customer: "Anna",
        status: "pending",
        items: [
            {
                productId: 101,
                name: "Keyboard",
                unitPrice: 80,
                quantity: 1
            },
            {
                productId: 102,
                name: "Mouse",
                unitPrice: 40,
                quantity: 2
            }
        ]
    },
    {
        id: 2,
        customer: "Lukas",
        status: "paid",
        paidAt: "2026-10-01",
        items: [
            {
                productId: 103,
                name: "Monitor",
                unitPrice: 300,
                quantity: 2
            }
        ]
    },
    {
        id: 3,
        customer: "Anna",
        status: "shipped",
        paidAt: "2026-09-28",
        shippedAt: "2026-09-30",
        items: [
            {
                productId: 104,
                name: "USB-C Hub",
                unitPrice: 60,
                quantity: 1
            }
        ]
    },
    {
        id: 4,
        customer: "Sophie",
        status: "cancelled",
        cancelledAt: "2026-09-25",
        reason: "Customer changed mind",
        items: [
            {
                productId: 105,
                name: "Webcam",
                unitPrice: 100,
                quantity: 1
            }
        ]
    },
    {
        id: 5,
        customer: "Lukas",
        status: "pending",
        items: [
            {
                productId: 106,
                name: "Laptop Stand",
                unitPrice: 50,
                quantity: 2
            },
            {
                productId: 102,
                name: "Mouse",
                unitPrice: 40,
                quantity: 1
            }
        ]
    }
];
//# sourceMappingURL=data.js.map