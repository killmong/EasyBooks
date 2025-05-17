import React, { useEffect, useContext, useState } from "react";
import { LoginContext } from "../../../Context/LoginContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./profile.css";
const CompleteProfile = () => {
  const { user, setUser } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const id = sessionStorage.getItem("signup");
    const token = sessionStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/user/getUser/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (id && token) fetchUserData();
  }, [setUser]);

  const onSubmit = async (formData) => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/api/user/updateUser/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Profile update failed");

      const updatedUser = await res.json();
      setTimeout(() => {
        navigate("/login");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("signup");
        toast.success("Profile updated successfully! Please login again.");
      }, 1000);

      toast.success("Profile updated successfully!");
      setUser(updatedUser);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="h-screen flex flex-col m-auto center gap-2   p-6">
        <h1 className="text-3xl text-left font-bold mb-4 text-blue-500">
          User Profile
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white innerWrapper p-6 rounded-lg pd7 box-border   shadow-lg w-full max-w-xl"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>First Name</label>
              <input
                defaultValue={user.firstName}
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label>Last Name</label>
              <input
                defaultValue={user.lastName}
                {...register("lastName", { required: "Last name is required" })}
                className="input input-bordered w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label>Username</label>
              <input
                defaultValue={user.username}
                {...register("username", { required: "Username is required" })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label>Email</label>
              <input
                defaultValue={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div>
              <label>Mobile</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter valid 10-digit mobile number",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile.message}</p>
              )}
            </div>

            <div>
              <label>Gender</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="input input-bordered w-full"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <label>Birth Date</label>
              <input
                type="date"
                {...register("birthdate", {
                  required: "Birthdate is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm">
                  {errors.birthdate.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label>Street Address</label>
              <input
                defaultValue={user?.address?.address}
                {...register("address.address", {
                  required: "Street address is required",
                })}
                className="input input-bordered w-full"
                placeholder="123 Main St"
              />
              {errors.address?.address && (
                <p className="text-red-500 text-sm">
                  {errors.address.address.message}
                </p>
              )}
            </div>

            <div>
              <label>City</label>
              <input
                defaultValue={user?.address?.city}
                {...register("address.city", { required: "City is required" })}
                className="input input-bordered w-full"
                placeholder="City"
              />
              {errors.address?.city && (
                <p className="text-red-500 text-sm">
                  {errors.address.city.message}
                </p>
              )}
            </div>

            <div>
              <label>State</label>
              <input
                defaultValue={user?.address?.state}
                {...register("address.state", {
                  required: "State is required",
                })}
                className="input input-bordered w-full"
                placeholder="State"
              />
              {errors.address?.state && (
                <p className="text-red-500 text-sm">
                  {errors.address.state.message}
                </p>
              )}
            </div>

            <div>
              <label>Country</label>
              <input
                defaultValue={user?.address?.country}
                {...register("address.country", {
                  required: "Country is required",
                })}
                className="input input-bordered w-full"
                placeholder="Country"
              />
              {errors.address?.country && (
                <p className="text-red-500 text-sm">
                  {errors.address.country.message}
                </p>
              )}
            </div>

            <div>
              <label>ZIP Code</label>
              <input
                defaultValue={user?.address?.zip}
                {...register("address.zip", {
                  required: "ZIP code is required",
                })}
                className="input input-bordered w-full"
                placeholder="ZIP Code"
              />
              {errors.address?.zip && (
                <p className="text-red-500 text-sm">
                  {errors.address.zip.message}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="button-primary">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
