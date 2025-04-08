import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="flex flex-row justify-between login-container">
      <div className="left-container">
        <img src="vite.svg" className="w-[100px] h-[50px]" alt="" />

        <h2 className="text-2xl text-blue-400 bg-gradient-to-r capitalize ">
          login. <span>curl up</span>
        </h2>
        <p className="text-neutral-800 capitalize text-xl">
          Dive Into! a world full of stories
        </p>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col input-container ">
            <label htmlFor="email">email</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1 input-container mt-4">
            <label htmlFor="password">password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="input-container">
            <div className="flex justify-between">
              <span className="text-base">
                <input type="checkbox" /> Remember me
              </span>
              <Link className="hover:text-blue-400">Forgot Password!</Link>
            </div>
            <button className="button w-full" type="submit">
              Login
            </button>
          </div>

          <span className="flex">
            <p className="capitalize">not registered yet? </p>
            <Link to="/signup" className="text-blue-400 hover:text-blue-500 ">
              Create an account
            </Link>
          </span>
        </form>
      </div>
      <div className="w-[60%] bg h-screen"></div>
    </div>
  );
};

export default Login;
