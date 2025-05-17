// src/api/authAPI.js
export const loginUser = async (username, password) => {
  try {
    const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const userData = await res.json();
    console.log(userData);

    if (!res.ok) {
      throw new Error(userData.message || "Login failed");
    }

    return userData;
  } catch (error) {
    throw new Error(error.message || "Something went wrong during login");
  }
};
// src/api/authAPI.js

export const signupUser = async (userData) => {
  try {
    const res = await fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong during signup");
  }
};

export const getUser = async (id, token) => {
  try {
    const res = await fetch(`http://localhost:3000/api/user/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch user data");
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while fetching user data"
    );
  }
};
