import { useState, useEffect } from "preact/hooks";
import Slider from "./Slider";

const Test = ({ data }) => {
  const [cartSubtotalCents, setCartSubtotalCents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slideshow, setSlideshow] = useState(null);
  const [slider, setSlider] = useState(null);
  const [gwpInCart, setGwpInCart] = useState(false);
  // use -1 to show we are not in a tier yet
  const [currentTierIndex, setCurrentTierIndex] = useState(-1);
  const [underMessage, setUnderMessage] = useState("");
  const [overMessage, setOverMessage] = useState("");

  console.log(data);

  if (gwpInCart) return;

  useEffect(() => {
    document.addEventListener(
      "cart:updated",
      function (evt) {
        const cart = evt.detail.cart;

        setCartSubtotalCents(cart.total_price);
        setGwpInCart(false);

        for (var i = 0; i < cart.items.length; i++) {
          var item = cart.items[i];

          if (!!item.properties && !!item.properties._is_gwp) {
            setGwpInCart(true);
          }
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
              const cart = evt;

              setCartSubtotalCents(cart.total_price);
              setGwpInCart(false);

              for (var i = 0; i < cart.items.length; i++) {
                var item = cart.items[i];

                if (!!item.properties && !!item.properties._is_gwp) {
                  setGwpInCart(true);
                }
              }
            }.bind(this)
          );
        }
      }.bind(this)
    );

    // prevent some errors in dev
    if (typeof theme !== "undefined") {
      theme.cart.getCart().then(
        function (evt) {
          const cart = evt;

          setCartSubtotalCents(cart.total_price);
          setGwpInCart(false);

          for (var i = 0; i < cart.items.length; i++) {
            var item = cart.items[i];

            if (!!item.properties && !!item.properties._is_gwp) {
              setGwpInCart(true);
            }
          }
        }.bind(this)
      );
    }
  }, []);

  useEffect(() => {
    console.log("cartSubtotalCents", cartSubtotalCents);
    let newTierIndex = -1;

    data.tierData.forEach((tier, index) => {
      if (cartSubtotalCents >= tier.threshold) {
        newTierIndex = index;
      }
    });

    setCurrentTierIndex(newTierIndex);
  }, [cartSubtotalCents]);

  return (
    <div class="gwp-content-wrapper">
      <div
        class="rte text-center over-threshold-message"
        dangerouslySetInnerHTML={{
          __html: data.tierData[currentTierIndex]?.overMessageTemplate,
        }}
      ></div>

      <Slider tierData={data.tierData} currentTierIndex={currentTierIndex} />

      <hr class="hr--medium" />
      <p
        class="text-center under-threshold-message"
        dangerouslySetInnerHTML={{
          __html: data.tierData[currentTierIndex]?.underMessageTemplate,
        }}
      ></p>
    </div>
  );
};

export default Test;
