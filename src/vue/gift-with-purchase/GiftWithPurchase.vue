<template>
  <div v-if="!this.gwpInCart" class="gwp-content-wrapper">
    <div
      class="rte text-center over-threshold-message"
      v-show="overMessage !== ''"
    >
      <span v-html="overMessage"></span>
    </div>
    <div class="gwp-slider-wrapper" v-if="this.currentTierIndex > -1">
      <div
        v-for="productData in this.availableTiers[this.currentTierIndex]
          .productData"
        v-bind:key="productData.threshold"
        class="gwp__slide"
      >
        <div class="gwp__item">
          <div class="gwp__image">
            <img
              v-bind:src="productData.images.edges[0].node.url"
              v-bind:alt="productData.title"
            />
          </div>
          <p class="gwp_title">{{ productData.title }}</p>
          <a
            v-on:click="addGwpItem"
            v-bind:data-variant-id="productData.variants.edges[0].node.id"
            class="btn btn--small btn--full btn--primary"
            v-bind:class="{ 'btn--loading': this.loading }"
            href="#"
            >Add to Cart</a
          >
        </div>
      </div>
    </div>
    <p
      class="text-center under-threshold-message"
      v-bind:class="{ 'gwp--spend-more': this.currentTierIndex === -1 }"
      v-show="underMessage !== ''"
    >
      <span v-html="underMessage"></span>
    </p>
    <hr class="hr--small" v-if="this.currentTierIndex > -1" />
  </div>
</template>

<script>
/* global theme */

export default {
  props: ["tierData"],
  data() {
    return {
      availableTiers: [],
      cartSubtotalCents: 0,
      loading: false,
      slideshow: null,
      slider: null,
      gwpInCart: false,
    };
  },
  methods: {
    updateCartSubtotalCents(subtotal) {
      this.cartSubtotalCents = subtotal;
    },

    updateGwpInCart(cart) {
      this.gwpInCart = false;

      for (var i = 0; i < cart.items.length; i++) {
        var item = cart.items[i];

        if (!!item.properties && !!item.properties._is_gwp) {
          this.gwpInCart = true;
        }
      }
    },

    async getProducts(productIdsArray) {
      let idString = "";

      for (var i = 0; i < productIdsArray.length; i++) {
        idString += `"gid://shopify/Product/${productIdsArray[i]}"`;

        if (i + 1 != productIdsArray.length) {
          idString += ",";
        }
      }

      var mutation = `
        query {
          nodes(ids: [${idString}]) {
            ... on Product {
              id
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                    quantityAvailable
                  }
                }
              }
              title
              images (first: 1) {
                edges {
                  node {
                    id
                    url
                  }
                }
              }
            }
          }
        }
        `;

      return fetch("/api/2022-10/graphql.json", {
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Storefront-Access-Token":
            "2a1c6731e91ea55d317dbefc6ac50463",
        },
        method: "POST",
        body: mutation,
      }).then((response) => response.json());
    },

    addGwpItem(e) {
      e.preventDefault();

      if (this.loading) {
        return;
      }

      this.loading = true;

      const variantId = e.target.dataset.variantId.replace(
        "gid://shopify/ProductVariant/",
        ""
      );

      var variantData = {
        items: [
          {
            quantity: 1,
            id: variantId,
            properties: {
              _is_gwp: true,
            },
          },
        ],
      };

      fetch(theme.routes.cartAdd, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variantData),
      })
        .then(
          function (data) {
            if (data.status === 422) {
              // console.error('Error:', error);
            } else {
              // success
              document.dispatchEvent(
                new CustomEvent("ajaxProduct:added", {
                  detail: {
                    addToCartBtn: null,
                  },
                })
              );
            }

            this.loading = false;
          }.bind(this)
        )
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },

  async created() {
    // make a deep copy, as we can't affect the original tier data
    let tierDataDeepCopy = JSON.parse(JSON.stringify(this.tierData));

    // populate product data for each of the tiers
    const requests = tierDataDeepCopy.map((tier) => {
      if (tier.productIdsArray.length) {
        return this.getProducts(tier.productIdsArray);
      }

      return null;
    });

    await Promise.all(requests).then((responses) => {
      responses.forEach((response, i) => {
        if (response) {
          tierDataDeepCopy[i].productData = response.data.nodes;
        }
      });
    });

    // remove any productData that does not have quantityAvailable
    tierDataDeepCopy.forEach((tier) => {
      if (tier.productData.length) {
        tier.productData = tier.productData.filter((data) => {
          return data.variants.edges[0].node.quantityAvailable > 0;
        });
      }
    });

    // remove any tiers that do not have productData
    tierDataDeepCopy = tierDataDeepCopy.filter((tier) => {
      return tier.productData.length;
    });

    // assign tierDataDeepCopy to the component's data
    this.availableTiers = tierDataDeepCopy;
  },

  mounted() {
    document.addEventListener(
      "cart:updated",
      function (evt) {
        let cart;

        if (evt.detail.cart) {
          if (typeof evt.detail.cart === "string") {
            cart = JSON.parse(evt.detail.cart);
          } else {
            cart = evt.detail.cart;
          }

          this.updateCartSubtotalCents(cart.total_price);
          this.updateGwpInCart(cart);
        }
      }.bind(this)
    );

    document.addEventListener(
      "ajaxProduct:added",
      function () {
        // prevent some errors in dev
        if (typeof theme !== "undefined") {
          theme.cart.getCart().then(
            function (evt) {
              this.updateCartSubtotalCents(evt.total_price);
              this.updateGwpInCart(evt);
            }.bind(this)
          );
        }
      }.bind(this)
    );

    // prevent some errors in dev
    if (typeof theme !== "undefined") {
      theme.cart.getCart().then(
        function (evt) {
          this.updateCartSubtotalCents(evt.total_price);
          this.updateGwpInCart(evt);
        }.bind(this)
      );
    }
  },

  beforeUpdate() {
    if (this.slideshow) {
      this.slideshow.destroy();
      this.slideshow = null;
    }
  },

  updated() {
    // need to find it every time, as it is not always present
    const slider = document.querySelector(".gwp-slider-wrapper");

    if (
      slider &&
      this.currentTierIndex > -1 &&
      this.availableTiers[this.currentTierIndex].productData.length > 1
    ) {
      const sliderArgs = {
        prevNextButtons: true,
        pageDots: false,
        fade: false,
        setGallerySize: false,
        imagesLoaded: true,
        autoPlay: false,
      };

      this.slideshow = new theme.Slideshow(slider, sliderArgs);
    }
  },

  computed: {
    currentTierIndex() {
      // using -1 just to show that we are not yet in a tier. this will help with other logic
      let currentTierIndex = -1;

      this.availableTiers.forEach((tier, i) => {
        if (this.cartSubtotalCents > tier.threshold) {
          // get last matching tier
          currentTierIndex = i;
        }
      });

      return currentTierIndex;
    },

    underMessage() {
      const nextTierIndex = this.currentTierIndex + 1;
      let message = "";

      if (nextTierIndex < this.availableTiers.length) {
        // an underMessage is irrelevant once we are already in the last tier
        const template =
          this.availableTiers[nextTierIndex].underMessageTemplate;
        const money =
          this.availableTiers[nextTierIndex].threshold - this.cartSubtotalCents;

        const formattedMoney = theme.Currency.formatMoney(
          money,
          theme.settings.moneyFormat
        );

        message = template.replace("[money]", formattedMoney);
      }

      return message;
    },

    overMessage() {
      let message = "";

      if (this.currentTierIndex >= 0) {
        // ignore our "default" tier of index -1
        message =
          this.availableTiers[this.currentTierIndex].overMessageTemplate;
      }

      return message;
    },
  },
};
</script>
