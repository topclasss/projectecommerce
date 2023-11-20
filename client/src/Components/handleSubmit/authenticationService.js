export const handleSubmit = async (isLogin, email, password, firstName, lastName, cart) => {
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


    if (!response.ok) {
      throw new Error(`${isLogin ? 'Login' : 'Registration'} failed`);
    }


    const result = await response.json();


    // Handle successful login/registration, redirect, etc...
    console.log(result);


    return result; // Return the result on success
  } catch (error) {
    console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
    throw error; //throw the error to indicate an unsuccessful login
  }
};
