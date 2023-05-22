class ColorSwatches extends HTMLElement {
   constructor() {
     super();
   }
 
   connectedCallback() {
     this.handle = this.getAttribute('product-handle');
 
     fetch(`${location.origin}/products/${this.handle}?view=color-swatches`)
       .then((response) => response.text())
       .then((html) => {
         this.innerHTML = html;
       });
   }
 }
 
 customElements.define('color-swatches', ColorSwatches);
 