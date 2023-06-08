import { useState, useEffect } from "preact/hooks";

const Slider = ({ tierData, currentTierIndex }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async (productIdsArray) => {
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

      const req = await fetch("/api/2022-10/graphql.json", {
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Storefront-Access-Token":
            "2a1c6731e91ea55d317dbefc6ac50463",
        },
        method: "POST",
        body: mutation,
      });

      const res = await req.json();

      setProducts(res.data.nodes);
    };

    getProducts(tierData[currentTierIndex].productIdsArray);
  }, []);

  return (
    <div class="gwp-slider-wrapper">
      <h1>{currentTierIndex}</h1>

      {products.map((product) => {
        console.log(product);

        return (
          <div class="gwp__slide">
            <div class="grid grid--table-large">
              <div class="grid__item one-third">
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.title}
                />
              </div>

              <div class="grid__item two-thirds">
                <p>{product.title}</p>
              </div>
            </div>

            <div class="grid">
              <div class="grid__item one-whole">
                <a class="btn btn--small btn--full btn--primary" href="#">
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
