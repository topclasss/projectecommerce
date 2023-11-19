
export const handleAddToCart = async (productId) => {
try{
const url = '/add-to-cart'
//missing costumerId
const customerId = "12345"
const body = {customerId, productId}

console.log("customerId",customerId)
console.log("productId", productId)
console.log("url", url)

const response = await fetch(url, {
    method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
console.log("response", response)
     if (!response.ok) {
        throw new Error(`Add product to cart failed`);
      }
  
      const result = await response.json();
  
      console.log(result);
    } catch (error) {
      console.error(`Error during adding product to cart`, error);
    }
  };