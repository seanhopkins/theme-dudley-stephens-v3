// Tapcart Variables
var selectedVariantId = Tapcart.variables.product.selectedVariant.id;

// Tapcart Register Event Handler 
Tapcart.registerEventHandler("product/updated", (data) => {
  selectedVariantId = data.product.selectedVariant.id;
});

const giftWrappingContainer = document.querySelector('.gift-wrapping-container');
const monogrammingContainer = document.querySelector('.monogramming-container');

const giftWrappingCheckbox = document.getElementById('gift-wrapping');
const monogrammingCheckbox = document.getElementById('monogramming');

const giftWrappingContent = document.querySelector('.gift-wrapping-content');
const monogrammingContent = document.querySelector('.monogramming-content');

const giftWrapProductID = "6707885932586";
const giftWrapVariantID = "39723047485482";

const monogrammingProductID = "6786596175914";
const monogrammingVariantID = "needs to be the selected radio value";
const monogrammingText = document.querySelector('.monogramming-content');

const submitButton = document.getElementById('submit-button');
const viewCart = document.getElementById('viewCart');

giftWrappingCheckbox.addEventListener('change', () => {
  if (giftWrappingCheckbox.checked) {
      giftWrappingContent.classList.remove('hidden');
  } else {
      giftWrappingContent.classList.add('hidden');
  }
});

monogrammingCheckbox.addEventListener('change', () => {
  if (monogrammingCheckbox.checked) {
      monogrammingContent.classList.remove('hidden');
  } else {
      monogrammingContent.classList.add('hidden');
  }
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (giftWrappingCheckbox.checked && monogrammingCheckbox.checked) {
      addAll();
  } else if (giftWrappingCheckbox.checked) {
      addGiftWrap();
  } else if (monogrammingCheckbox.checked) {
      addMonogram();
  } else {
      addToCart();
  }
});

function addToCart() {
    console.log('addToCart function called');
    Tapcart.actions.addToCart({
    lineItems: [
      {
        quantity: 1,
        variantId: selectedVariantId,
      }
    ],
  });

  document.querySelector(".add-to-cart").innerText = "Added!";
  document.querySelector(".add-to-cart").disabled = true;
  Tapcart.actions.showToast({
        message: 'Product Successfully Added', 
        type: "success", // "success" || "error"
      });

  setTimeout(() => {
    document.querySelector(".add-to-cart").innerText = "Add to cart";
    document.querySelector(".add-to-cart").disabled = false;
  }, 2000);
}

function addGiftWrap() {
    console.log('addGiftWrap function called');
    Tapcart.actions.addToCart({
      lineItems: [
        {
          quantity: 1,
          variantId: giftWrapVariantID,
          productId: giftWrapProductID,
          attributes: [
            {
              key: "_For:",
              value: "selectedVariantId",
            },
          ],
        },
        {
          quantity: 1,
          variantId: selectedVariantId,
        }
      ],
    });

  document.querySelector(".add-to-cart").innerText = "Added Gift Wrap!";
  document.querySelector(".add-to-cart").disabled = true;
  Tapcart.actions.showToast({
        message: 'Product + Gift Wrapping Successfully Added',
        type: "success", // "success" || "error"
      });

  setTimeout(() => {
    giftWrappingContainer.classList.add('hidden'); // Hides the checkbox
    giftWrappingCheckbox.checked = false; // unchecks the box so it is not aded again
    document.querySelector(".add-to-cart").innerText = "Add to cart"; // restore button text
    document.querySelector(".add-to-cart").disabled = false; // removes disabled class
    document.querySelector(".view-cart").classList.remove('hidden'); // shows the view cart button
  }, 2000);
}

function addMonogram() {
  console.log('addMonogram function called');
  Tapcart.actions.addToCart({
      lineItems: [
        {
          quantity: 1,
          variantId: "40017410916394",
          productId: "6786596175914",
          attributes: [
            {
              key: "_For:",
              value: "selectedVariantId",
            },
          ],
        },
        {
          quantity: 1,
          variantId: selectedVariantId,
        }
      ],
    });

  document.querySelector(".add-to-cart").innerText = "Added Monogram!";
  document.querySelector(".add-to-cart").disabled = true;
  Tapcart.actions.showToast({
        message: 'Product + Gift Wrapping Successfully Added',
        type: "success", // "success" || "error"
      });

  setTimeout(() => {
    monogrammingContainer.classList.add('hidden'); // Hides the checkbox
    monogrammingCheckbox.checked = false; // Unchecks the box
    document.querySelector(".add-to-cart").innerText = "Add to cart"; // returns button to previous state
    document.querySelector(".add-to-cart").disabled = false; // removes disabled 
    document.querySelector(".view-cart").classList.remove('hidden'); // shows the view cart button
  }, 2000);
    
}

function addAll() {
  console.log('addAll function called');
  Tapcart.actions.addToCart({
      lineItems: [
        {
          quantity: 1,
          variantId: "39723047485482",
          productId: "6707885932586",
          attributes: [
            {
              key: "_For:",
              value: "selectedVariantId",
            },
          ],
        },
        {
          quantity: 1,
          variantId: selectedVariantId,
        }
      ],
    });

  document.querySelector(".add-to-cart").innerText = "Added Both!";
  document.querySelector(".add-to-cart").disabled = true;
  Tapcart.actions.showToast({
        message: 'Product + Gift Wrapping Successfully Added',
        type: "success", // "success" || "error"
      });

  setTimeout(() => {
    document.querySelector(".add-to-cart").classList.add('hidden');
    monogrammingContainer.classList.add('hidden'); // Hides the checkbox
    giftWrappingContainer.classList.add('hidden'); // Hides the checkbox
    document.querySelector(".view-cart").classList.remove('hidden');
  }, 2000);
}







// block-vendor:tapcart
// block-type:product-bundle