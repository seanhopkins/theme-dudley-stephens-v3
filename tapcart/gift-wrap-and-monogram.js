const shopifyUrl = "https://dudley-stephens.myshopify.com/api/graphql";
const storefrontAccessToken = "0c941da9e81146ffd111313be665c7cc";
const productHandle = Tapcart.variables.product.handle;
console.log("Product Handle:", productHandle);
let isFinalSale = false;
let hasFlagMonogram = false;
let isKidsitem = false;
let isMonogramStyleBlock = false

// GraphQL query with variables
const query = `
query getProductTags($handle: String!) {
  productByHandle(handle: $handle) {
    tags
  }
}
`;

// Variables object for GraphQL query
const variables = {
  handle: productHandle,
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
  body: JSON.stringify({ query, variables }),
};

fetch(shopifyUrl, options)
  .then((response) => response.json())
  .then((data) => {
    const tags = data.data.productByHandle.tags;
    let showMonogram = false;

    // Loop through tags and check for "monogram"
    tags.forEach((tag) => {
      if (tag === "monogram") {
        // Set showMonogram to true
        showMonogram = true;
      }
      if (tag === "final-sale") {
        isFinalSale = true;
      }
      if (tag === "monogram-american-flag") {
        hasFlagMonogram = true;
      }
      if (tag === "kids") {
        isKidsitem = true;
      }
    });

    // Log showMonogram to console
    console.log("Show Monogram:", showMonogram);
    console.log("Final Sale:", isFinalSale);
    console.log("Flag:", hasFlagMonogram);
    console.log("Kids Item:", isKidsitem);

    // Hide or show the monogramming-container and final-sale elements based on conditions
    toggleMonogrammingContainer(showMonogram);
    toggleFinalSaleContainer(isFinalSale);
    // Call function to toggle the monogram__style--block div based on isKidsitem
    toggleMonogramStyleBlock(isKidsitem);
  })
  .catch((error) => console.error("Error fetching product tags:", error));

// Function to toggle the visibility of the monogramming-container div
function toggleMonogrammingContainer(show) {
  const monogrammingContainer = document.querySelector(
    ".monogramming-container"
  );
  if (!show) {
    monogrammingContainer.style.display = "none";
  } else {
    monogrammingContainer.style.display = "block"; // Ensure it's visible if show is true
  }
}

// Function to toggle the visibility of elements with class final-sale
function toggleFinalSaleContainer(isFinalSale) {
  const finalSaleElements = document.querySelectorAll(".final-sale");
  if (isFinalSale) {
    finalSaleElements.forEach((element) => {
      element.style.display = "block";
    });
  } else {
    finalSaleElements.forEach((element) => {
      element.style.display = "none";
    });
  }
}

// Function to show the monogram__style--block div based on isKidsItem
function toggleMonogramStyleBlock(isKidsItem) {
  const monogramStyleBlock = document.querySelector(".monogram__style--block");

  // Show or hide the div based on the value of isKidsItem
  if (isKidsItem) {
    monogramStyleBlock.style.display = "flex"; // Show the div
  } else {
    monogramStyleBlock.style.display = "none"; // Hide the div
  }
}

// Tapcart Variables
var selectedVariantId = Tapcart.variables.product.selectedVariant.id;
var productTitle = Tapcart.variables.product.title;

// Tapcart Register Event Handler
Tapcart.registerEventHandler("product/updated", (data) => {
  selectedVariantId = data.product.selectedVariant.id;
});

const giftWrappingContainer = document.querySelector(
  ".gift-wrapping-container"
);
const monogrammingContainer = document.querySelector(".monogramming-container");

const giftWrappingCheckbox = document.getElementById("gift-wrapping");
const monogrammingCheckbox = document.getElementById("monogramming");

const giftWrappingContent = document.querySelector(".gift-wrapping-content");
const monogrammingContent = document.querySelector(".monogramming-content");

const giftWrapProductID = "6707885932586";
const giftWrapVariantID = "39723047485482";

const monogrammingStyleRadios = document.querySelectorAll(
  "div.monogram-style input"
);
let monogrammingVariantID;
let monogrammingStyleName;
let monogrammingLocation;

const submitButton = document.getElementById("submit-button");
const monogrammingTextInput = document.getElementById("monogramming-text");
let giftMessage = "N/A";
const giftMessageTextarea = document.getElementById("gift-message");

// Toggles the visibility of the gift wrap & monogram additional details
giftWrappingCheckbox.addEventListener("change", () => {
  if (giftWrappingCheckbox.checked) {
    giftWrappingContent.classList.remove("hidden");
  } else {
    giftWrappingContent.classList.add("hidden");
  }
});

// Disables the add to cart button if monogram text input is blank
monogrammingCheckbox.addEventListener("change", () => {
  if (monogrammingCheckbox.checked) {
    monogrammingContent.classList.remove("hidden");
    document.querySelector(".add-to-cart").disabled = true; // disable add-to-cart until text is added
    document.querySelector(".add-to-cart").innerText = "Monogram text is blank";
  } else {
    monogrammingContent.classList.add("hidden");
    document.querySelector(".add-to-cart").disabled = false; // enable add-to-cart button
    document.querySelector(".add-to-cart").innerText = "Add to cart";
  }
});

// Add gift message attribute when text is entered
giftMessageTextarea.addEventListener("input", () => {
  giftMessage = giftMessageTextarea.value;
});

// Dynmically populates the variables used in the addMonogram() line item properties (see lines 168-200)
monogrammingStyleRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    const selectedRadio = document.querySelector(
      'input[name="monogramming-style"]:checked'
    );
    monogrammingVariantID = selectedRadio.value;
    monogrammingStyleName = selectedRadio.getAttribute("data-style");

    // Check if isKidsItem is true and set the location accordingly
    if (isKidsitem) {
      monogrammingLocation = "Left Chest";
    } else {
      monogrammingLocation = selectedRadio.getAttribute("data-location");
    }

    if (selectedRadio.id === "monogram--heart") {
      document.getElementById("monogram__text").style.display = "none";
      document.querySelector(".add-to-cart").disabled = false; // disable add-to-cart until text is added
      document.querySelector(".add-to-cart").innerText = "Add to cart";
      monogrammingText = "Heart";
      isMonogramStyleBlock = false;
    } else if (selectedRadio.id === "monogram--classic") {
      document.getElementById("monogramming-text").maxLength = 3;
      document.getElementById("monogramming-text").style.textTransform =
        "uppercase"; // set text to all capital letters
      document.getElementById("monogram__text").style.display = "block";
      isMonogramStyleBlock = false;
    } else if (selectedRadio.id === "monogram--block") {
      document.getElementById("monogramming-text").removeAttribute("maxLength"); // remove maxLength attribute
      document.getElementById("monogram__text").style.display = "block";
      document.getElementById("monogramming-text").style.textTransform = "none"; // set text to all capital letters
      isMonogramStyleBlock = true;
    } else if (selectedRadio.id === "monogram--monogram") {
      document.getElementById("monogramming-text").maxLength = 3;
      document.getElementById("monogramming-text").style.textTransform =
        "uppercase"; // set text to all capital letters
      document.getElementById("monogram__text").style.display = "block";
      isMonogramStyleBlock = false;
    } else {
      document.getElementById("monogram__text").style.display = "block";
      isMonogramStyleBlock = false;
    }
  });
});

// Enable add to cart when input is not blank
monogrammingTextInput.addEventListener("input", () => {
  if (isMonogramStyleBlock) {
    monogrammingText = monogrammingTextInput.value;
  } else {
    monogrammingText = monogrammingTextInput.value.toUpperCase();
  }
  document.querySelector(".add-to-cart").disabled = false;
  document.querySelector(".add-to-cart").innerText = "Add to cart";
  // console.log('Block?' + isMonogramStyleBlock);
});

// Fire a different function depending on which chekcbox is selected
submitButton.addEventListener("click", (e) => {
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

// Only adds the product to the cart
function addToCart() {
  console.log("addToCart function called");
  const lineItem = {
    quantity: 1,
    variantId: selectedVariantId,
  };

  // Initialize attributes if there are conditions to be met
  if (isFinalSale || hasFlagMonogram) {
    lineItem.attributes = lineItem.attributes || [];
  }

  if (isFinalSale) {
    lineItem.attributes = lineItem.attributes || [];
    lineItem.attributes.push({
      key: "_LPROP",
      value: "final-sale",
    });
  }

  if (hasFlagMonogram) {
    lineItem.attributes = lineItem.attributes || [];
    lineItem.attributes.push({
      key: "Monogram-2",
      value: "Flag",
    });
  }

  Tapcart.actions.addToCart({
    lineItems: [lineItem],
  });

  document.querySelector(".add-to-cart").innerText = "Added!";
  document.querySelector(".add-to-cart").disabled = true;
  Tapcart.actions.showToast({
    message: "Added Product",
    type: "success", // "success" || "error"
  });

  setTimeout(() => {
    document.querySelector(".add-to-cart").innerText = "Add to cart";
    document.querySelector(".add-to-cart").disabled = false;
  }, 2000);
}

// adds the product AND gift wrapping to the cart
function addGiftWrap() {
  console.log("addGiftWrap function called");
  console.log(giftMessage);
  const lineItems = [];
  const giftWrapLineItem = {
    quantity: 1,
    variantId: giftWrapVariantID,
    productId: giftWrapProductID,
    attributes: [
      {
        key: "Gift Wrapped item",
        value: productTitle,
      },
      {
        key: "Gift ID",
        value: selectedVariantId,
      },
      {
        key: "Gift Message",
        value: giftMessage,
      },
    ],
  };

  lineItems.push(giftWrapLineItem);

  const productLineItem = {
    quantity: 1,
    variantId: selectedVariantId,
    attributes: [
      {
        key: "Gift ID",
        value: selectedVariantId,
      },
    ],
  };

  // if (isFinalSale || hasFlagMonogram) {
  //   giftWrapLineItem.attributes = giftWrapLineItem.attributes || [];
  // }

  if (isFinalSale) {
    productLineItem.attributes.push({
      key: "_LPROP",
      value: "final-sale",
    });
  }

  if (hasFlagMonogram) {
    productLineItem.attributes.push({
      key: "Monogram-2",
      value: "Flag",
    });
  }

  lineItems.push(productLineItem);

  Tapcart.actions.updateCartNote({
    note: giftMessage,
  });
  Tapcart.actions.addToCart({
    lineItems: lineItems,
  });

  document.querySelector(".add-to-cart").innerText = "Added Gift Wrap!"; // temporarily changes the button
  document.querySelector(".add-to-cart").disabled = true; // temporarily disables the add to cart button
  Tapcart.actions.showToast({
    message: "Added Product & Gift Wrapping",
    type: "success", // "success" || "error"
  });

  setTimeout(() => {
    // giftWrappingContainer.classList.add('hidden'); // Hides the checkbox
    giftWrappingCheckbox.checked = false; // unchecks the box so it is not aded again
    document.querySelector(".add-to-cart").innerText = "Add to cart"; // restore button text
    document.querySelector(".add-to-cart").disabled = false; // removes disabled class
  }, 2000);
}

// Adds the current product AND a monogram product
function addMonogram() {
  console.log("addMonogram function called");
  console.log("Variant: " + monogrammingVariantID);
  console.log("Style: " + monogrammingStyleName);
  console.log("Location: " + monogrammingLocation);
  console.log("Monogram: " + monogrammingText);

  const lineItems = [];

  const monogramLineItem = {
    quantity: 1,
    variantId: monogrammingVariantID,
    productId: "6786596175914",
    attributes: [
      {
        key: "Monogram ID",
        value: selectedVariantId,
      },
      {
        key: "Monogram for",
        value: productTitle, // Current product title
      },
      {
        key: "Style",
        value: monogrammingStyleName, // Get the value of selected radio button with the div "monogram-style"
      },
      {
        key: "Location",
        value: monogrammingLocation, // get the data-location attribute from the input field
      },
      {
        key: "Monogram",
        value: monogrammingText,
      },
    ],
  };
  lineItems.push(monogramLineItem);

  const productLineItem = {
    quantity: 1,
    variantId: selectedVariantId,
    attributes: [
      {
        key: "Monogram ID",
        value: selectedVariantId,
      },
      {
        key: "Style",
        value: monogrammingStyleName, // Get the value of selected radio button with the div "monogram-style"
      },
      {
        key: "Location",
        value: monogrammingLocation, // get the data-location attribute from the input field
      },
      {
        key: "Monogram",
        value: monogrammingText,
      },
      {
        key: "_LPROP",
        value: "final-sale",
      },
    ],
  };
  // if (isFinalSale) {
  //   productLineItem.attributes.push({
  //     key: "_LPROP",
  //     value: "final-sale",
  //   });
  // }

  if (hasFlagMonogram) {
    productLineItem.attributes.push({
      key: "Monogram-2",
      value: "Flag",
    });
  }
  lineItems.push(productLineItem);

  Tapcart.actions.addToCart({
    lineItems: lineItems,
  });

  document.querySelector(".add-to-cart").innerText = "Added Monogram!"; // temporarily update add-to-cart button text
  document.querySelector(".add-to-cart").disabled = true; // temporarily disable add to cart button
  Tapcart.actions.showToast({
    message: "Added Product & Monogramming",
    type: "success", // "success" || "error"
  });

  setTimeout(() => {
    // monogrammingContainer.classList.add('hidden'); // Hides the checkbox
    monogrammingCheckbox.checked = false; // Unchecks the box
    document.querySelector(".add-to-cart").innerText = "Add to cart"; // returns button to previous state
    document.querySelector(".add-to-cart").disabled = false; // removes disabled
  }, 2000);
}

function addAll() {
  console.log("addAll function called");
  Tapcart.actions.addToCart({
    lineItems: [
      {
        quantity: 1,
        variantId: giftWrapVariantID,
        productId: giftWrapProductID,
        attributes: [
          {
            key: "Gift Wrapped item",
            value: productTitle,
          },
          {
            key: "Gift ID",
            value: selectedVariantId,
          },
          {
            key: "Gift Message",
            value: giftMessage,
          },
        ],
      },
      {
        quantity: 1,
        variantId: monogrammingVariantID,
        productId: "6786596175914",
        attributes: [
          {
            key: "Monogram ID",
            value: selectedVariantId,
          },
          {
            key: "Monogram for",
            value: productTitle, // Current product title
          },
          {
            key: "Style",
            value: monogrammingStyleName, // Get the value of selected radio button with the div "monogram-style"
          },
          {
            key: "Location",
            value: monogrammingLocation, // get the data-location attribute from the input field
          },
          {
            key: "Monogram",
            value: monogrammingText,
          },
          {
            key: "_LPROP",
            value: "final-sale",
          },
        ],
      },
      {
        quantity: 1,
        variantId: selectedVariantId, //current product
        attributes: [
          {
            key: "Gift ID",
            value: selectedVariantId, // pairs the gift wrapping to the product
          },
        ],
      },
    ],
  });

  document.querySelector(".add-to-cart").innerText = "Added Both!";
  document.querySelector(".add-to-cart").disabled = true;
  Tapcart.actions.showToast({
    message: "Added Product, Gift Wrap, & Monogram  ",
    type: "success", // "success" || "error"
  });

  setTimeout(() => {
    // monogrammingContainer.classList.add('hidden'); // Hides the checkbox
    // giftWrappingContainer.classList.add('hidden'); // Hides the checkbox
  }, 2000);
}
