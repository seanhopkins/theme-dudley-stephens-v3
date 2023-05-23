import "preact/debug";
import { render } from "preact";
import Form from "./components/Form";

const monogramForm = document.querySelector("#monogram-form");
const data = {
  monogram_product: JSON.parse(
    document.querySelector("#monogram-product-data").innerHTML
  ),
  monogram_product_initial_variant: JSON.parse(
    document.querySelector("#monogram-product-initial-variant-data").innerHTML
  ),
  parent_product: JSON.parse(
    document.querySelector("#parent-product-data").innerHTML
  ),
  parent_product_initial_variant: JSON.parse(
    document.querySelector("#parent-product-initial-variant-data").innerHTML
  ),
};

render(<Form data={data} />, monogramForm);

class MonogramToggle extends HTMLElement {
  constructor() {
    super();

    this.monogramModal = new theme.Modals("MonogramModal", "monogram-modal");

    this.addToCart = document.querySelector("button.add-to-cart");

    this.checkbox = this.querySelector('input[type="checkbox"]');
    this.buttonWrapper = this.querySelector(".monogram-button-wrapper");
  }

  connectedCallback() {
    this.checkbox.addEventListener("change", this.toggleButtons.bind(this));
  }

  toggleButtons() {
    this.buttonWrapper.classList.toggle("hide");
    this.addToCart.classList.toggle("hide");
  }
}

customElements.define("monogram-toggle", MonogramToggle);

class MonogramCustomizer extends HTMLElement {
  constructor() {
    super();

    this.form = this.querySelector("form");

    this.mainSlider = this.querySelector("[data-product-photos]");
    this.childNav = this.querySelector("[data-product-thumbs]");
    this.thumbScroller = this.querySelector(".product__thumbs--scroller");
    this.firstSlide = this.querySelector(".product-main-slide:first-child");
  }

  addTextOverlay() {
    let span = document.createElement("span");
    span.classList.add("text-overlay", "classic");
    span.innerHTML = `<span class="first">A</span><span class="middle">B</span><span class="last">C</span>`;

    this.firstSlide.prepend(span);
  }

  connectedCallback() {
    if (theme.settings.cartType === "drawer") {
      new theme.AjaxProduct(this.form, ".monogram__add-to-cart");
    }

    var args = {
      dragThreshold: 25,
      adaptiveHeight: true,
      avoidReflow: false,
      initialIndex: 0,
      childNav: this.childNav,
      childNavScroller: this.thumbScroller,
      childVertical: this.childNav.dataset.position === "beside",
      pageDots: true, // mobile only with CSS
      wrapAround: true,
    };

    this.flickity = new theme.Slideshow(this.mainSlider, args);

    this.addTextOverlay();

    document.addEventListener("modalOpen.MonogramModal", () => {
      // resize on modal open or else it doesn't show up
      this.flickity.resize();
    });
  }
}

customElements.define("monogram-customizer", MonogramCustomizer);
