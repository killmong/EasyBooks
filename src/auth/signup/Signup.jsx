import React from "react";
import "./Signup.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const signup = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            birthDate: data.birthDate,
            address: data.address,
            city: data.city,
            country: data.country,
            postalCode: data.postalCode,
            phone: data.phone,
          }),
        });

        const userData = await res.json();
        if (res.ok) {
          sessionStorage.setItem("token", userData.token);
          sessionStorage.setItem("signup", userData.id);
          toast.success("User created successfully!", {
            position: "top-center",
          });
          setTimeout(() => navigate(`/user/completeprofile`), 1000);
        } else {
          toast.error(userData.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    };

    signup();
  };

  return (
    <div className="bg-neutral-100 h-screen w-screen pd10 flex items-center justify-center">
      <div className="flex flex-row justify-between signup-container">
        <div className="left-container">
          <img src="vite.svg" className="w-[100px] h-[50px]" alt="" />
          <h2 className="text-2xl text-blue-400 bg-gradient-to-r capitalize">
            Signup
          </h2>
          <p className="text-neutral-800 capitalize text-xl">
            to Unlock a World of Stories, Knowledge, and Endless Adventures!
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div className="flex flex-col input-container">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_]{3,16}$/,
                    message:
                      "Username must be 3-16 characters (no special characters)",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>

            {/* First & Last Name */}
            <div className="flex justify-between gap-4">
              <div className="flex flex-col input-container">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                />
                {errors.firstname && (
                  <p className="text-red-500">{errors.firstname.message}</p>
                )}
              </div>
              <div className="flex flex-col input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastname && (
                  <p className="text-red-500">{errors.lastname.message}</p>
                )}
              </div>
            </div>

            {/* Email & Password */}
            <div className="flex justify-between gap-4">
              <div className="flex flex-col input-container">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col input-container mt-4">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must be 6+ chars, include upper, lower, number & special char",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Remember Me */}
            <div className="input-container">
              <div className="flex justify-between">
                <span className="text-base">
                  <input type="checkbox" /> Remember me
                </span>
                <Link className="hover:text-blue-400">Forgot Password!</Link>
              </div>
              <button className="button w-full" type="submit">
                Signup
              </button>
            </div>

            {/* Link to login */}
            <span className="flex mt-2">
              <p className="capitalize">Already have an account? </p>
              <Link
                to="/login"
                className="text-blue-700 hover:text-blue-500 ml-2"
              >
                Login!
              </Link>
            </span>
          </form>
        </div>

        <div className="h-[100vh] md:block w-[50%] bg-neutral-200 flex items-center justify-center">
          <div className="lg:w-[60%] bg h-[600px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
