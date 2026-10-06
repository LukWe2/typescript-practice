const products = [
    {
        id: 1,
        name: "Mechanical Keyboard",
        category: "electronics",
        price: 129.99,
        stock: 8,
        featured: true
    },
    {
        id: 2,
        name: "TypeScript Handbook",
        category: "books",
        price: 39.99,
        stock: 12,
        featured: false
    },
    {
        id: 3,
        name: "Developer Hoodie",
        category: "clothing",
        price: 59.99,
        stock: 0,
        featured: true
    },
    {
        id: 4,
        name: "USB-C Hub",
        category: "electronics",
        price: 49.99,
        stock: 5,
        featured: false
    }
];
function main() {
    // Anzahl aller Produkte
    console.log(products.length);
    // Anzahl verfügbarer Produkte
    console.log(getAvailableProducts(products).length);
    // Namen aller Electronics-Produkten
    /*
    Das gibt nur Produkte aus, nicht die Namen wie Aufgabenstellung will:
    console.log(getProductsByCategory(products, "electronics"));
    */
    const electronicsProducts = getProductsByCategory(products, "electronics");
    console.log(electronicsProducts.map((product) => product.name));
    // Suchergebnis für "typescript"
    console.log(searchProducts(products, "typescript"));
    // Gesamter Lagerwert
    console.log(calculateInventoryValue(products).toFixed(2));
    // Namen aller Featured-Produkte
    console.log(getFeaturedProductNames(products));
    // ein einzelnes aktualisiertes Produkt
    // ohne Prüfung ob Element wirklich existiert kommt dieser Fehler: Argument of type 'Product | undefined' is not assignable to parameter of type 'Product'. Type 'undefined' is not assignable to type 'Product'.
    // mit Prüfung ist products[2] bzw. thirdProduct innerhalb des if-Statements vom Typ Product
    const thirdProduct = products[2];
    if (thirdProduct !== undefined) {
        console.log(updateProduct(thirdProduct, { price: 62.99, stock: 10 }));
    }
    // das komplette Array nach einem Update über updateProductInList()
    console.log(updateProductInList(products, 4, { featured: true, price: 20.99, stock: 1 }));
    // prüfen ob Originaldaten also products Array unverändert bleibt von den Operationen die wir machen
    const secondProduct = products[1];
    if (secondProduct !== undefined) {
        const updatedProduct = updateProduct(secondProduct, {
            price: 19.99,
            stock: 2
        });
        console.log("Updated:", updatedProduct);
        console.log("Original:", secondProduct);
    }
    ;
    // Fehler: Argument of type '"food"' is not assignable to parameter of type '"books" | "electronics" | "clothing"'.
    // weil: "food" gehört nicht zu Product["category"]
    //getProductsByCategory(products, "food");
    // Fehler: Object literal may only specify known properties, and 'id' does not exist in type 'Omit<Partial<Product>, "id">'.
    // weil: id wurde mit Omit<Partial<Product>, "id"> ausgeschlossen
    /*if (thirdProduct !== undefined) {
        updateProduct(thirdProduct, { id: 999 });
    }*/
}
;
main();
function getAvailableProducts(products) {
    const availableProducts = products.filter((product) => {
        return product.stock > 0;
    });
    return availableProducts;
}
;
function getProductsByCategory(products, category) {
    const categoryProducts = products.filter((product) => {
        return product.category === category;
    });
    return categoryProducts;
}
;
function searchProducts(products, searchTerm) {
    const searchTermStandarized = searchTerm.toLowerCase();
    const searchedProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTermStandarized);
    });
    return searchedProducts;
}
;
function updateProduct(product, update) {
    const updatedProduct = {
        ...product,
        ...update
    };
    return updatedProduct;
}
;
function updateProductInList(products, productId, change) {
    // some gibt true oder false zurück, true wenn es mindestens ein Element im Array gibt, das die Bedingnung erfüllt, also hier gibt es true zurück, wenn es ein Produkt mit der als Argument übergebene ID productId gibt
    const productExists = products.some((product) => {
        return product.id === productId;
    });
    if (!productExists) {
        throw new Error("No product with this ID available!");
    }
    const newProducts = products.map((product) => {
        // bei .map() wird jedes Element durch den Rückgabewert des Callbacks ersetzt, hier wenn es die passende ID ist, wird dieses Produkt zu dem Rückgabewert von updateProduct(product, change) was das geupdatete Element ist, weil updateProduct ein Product zurückgibt
        // und products ja vom Typ Products[] ist, passt das
        // wenn es nicht die passende ID ist, wird einfach product zurückgegeben, also das unveränderte Produkt Element, denn product ist das aktuelle Product was von .map() bearbeitet wird, wenn es nicht die richtige ID ist, wird nichts damit gemacht bzw. einfach
        // das Original zurückgegeben, wenn es die richtige ID ist, wird der Wert von updateProduct(product, change) für dieses Element zurückgegeben und somit das Produkt geupdatet
        // das return innerhalb der .map() Funktion gilt also für jedes einzelne Element und wird darauf angewendet, nicht insgesamt für das gesamte Array oder so
        if (product.id === productId) {
            return updateProduct(product, change);
        }
        // wenn ID nicht passt, wird für jedes dieser nicht passenden Elemente einfach das unveränderte Element zurückgegeben, was hier product ist, weil wir im Methodenkopf von .map() spezifzizert haben, dass jedes einzelne Element des Arrays product ist nacheinander
        return product;
    });
    return newProducts;
}
;
function calculateInventoryValue(products) {
    let valueCount = 0;
    products.forEach((product) => {
        const productSumValue = product.price * product.stock;
        valueCount += productSumValue;
    });
    return valueCount;
}
;
function getFeaturedProductNames(products) {
    // filter() entscheidet nur welche Elemente im Array bleiben, wenn Bedingung true ist, aber verändert Typ von Array nicht also Array bleibt Product[] und wird nicht zu string[] wie es sein muss um returned zu werden für diese Funktion
    const featuredProducts = products.filter((product) => {
        return product.featured === true;
    }); // featuredProductsName ist immernoch Product[]!
    // map() geht auch durch jedes Element des Arrays aber verändert dieses je nach dem was returned wird (nimmt hier von jedem Element nur product.name und packt Ergebnis wieder in Array), und kann dadurch auch Typ des Arrays verändern, hier von Product[] zu string[]
    const featuredProductNames = featuredProducts.map((product) => {
        return product.name;
    }); // featuredProductNames ist jetzt das gewünschte string[]!
    return featuredProductNames;
}
;
export {};
//# sourceMappingURL=index.js.map