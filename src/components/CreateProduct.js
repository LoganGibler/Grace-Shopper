import React, { useState } from "react";
import { getAllProducts } from "../api";

const CreateProduct = ({ param }) => {
  const [allProducts, setAllProducts] = useState("");

  async function fetchAllProducts() {
    const data = await getAllProducts();
    console.log("this is data", data);
    setAllProducts(data);
  }

  useEffect(async () => {
    const data = await getAllProducts();
    console.log(data)
    setAllProducts(data);
  }, []);

  return(
      <div>
          <form className="newproductform"
          id="newProductSubmit"
          onsubmit={async (event)=>{
              event.preventDefault()
              console.log("this is ProductForm")
              try {
                  const data = await attachProducts()
              } catch (error) {
                  throw error
              }
          }}>
            
          </form>
      </div>
  )

};

export default CreateProduct;
