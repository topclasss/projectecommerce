 
 
 export const handleRemoveFromCart = async (productId, removeToCart, customerId) => {
    try{
    const url = '/remove-from-cart'
    const body = {customerId, productId}
    
    const response = await fetch(url, {
        method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
    
         if (!response.ok) {
            throw new Error(`Remove product from cart failed`);
          }
      
          const result = await response.json();
          if (result.status === 200) {
            removeToCart(productId)
       console.log("result", result.status) 
       }else{
        }
        } catch (error) {
          console.error(`Error during removing from cart'}:`, error);
        }
      }; 