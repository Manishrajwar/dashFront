
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  try {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      // the body will send like this to backend
      body: JSON.stringify(body),
    });

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
  }
};

export const makeTrailUnauthenticatedPOSTRequest = async (route) => {
  try {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      // the body will send like this to backend
      body: JSON.stringify({}),
    });

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
  }
};

// ! post request
export const makeAuthenticatedPOSTRequest = async (route, body , token) => {
  try {
    const response = await fetch( route, {
      method: "POST",
      
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // the body will send like this to backend
      body: JSON.stringify(body),
    });

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
  }
};
// ! post request
export const makeAuthenticatedCONTENTPOSTRequest = async (route, formData, token) => {
  try {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
  }
};


// ! get request
export const makeAuthenticatedGETRequest = async (route , token) => {
  try {
    const response = await fetch(route, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
  }
};

// ! update request
export const makeAuthenticatedUPDATERequest = async (route , body , token) => {
  try {
    const response = await fetch(route, {
      method: "PUT",
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),

    });
   
    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
  }
};
// ! update request
export const makeAuthenticatedUPDATEWITHOUTRequest = async (route, formData, token) => {
  try {
    const response = await fetch(route, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
    throw error; // Rethrow the error so the caller can handle it
  }
};


// ! update request
export const makeAuthenticatedPUTRequest = async (route , body , token) => {
  try {
    const response = await fetch(route, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),

    });
   
    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
  }
};


// ! delete request
export const makeAuthenticatedDELETERequest = async(route , token)=>{
  try{
    const response = await fetch(route , {
      method:"DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
  }catch (error) {
    console.log(`error in fetch api `, error);
  }
}
// ! delete request
export const makeAuthenticatedDATADELETERequest = async(route ,body , token)=>{
  try{
    const response = await fetch(route , {
      method:"DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),

    });
    const formattedResponse = await response.json();
    return formattedResponse;
  }catch (error) {
    console.log(`error in fetch api `, error);
  }
}