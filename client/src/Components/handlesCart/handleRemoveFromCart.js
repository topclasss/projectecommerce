 export const handleRemoveFromCart = async (productId) => {
    try{
    const url = '/remove-from-cart'
    //missing costumerId
    const body = productId
    
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
      
          console.log(result);
        } catch (error) {
          console.error(`Error during removing from cart'}:`, error);
        }
      }; 