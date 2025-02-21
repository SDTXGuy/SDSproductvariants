document.addEventListener("DOMContentLoaded", function() {
    fetch(window.location.pathname + "?output=json")
        .then(response => response.json())
        .then(data => {
            if (!data || !data.product || !data.product.variants) {
                console.error("No variant data found.");
                return;
            }

            let purchasableVariants = data.product.variants.filter(variant => variant.purchasable);
            let variantSelect = document.querySelector("select[data-product-attribute]");
            if (!variantSelect) return;

            let options = variantSelect.querySelectorAll("option");
            options.forEach(option => {
                let variantId = option.getAttribute("data-product-attribute-value");
                let isPurchasable = purchasableVariants.some(variant => variant.id == variantId);

                if (!isPurchasable) {
                    option.style.display = "none";
                }
            });
        })
        .catch(error => console.error("Error fetching product data:", error));
});
