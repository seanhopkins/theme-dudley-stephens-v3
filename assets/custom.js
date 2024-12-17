/* global theme */
(function () {
  /*============================================================================
     Utilities
   ==============================================================================*/
  theme.utils.handleize = function (str) {
    // from https://github.com/Shopify/liquid/blob/63eb1aac69a31d97e343822b973b3a51941c8ac2/performance/shopify/shop_filter.rb#L100
    str = str.toLowerCase();

    var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];

    // For the old browsers
    for (var i = 0; i < toReplace.length; ++i) {
      str = str.replace(toReplace[i], "");
    }

    str = str.replace(/\W+/g, "-");

    if (str.charAt(str.length - 1) == "-") {
      str = str.replace(/-+\z/, "");
    }

    if (str.charAt(0) == "-") {
      str = str.replace(/\A-+/, "");
    }

    return str;
  };

  /*============================================================================
     Class Extensions/Overwrites
   ==============================================================================*/
  theme.cart.addItems = function (id, quantity, properties) {
    return this._updateCart({
      url: "".concat(theme.routes.cartAdd, "?t=").concat(Date.now()),
      data: JSON.stringify({
        id: id,
        quantity: quantity,
        properties: properties,
      }),
    });
  };

  theme.cart.changeItemByIndex = function (index1, qty) {
    return this._updateCart({
      url: "".concat(theme.routes.cartChange, "?t=").concat(Date.now()),
      data: JSON.stringify({
        line: index1,
        quantity: qty,
      }),
    });
  };

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

  const oldSlideshowProto = theme.Slideshow.prototype;

  // create a copy of theme.Slideshow, but modify it's constructor
  theme.CustomSlideshow = (function () {
    var selectors = {
      allSlides: ".slideshow__slide",
      currentSlide: ".is-selected",
      wrapper: ".slideshow-wrapper",
      pauseButton: ".slideshow__pause",
    };

    var productSelectors = {
      thumb: ".product__thumb-item:not(.hide)",
      links: ".product__thumb-item:not(.hide) a",
      arrow: ".product__thumb-arrow",
    };

    var defaults = {
      adaptiveHeight: false,
      autoPlay: false,
      avoidReflow: false, // custom by Archetype
      childNav: null, // element. Custom by Archetype instead of asNavFor
      childNavScroller: null, // element
      childVertical: false,
      fade: false,
      initialIndex: 0,
      pageDots: false,
      pauseAutoPlayOnHover: false,
      prevNextButtons: false,
      rightToLeft: theme.config.rtl,
      setGallerySize: true,
      wrapAround: true,
    };

    function slideshow(el, args, onReadyCallback) {
      this.el = el;
      this.args = Object.assign({}, defaults, args);

      // Setup listeners as part of arguments
      this.args.on = {
        ready: () => {
          this.init.bind(this);
          onReadyCallback();
        },
        change: this.slideChange.bind(this),
        settle: this.afterChange.bind(this),
      };

      if (this.args.childNav) {
        this.childNavEls = this.args.childNav.querySelectorAll(
          productSelectors.thumb
        );
        this.childNavLinks = this.args.childNav.querySelectorAll(
          productSelectors.links
        );
        this.arrows = this.args.childNav.querySelectorAll(
          productSelectors.arrow
        );
        if (this.childNavLinks.length) {
          this.initChildNav();
        }
      }

      if (this.args.avoidReflow) {
        avoidReflow(el);
      }

      this.slideshow = new Flickity(el, this.args);

      if (this.args.autoPlay) {
        var wrapper = el.closest(selectors.wrapper);
        this.pauseBtn = wrapper.querySelector(selectors.pauseButton);
        if (this.pauseBtn) {
          this.pauseBtn.addEventListener("click", this._togglePause.bind(this));
        }
      }

      // Reset dimensions on resize
      window.on(
        "resize",
        theme.utils.debounce(
          300,
          function () {
            this.resize();
          }.bind(this)
        )
      );

      // Set flickity-viewport height to first element to
      // avoid awkward page reflows while initializing.
      // Must be added in a `style` tag because element does not exist yet.
      // Slideshow element must have an ID
      function avoidReflow(el) {
        if (!el.id) return;
        var firstChild = el.firstChild;
        while (firstChild != null && firstChild.nodeType == 3) {
          // skip TextNodes
          firstChild = firstChild.nextSibling;
        }
        var style = document.createElement("style");
        style.innerHTML = `#${el.id} .flickity-viewport{height:${firstChild.offsetHeight}px}`;
        document.head.appendChild(style);
      }
    }

    return slideshow;
  })();

  theme.CustomSlideshow.prototype = oldSlideshowProto;

  /*============================================================================
     Classes
   ==============================================================================*/
  theme.Swatches = (function () {
    var videoObjects = {};

    var classes = {};

    var selectors = {};

    function Swatches(container) {
      this.container = container;
      var sectionId = (this.sectionId =
        container.getAttribute("data-section-id"));

      this.selectors = {
        availabilityContainer: "#StoreAvailabilityHolder-" + sectionId,
        productMeta: ".product-single__meta",
      };

      this.cache = {
        form: container.querySelector(this.selectors.form),
        meta: container.querySelector(this.selectors.productMeta),
      };

      this.init();
    }

    Swatches.prototype = Object.assign({}, Swatches.prototype, {
      init: function () {
        this.initEventListeners();
      },

      initEventListeners: function () {
        document.addEventListener(
          "variant:change",
          function (evt) {
            var variant = evt.detail.variant;

            this.soldoutColorSwatches(variant.title);
          }.bind(this)
        );
      },

      soldoutColorSwatches: function (size) {
        var soldoutSelector = ".soldout-" + theme.utils.handleize(size);
        var soldoutColorSwatches = document.querySelectorAll(soldoutSelector);

        var colorSwatches = document.querySelectorAll(".color-swatch");
        var unavailableColorSwatches = document.querySelectorAll(
          ".color-swatch--unavailable"
        );

        // remove all sold out states
        for (var i = 0; i < unavailableColorSwatches.length; i++) {
          var soldOutSwatch = unavailableColorSwatches[i];
          soldOutSwatch.classList.remove("color-swatch--unavailable");
        }

        for (var i = 0; i < soldoutColorSwatches.length; i++) {
          soldoutColorSwatches[i].classList.add("color-swatch--unavailable");
        }
      },
    });

    return Swatches;
  })();

  theme.SizeModal = (function () {
    function SizeModal(container) {
      this.container = container;
      var sectionId = (this.sectionId =
        container.getAttribute("data-section-id"));

      this.init();
    }

    SizeModal.prototype = Object.assign({}, SizeModal.prototype, {
      initTabs: function () {
        /**
         * Modal Tabs
         */
        document.addEventListener("click", function (e) {
          var clickedTab = e.target.className,
            sizeChartTable =
              document.getElementsByClassName("size-chart-content")[0],
            measurementTipsTable = document.getElementsByClassName(
              "measurement-tips-content"
            )[0];

          if (clickedTab == "lnz-tab-size-chart-a") {
            e.preventDefault();

            sizeChartTable.classList.toggle("show");
            measurementTipsTable.classList.toggle("show");
          }

          if (clickedTab == "lnz-tab-measurement-tips-a") {
            e.preventDefault();

            sizeChartTable.classList.toggle("show");
            measurementTipsTable.classList.toggle("show");
          }
        });
      },

      init: function () {
        // create a new instance of theme.Modals
        new theme.Modals("SizeChartModal", "size-chart-modal");

        this.initTabs();
      },
    });

    return SizeModal;
  })();

  theme.MonogramAjaxProduct = (function (ProductForm) {
    var status = {
      loading: false,
    };

    function MonogramAjaxProduct(form, submit, parentForm, parentSubmit) {
      // inherit ProductForm's constructor
      ProductForm.call(this, form, submit);

      // add our own data to the constructor
      this.parentForm = parentForm;
    }

    MonogramAjaxProduct.prototype = Object.assign({}, ProductForm.prototype, {
      /**
       * Overwriting theme.AjaxProduct's methods
       * @param evt
       * @param callback
       */
      addItemFromForm: function (evt, callback) {
        evt.preventDefault();

        if (status.loading) {
          return;
        }

        // Loading indicator on add to cart button
        this.addToCart.classList.add("btn--loading");

        status.loading = true;

        let data = {
          items: [],
        };
        let selectedPropertiesMonogram = {};
        let selectedPropertiesParent = {};
        const uniqueIdProp = {
          "_Monogram ID": `${Date.now()}-${Math.floor(Math.random() * 100)}`,
        };

        // monogram form specific
        const monogramFormData = new FormData(this.form);

        for (var pair of monogramFormData.entries()) {
          const key = pair[0];
          const value = pair[1];

          if (key.includes("properties")) {
            // remove "properties[" and "]"
            const keyStripped = key.slice(11, -1);

            selectedPropertiesMonogram[keyStripped] = value;

            if (keyStripped !== "Monogram for") {
              selectedPropertiesParent[keyStripped] = value;
            }
          }
        }

        // add monogram product to data.items
        data.items.push({
          id: parseInt(monogramFormData.get("id")),
          quantity: 1,
          properties: {
            ...selectedPropertiesMonogram,
            ...uniqueIdProp,
            "_Gift wrap": "No",
          },
        });

        // parent form specific
        if (this.parentForm) {
          const parentFormData = new FormData(this.parentForm);

          // add parent product to data.items
          data.items.push({
            id: parseInt(parentFormData.get("id")),
            quantity: 1,
            properties: { ...selectedPropertiesParent, ...uniqueIdProp },
          });
        }

        fetch(theme.routes.cartAdd, {
          method: "POST",
          body: JSON.stringify(data),
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
          .then((response) => response.json())
          .then(
            function (data) {
              if (data.status === 422) {
                this.error(data);
              } else {
                this.success();
              }

              status.loading = false;
              this.addToCart.classList.remove("btn--loading");
            }.bind(this)
          );
      },

      /**
       * Overwriting the method in theme.AjaxProduct to remove the product data that gets passed along with the custom event.
       * It was a different shape, and not really necessary for this application.
       */
      success: function () {
        var errors = this.form.querySelector(".errors");
        if (errors) {
          errors.remove();
        }

        document.dispatchEvent(
          new CustomEvent("ajaxProduct:added", {
            detail: {
              addToCartBtn: this.addToCart,
            },
          })
        );
      },
    });

    return MonogramAjaxProduct;
  })(theme.AjaxProduct);

  /**
   * @class Monogram
   * @classdesc Monogram related functionality
   */
  theme.Monogram = (function () {
    function Monogram(container) {
      const sectionId = container.getAttribute("data-section-id");
      const parentContainer = document.querySelector(
        `#ProductSection-${sectionId}`
      );

      this.container = container;
      this.parentContainer = parentContainer;

      this.renderEvent = new CustomEvent("renderMonogram");

      this.state = {
        isThreeChars: true,
        isMonogram: false,
        hasErrors: false,
        style: "classic",
      };

      this.data = {
        yourName: "Dudley",
        initialFirst: "A",
        initialMiddle: "B",
        initialLast: "C",
      };

      this.selectors = {
        variantsJson: "#MonogramVariantsJson-" + sectionId,
        originalSelectorId: "#MonogramProductSelect-" + sectionId,
        singleOptionSelector: ".monogram-variant__input-" + sectionId,

        thumbSlider: "#MonogramProductThumbs-" + sectionId,
        thumbScroller: ".product__thumbs--scroller",
        mainSlider: "#MonogramProductPhotos-" + sectionId,
        productImageMain: ".product-image-main--" + sectionId,

        monogramProductForm: "#AddMonogramToCartForm-" + sectionId,
        monogramProductButton: "#MonogramAddToCart-" + sectionId,
        parentProductForm: "#AddToCartForm-" + sectionId,
        parentProductQuantity: ".product__qty-atc-flex",
        monogramText: "#monogram-text",
        addMonogramCheckbox: "#add-monogram",
        monogramForProperty: "#monogram-for",
      };

      this.cache = {
        mainSlider: container.querySelector(this.selectors.mainSlider),
        thumbSlider: container.querySelector(this.selectors.thumbSlider),
        thumbScroller: container.querySelector(this.selectors.thumbScroller),
        productImageMain: container.querySelector(
          this.selectors.productImageMain
        ),

        monogramProductForm: container.querySelector(
          this.selectors.monogramProductForm
        ),
        monogramProductButton: container.querySelector(
          this.selectors.monogramProductButton
        ),
        parentProductForm: parentContainer.querySelector(
          this.selectors.parentProductForm
        ),
        parentProductQuantity: parentContainer.querySelector(
          this.selectors.parentProductQuantity
        ),
        monogramText: container.querySelector(this.selectors.monogramText),
        addMonogramCheckbox: parentContainer.querySelector(
          this.selectors.addMonogramCheckbox
        ),
        monogramForProperty: parentContainer.querySelector(
          this.selectors.monogramForProperty
        ),

        nameFieldset: container.querySelector("#name-fieldset"),
        monogramFieldset: container.querySelector("#monogram-fieldset"),
        textInputs: container.querySelectorAll("input[type=text]"),
        monogramErrors: container.querySelectorAll(".monogram-error"),
        hiddenLineItemProperty: container.querySelector(
          "#hidden-line-item-property"
        ),
      };

      if (this.cache.addMonogramCheckbox) {
        this.init();
      }
    }

    Monogram.prototype = Object.assign({}, Monogram.prototype, {
      initVariants: function () {
        var variantJson = this.container.querySelector(
          this.selectors.variantsJson
        );

        if (!variantJson) {
          return;
        }

        this.variantsObject = JSON.parse(variantJson.innerHTML);

        var options = {
          container: this.container,
          enableHistoryState: "true",
          singleOptionSelector: this.selectors.singleOptionSelector,
          originalSelectorId: this.selectors.originalSelectorId,
          variants: this.variantsObject,
        };

        new theme.Variants(options);
      },

      initProductSlider: function () {
        var args = {
          avoidReflow: true,
          childNavScroller: this.cache.thumbScroller,
          childVertical: true,
          childNav: this.cache.thumbSlider,
        };

        this.flickity = new theme.Slideshow(this.cache.mainSlider, args);
      },

      /**
       * Updates the live text overlaid on the fabric sample. Also disables/enables the button, and shows/hides the error message.
       * @param text string
       */
      updateLiveText() {
        if (this.state.isThreeChars) {
          if (this.state.isMonogram) {
            // First, Last, Middle
            this.cache.monogramText.innerHTML = `<span class="monogram-style--left">${this.data.initialFirst}</span><span class="monogram-style--center">${this.data.initialLast}</span><span class="monogram-style--right">${this.data.initialMiddle}</span>`;
          } else {
            // First, Middle, Last
            this.cache.monogramText.innerHTML = `<span class="monogram-style--left">${this.data.initialFirst}</span><span class="monogram-style--center">${this.data.initialMiddle}</span><span class="monogram-style--right">${this.data.initialLast}</span>`;
          }
        } else {
          this.cache.monogramText.innerText = this.data.yourName;
        }
      },

      /**
       * We only want to show the error for the currently visible input field(s)
       */
      validateUserEntry() {
        // Reset state.
        this.state.hasErrors = false;

        this.cache.monogramErrors.forEach((error) => {
          error.style.display = "none";
        });

        if (this.state.style === "classic") {
          if (
            this.data.initialFirst === "" &&
            this.data.initialMiddle === "" &&
            this.data.initialLast === ""
          ) {
            this.state.hasErrors = true;

            this.container.querySelector(
              `.monogram-error--classic`
            ).style.display = "block";
          }
        }

        if (this.state.style === "block") {
          if (this.data.yourName === "") {
            this.state.hasErrors = true;

            this.container.querySelector(
              `.monogram-error--yourName`
            ).style.display = "block";
          }
        }

        if (this.state.style === "monogram") {
          for (const [key, value] of Object.entries(this.data)) {
            // Find any empty strings, ignoring yourName key.
            if (key !== "yourName" && value === "") {
              this.state.hasErrors = true;

              this.container.querySelector(
                `.monogram-error--${key}`
              ).style.display = "block";
            }
          }
        }

        // Disable or enable the button.
        this.cache.monogramProductButton.disabled = this.state.hasErrors;
      },

      updateHiddenLineItemProperty() {
        if (this.state.isThreeChars) {
          if (this.state.isMonogram) {
            // First, Last, Middle
            this.cache.hiddenLineItemProperty.value =
              this.data.initialFirst +
              this.data.initialLast +
              this.data.initialMiddle;
          } else {
            // First, Middle, Last
            this.cache.hiddenLineItemProperty.value =
              this.data.initialFirst +
              this.data.initialMiddle +
              this.data.initialLast;
          }
        } else {
          this.cache.hiddenLineItemProperty.value = this.data.yourName;
        }
      },

      toggleFieldsets() {
        if (this.state.isThreeChars) {
          this.cache.nameFieldset.style.display = "none";
          this.cache.monogramFieldset.style.display = "grid";
        } else {
          this.cache.nameFieldset.style.display = "block";
          this.cache.monogramFieldset.style.display = "none";
        }
      },

      updateMonogramFont(variantTitle) {
        const currentClassesArray = Array.from(
          this.cache.monogramText.classList
        );

        const newClassesArray = currentClassesArray.filter(
          (className) => !className.includes("monogram-font--")
        );

        newClassesArray.push(`monogram-font--${variantTitle.toLowerCase()}`);

        const newClassesString = newClassesArray.join(" ");

        this.cache.monogramText.classList = newClassesString;
      },

      updateData: function (key, value) {
        this.data[key] = value.toString();
        this.updateCasing();

        this.container.dispatchEvent(this.renderEvent);
      },

      updateCasing: function () {
        for (const property in this.data) {
          if (property !== "yourName") {
            // Initials fields only
            this.data[property] = this.data[property].toUpperCase();
          }
        }
      },

      initEventListeners: function () {
        this.cache.textInputs.forEach((input) => {
          input.addEventListener("change", (e) => {
            this.updateData(e.target.id, e.target.value);
          });

          input.addEventListener("keyup", (e) => {
            this.updateData(e.target.id, e.target.value);
          });
        });

        this.container.addEventListener("variantChange", (e) => {
          const variantTitle = e.detail.variant.title.toLowerCase();

          this.state.style = variantTitle;

          if (variantTitle === "monogram" || variantTitle === "classic") {
            this.state.isThreeChars = true;
          } else {
            this.state.isThreeChars = false;
          }

          if (variantTitle === "monogram") {
            this.state.isMonogram = true;
          } else {
            this.state.isMonogram = false;
          }

          this.updateMonogramFont(variantTitle);
          this.updateCasing();

          this.container.dispatchEvent(this.renderEvent);
        });

        /**
         * Update the monogram's "Monogram for" property value to the currently selected parent product value.
         */
        this.parentContainer.addEventListener("variantChange", (e) => {
          this.cache.monogramForProperty.value = e.detail.variant.name;
        });

        this.cache.addMonogramCheckbox.addEventListener("change", (e) => {
          const isChecked = e.target.checked;

          this.cache.parentProductQuantity.style.display = isChecked
            ? "none"
            : "";
        });

        this.container.addEventListener("renderMonogram", () => {
          this.updateLiveText();
          this.validateUserEntry();
          this.updateHiddenLineItemProperty();
          this.toggleFieldsets();
        });

        document.addEventListener(
          "modalOpen.MonogramModal",
          function () {
            // necessary to properly size the slider
            this.flickity.resize();
          }.bind(this)
        );
      },

      init: function () {
        this.initVariants();
        this.initProductSlider();
        this.initEventListeners();

        new theme.Modals("MonogramModal", "monogram-modal");

        if (theme.settings.cartType === "drawer") {
          new theme.MonogramAjaxProduct(
            this.cache.monogramProductForm,
            null,
            this.cache.parentProductForm
          );
        }
      },
    });

    return Monogram;
  })();

  /**
   * @class Giftwrap
   * @classdesc Giftwrap related functionality
   */
  theme.Giftwrap = (function () {
    var selectors = {
      drawer: "#CartDrawer",
      form: "#CartDrawerForm",
    };

    function Giftwrap() {
      this.form = document.querySelector(selectors.form);

      this.init();
    }

    Giftwrap.prototype = Object.assign({}, Giftwrap.prototype, {
      addGiftwrap: function (
        parentProductKey,
        parentProductTitle,
        quantity = 1
      ) {
        // TODO: check qty
        // add gift bag. use item key as identifier on gift bag
        theme.cart
          .addItems(cartGiftwrap.settings.giftwrapProduct.variantId, quantity, {
            "_Giftwrap ID": parentProductKey,
            "Giftwrap for": parentProductTitle,
          })
          .then(function () {
            document.dispatchEvent(new CustomEvent("cart:build"));
          });
      },

      removeGiftwrap: function (parentProductKey) {
        // remove gift bag. use item key as identifier on gift bag
        theme.cart.getCart().then(function (cart) {
          const isMatchingGiftwrap = function (item) {
            return item.properties["_Giftwrap ID"] === parentProductKey;
          };

          const giftwrapIndex1 = cart.items.findIndex(isMatchingGiftwrap) + 1;

          theme.cart.changeItemByIndex(giftwrapIndex1, 0).then(function () {
            document.dispatchEvent(new CustomEvent("cart:build"));
          });
        });
      },

      initEventListeners: function () {
        this.form.addEventListener(
          "change",
          function (e) {
            if (e.target.className !== "cart-giftwrap__wrapped-checkbox") {
              // wrong element, bail
              return;
            }

            if (e.target.checked) {
              const quantity = e.target
                .closest(".cart-giftwrap")
                .previousElementSibling.querySelector("input").value;

              this.addGiftwrap(
                e.target.dataset.productKey,
                e.target.dataset.productTitle,
                quantity
              );
            } else {
              this.removeGiftwrap(e.target.dataset.productKey);
            }
          }.bind(this)
        );
      },

      init: function () {
        this.initEventListeners();
      },
    });

    return Giftwrap;
  })();

  theme.Carousels = (function () {
    var defaults = {
      avoidReflow: true,
      prevNextButtons: true,
      draggable: false,
    };

    const onReadyCallback = function () {
      if (customElements.get("video-slide") === undefined) {
        customElements.define("video-slide", VideoSlide);
      }
    };

    function Carousels(container) {
      this.container = container;
      this.timeout;
      var sectionId = container.getAttribute("data-section-id");
      this.slideshow = container.querySelector("#Carousels-" + sectionId);
      this.namespace = ".carousel-" + sectionId;

      if (!this.slideshow) {
        return;
      }

      theme.initWhenVisible({
        element: this.container,
        callback: this.init.bind(this),
        threshold: 600,
      });
    }

    Carousels.prototype = Object.assign({}, Carousels.prototype, {
      init: function () {
        // Do not wrap when only a few blocks
        if (this.slideshow.dataset.count <= 3) {
          defaults.wrapAround = false;
        }

        this.flickity = new theme.CustomSlideshow(
          this.slideshow,
          defaults,
          onReadyCallback
        );
      },

      onUnload: function () {
        if (this.flickity && typeof this.flickity.destroy === "function") {
          this.flickity.destroy();
        }
      },

      onDeselect: function () {
        if (this.flickity && typeof this.flickity.play === "function") {
          this.flickity.play();
        }
      },

      onBlockSelect: function (evt) {
        var slide = this.slideshow.querySelector(
          ".carousels-slide--" + evt.detail.blockId
        );
        var index = parseInt(slide.dataset.index);

        clearTimeout(this.timeout);

        if (this.flickity && typeof this.flickity.pause === "function") {
          this.flickity.goToSlide(index);
          this.flickity.pause();
        }
      },

      onBlockDeselect: function () {
        if (this.flickity && typeof this.flickity.play === "function") {
          this.flickity.play();
        }
      },
    });

    return Carousels;
  })();

  class VideoSlide extends HTMLElement {
    constructor() {
      super();

      this.isPlaying = this.dataset.isPlaying;

      this.playButton = this.querySelector(".play-button");
      this.video = this.querySelector("video");

      this.playButton.addEventListener("click", this.handleClick.bind(this));
    }

    handleClick() {
      // update state
      this.isPlaying = !this.isPlaying;

      // update element attribute (used for styling)
      this.dataset.isPlaying = this.isPlaying;

      if (this.isPlaying) {
        this.video.play();
      } else {
        this.video.pause();
      }
    }
  }

  /*============================================================================
     Things that require DOM to be ready
   ==============================================================================*/
  function DOMready(callback) {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }

  DOMready(function () {
    document.addEventListener("ajaxProduct:added", (e) => {
      if (
        e?.detail?.product?.product_id === 6924458852394 &&
        e?.detail?.product?.quantity > 5
      ) {
        theme.cart.changeItem(e.detail.product.key, 5).then(() => {
          document.dispatchEvent(new CustomEvent("cart:build"));
        });
      }
    });

    // Only run the following code block if productOptions exists
    if (typeof productOptions !== 'undefined') {
      // START. Cookie selected variant and auto-apply selection
      document.addEventListener("DOMContentLoaded", () => {
        document.addEventListener("variant:change", (evt) => {
          const variant = evt.detail.variant;
          if (variant && variant.option1) {
            const selectedSize = variant.option1;
            setCookie("selectedSize", selectedSize, 7);
            console.log(`Saved size ${selectedSize}`);
          }
        });

        // Load previously selected size on page load
        const savedSize = getCookie("selectedSize");
        if (savedSize) {
          console.log(`Loaded saved size ${savedSize}`);
          selectSavedSize(savedSize);
        }
      });

      function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
      }

      function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(";");
        for (let i = 0; i < cookieArray.length; i++) {
          let cookie = cookieArray[i];
          while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
          }
          if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
          }
        }
        return "";
      }

      function selectSavedSize(savedSize) {
        const variantWrapper = document.querySelector('.variant-input-wrap[data-handle$="size"]')
        if (variantWrapper) {
          const radioInput = variantWrapper.querySelector(`input[value="${savedSize}"]`);
          if (radioInput) {
            radioInput.checked = true;
            // Trigger a change event to update any related UI elements
            radioInput.dispatchEvent(new Event("change", { bubbles: true }));
            console.log(`Selected size ${savedSize}`);
          } else {
            console.log(`Size ${savedSize} not found in available options`);
          }
        } else {
          console.log("Variant wrapper not found");
        }
      }
      // END. Cookie selected variant and auto-apply selection
    }

    // sections

    // Register after overriding theme.CartForm.prototype...
    theme.sections.register("header", theme.HeaderSection);

    theme.sections.register("header", theme.Giftwrap);
    theme.sections.register("product", theme.Swatches);
    theme.sections.register("product", theme.SizeModal);
    theme.sections.register("monogram-product", theme.Monogram);
    theme.sections.register("carousels", theme.Carousels);
  });
})();
