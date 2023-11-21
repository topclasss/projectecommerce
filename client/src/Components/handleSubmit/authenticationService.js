export const handleSubmit = async (isLogin, email, password, firstName, lastName, cart, login, navigate, setErrorMessage) => {
  try {
    const url = isLogin ? '/get-customer-infos' : '/add-customer';


    const body = isLogin
      ? { email, password }
      : { email, password, firstName, lastName, cart };


    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

 


    const result = await response.json();

   
    // Handle successful login/registration, redirect, etc...// // And manage error message
    if (result.status === 201 ||  result.status === 200 ) 
   { login(result.data)
       navigate("/")
     } else {setErrorMessage(result.message)}
  



  } catch (error) {
    console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
  }
};
