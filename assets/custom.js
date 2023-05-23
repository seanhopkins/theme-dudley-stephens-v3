/* global theme */
(function () {
  /**
   * Check if the line item is connected to a monogram product.
   * @param evt Line item details.
   * @returns Either an array of line item quantities (truthy) or false.
   */
  theme.CartForm.prototype.quantityArray = function (evt) {
    var key = evt.detail[0];
    var qty = evt.detail[1];

    if (!key || !qty) {
      // TODO consider error handling
      return;
    }

    // get cart
    return new Promise((resolve, reject) => {
      theme.cart.getCart().then(function (cart) {
        const matchingProductIndexes = [];

        /**
         * Get the parent product index.
         * The index of the item with a key that matches variable 'key'.
         *
         * Push to matchingProductIndexes.
         */
        const parentProductIndex = cart.items.findIndex(
          (item) => item.key === key
        );
        matchingProductIndexes.push(parentProductIndex);

        /**
         * Get the parent product's giftwrap product index.
         * The index of the item with the '_Giftwrap ID' property that matches variable 'key'.
         *
         * Push to matchingProductIndexes.
         */
        const giftwrapProductIndex = cart.items.findIndex(
          (item) => item.properties["_Giftwrap ID"] === key
        );
        matchingProductIndexes.push(giftwrapProductIndex);

        /**
         * Get the parent product.
         * Will be necessary to find the monogramProductIndex.
         */
        const parentProduct = cart.items[parentProductIndex];

        /**
         * Get this parent product's monogram product index.
         * The index of the item with the '_Monogram ID' property that matches the parent product's '_Monogram ID' property.
         * Also checks that the item in question's key does NOT match the parent's key, otherwise we would end up with the parent product again.
         * Also checks that the item in question has an _Monogram ID property.
         * Also checks that the parent product has an _Monogram ID property.
         *
         * Push to matchingProductIndexes.
         */
        const monogramProductIndex = cart.items.findIndex(
          (item) =>
            item.properties["_Monogram ID"] ===
              parentProduct.properties["_Monogram ID"] &&
            item.key !== key &&
            item.properties["_Monogram ID"] &&
            parentProduct.properties["_Monogram ID"]
        );
        matchingProductIndexes.push(monogramProductIndex);

        /**
         * Strip out any -1.
         * A -1 would mean that one of the findIndexes (above) found nothing that matched, so we can ignore the resulting -1.
         */
        const productIndexesToUpdate = matchingProductIndexes.filter(
          (index) => index > -1
        );

        const quantityArray = [];

        /**
         * If an item's index is in the list of productIndexesToUpdate, that means they are grouped together, either as a monogram or a giftwrap product.
         * Their quantities should updated in a synchronized fashion.
         * Ungrouped products can maintain their existing quantity.
         */
        cart.items.forEach((item, index) => {
          if (productIndexesToUpdate.includes(index)) {
            quantityArray.push(qty);
          } else {
            quantityArray.push(item.quantity);
          }
        });

        resolve(quantityArray);
      });
    });
  };

  theme.CartForm.prototype.updateMonogramSuccess = function (cart) {
    this.updateSubtotal(cart.total_price);
    this.updateCount(cart.item_count);
    this.updateSavings(cart.total_discount);

    this.buildCart();

    document.dispatchEvent(
      new CustomEvent("cart:updated", {
        detail: {
          cart: cart,
        },
      })
    );
  };

  /**
   * Overwrite the default init to check if it's a monogram product or not.
   */
  theme.CartForm.prototype.init = function () {
    this.initQtySelectors();

    document.addEventListener(
      `cart:quantity${this.namespace}`,
      async function (evt) {
        const quantityArray = await this.quantityArray(evt);

        if (quantityArray.length > 1) {
          // monogram and/or giftwrap line item changing
          theme.cart
            ._updateCart({
              url: window.Shopify.routes.root + "cart/update.js",
              data: JSON.stringify({ updates: quantityArray }),
            })
            .then(
              function (cart) {
                this.updateMonogramSuccess(cart);
              }.bind(this)
            );
        } else {
          // default single line item changing
          // this handles it's own cart updating
          this.quantityChanged(evt);
        }
      }.bind(this)
    );

    this.form.on("submit" + this.namespace, this.onSubmit.bind(this));

    if (this.noteInput) {
      this.noteInput.addEventListener("change", function () {
        var newNote = this.value;
        theme.cart.updateNote(newNote);
      });
    }

    // Dev-friendly way to build the cart
    document.addEventListener(
      "cart:build",
      function () {
        this.buildCart();
      }.bind(this)
    );
  };

  /*============================================================================
    Things that require DOM to be ready
  ==============================================================================*/
  function DOMready(callback) {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }

  DOMready(function () {
    // Register after overriding theme.CartForm.prototype...
    theme.sections.register("header", theme.HeaderSection);
  });
})();
