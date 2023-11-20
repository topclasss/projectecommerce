


export const handleAddToCart = async (productId, addToCart, customerId) => {
try{
const url = '/add-to-cart'
const body = {customerId, productId}


const response = await fetch(url, {
    method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

     if (!response.ok) {
        throw new Error(`Add product to cart failed`);
      }
  
      const result = await response.json();
      if (result.status === 200) {
       addToCart(productId)
  console.log("result", result.status)
 } else {

  }
    } catch (error) {
      console.error(`Error during adding product to cart`, error);
    }
  };