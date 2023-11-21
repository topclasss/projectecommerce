
export const GetCompanyId = async (companyNumber, setErrorMessage, setCompany) => {
    try{

    const response = await fetch(`/get-company/${companyNumber}`, {
        method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
            })

   
          const result = await response.json();

          if (result.status === 200) {
                 setCompany(result.data.name)
            }else{
              setErrorMessage(result.message)
        }
        } catch (error) {
          setErrorMessage(`Error during removing from cart'}:`, error);
        }
      }; 