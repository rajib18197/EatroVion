// const BASE_URL = "https://httpstat.us/404"; // mock API for originate error

const BASE_URL = "https://restaurantlistings.onrender.com";

export async function fetchAllCities() {
  try {
    const response = await fetch(`${BASE_URL}/cities`);
    console.log(response, response.ok);
    if (!response.ok) {
      console.log(2222);
      const error = new Error("could not be loaded all the cities");
      error.code = response.status;
      // error.info = await response.json();
      console.log(error);
      throw error;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// need to change name
export async function getCity({ id }) {
  try {
    const response = await fetch(`${BASE_URL}/cities/${id}`);
    if (!response.ok) {
      const error = new Error("could not get your city. please try again!");
      error.code = error.status;
      error.info = await response.json();
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createCity({ newCity }) {
  try {
    const response = await fetch(`${BASE_URL}/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("could not be loaded all the cities");
      error.code = error.status;
      error.info = await response.json();
      throw error;
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateCity({ id, updatedCityData }) {
  try {
    const response = await fetch(`${BASE_URL}/cities/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedCityData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("could not be loaded all the cities");
      error.code = error.status;
      error.info = await response.json();
      throw error;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteCity({ id }) {
  try {
    const response = await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = new Error("could not be loaded all the cities");
      error.code = response.status;
      console.log(error);
      throw error;
    }
    return { success: true };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
