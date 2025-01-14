 
 
 export const handleRemoveFromCart = async (productId, removeToCart, customerId, setErrorMessage) => {
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

      
          const result = await response.json();
          if (result.status === 200) {
            removeToCart(productId)
            }else{
              setErrorMessage(result.message)
        }
        } catch (error) {
          setErrorMessage(`Error during removing from cart'}:`, error);
        }
      }; 