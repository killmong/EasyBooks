import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import { useForm } from "react-hook-form";
import "./UserProfile.css";

const requiredFields = [
  "firstname",
  "lastname",
  "email",
  "username",
  "address",
  "phone",
  "birthDate",
];

const UserProfile = ({
  userId, // Optional: override route param
  apiUrl = "http://localhost:3000/api/user/getUser",
  onProfileUpdate = () => {},
  showIncompleteModal = true,
}) => {
  const { id: routeId } = useParams();
  const id = userId || routeId;
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(LoginContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("user")
            )}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUserData(data);

        if (showIncompleteModal) {
          const isIncomplete = requiredFields.some(
            (field) => !data[field] || data[field].trim?.() === ""
          );
          if (isIncomplete) setShowModal(true);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [id, apiUrl, showIncompleteModal]);

  const handleCompleteProfile = () => {
    setShowModal(false);
    onProfileUpdate(); // Trigger parent callback
    alert("Profile Updated Successfully!");
    window.location.reload();
  };

  const onSubmit = async (data) => {
    console.log(data);
    handleCompleteProfile();
  };

  return (
    <div className="flex flex-col profileContainer justify-center h-screen bg-gray-100 p-4">
      <h1>User Profile</h1>
      {userData && (
        <div className="bg-white p-4 rounded shadow-md w-1/2 mx-auto">
          <h2 className="text-xl font-bold">{userData.username}</h2>
          <p>Email: {userData.email || ""}</p>
          <p>First Name: {userData.firstname || ""}</p>
          <p>Last Name: {userData.lastname || ""}</p>
        </div>
      )}

      {showModal && (
        <div className="profileWrapper">
          <div className="h-screen flex flex-col pd1 gap-2 bg-gray-100 p-6">
            <h1 className="text-3xl text-center font-bold mb-4 text-blue-500">
              Complete Your Profile
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white innerWrapper p-6 rounded-lg pd7 shadow-md w-full max-w-xl"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label>First Name</label>
                  <input
                    defaultValue={userData?.firstname || ""}
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

                {/* Last Name */}
                <div>
                  <label>Last Name</label>
                  <input
                    defaultValue={userData?.lastname || ""}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label>Username</label>
                  <input
                    defaultValue={userData?.username || ""}
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Email */}
                <div>
                  <label>Email</label>
                  <input
                    defaultValue={userData?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                {/* Mobile */}
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
                    <p className="text-red-500 text-sm">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
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
                    <p className="text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Birth Date */}
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

                {/* Address Fields */}
                {["address", "city", "state", "country", "zip"].map((field) => (
                  <div
                    key={field}
                    className={field === "address" ? "col-span-2" : ""}
                  >
                    <label>
                      {field === "address"
                        ? "Street Address"
                        : field[0].toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      defaultValue={userData?.address?.[field] || ""}
                      {...register(`address.${field}`, {
                        required: `${
                          field[0].toUpperCase() + field.slice(1)
                        } is required`,
                      })}
                      className="input input-bordered w-full"
                      placeholder={field === "address" ? "123 Main St" : ""}
                    />
                    {errors.address?.[field] && (
                      <p className="text-red-500 text-sm">
                        {errors.address[field].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button type="submit" className="button-primary mt-4">
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
