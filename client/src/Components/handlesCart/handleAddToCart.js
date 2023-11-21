


export const handleAddToCart = async (productId, addToCart, customerId, setErrorMessage) => {
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


  
      const result = await response.json();
      if (result.status === 200) {
       addToCart(productId)
  
 } else {
  setErrorMessage(result.message)

  }
    } catch (error) {
      setErrorMessage(`Error during adding product to cart`, error);
    }
  };