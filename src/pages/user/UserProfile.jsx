import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import { useForm } from "react-hook-form";
import Sidebar from "./components/Sidebar";
import InputField from "../../common/components/InputField";
import { orderHistoryApi } from "../../api/orderApi";
import "./UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const { user, setUser } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("user"))?.token;
        const response = await fetch(
          `http://localhost:3000/api/user/getuser/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          reset(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [id, reset]);

  // Fetch order history
  const handleOrderHistory = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const token = user.token;
      const userId = user.id;
      const history = await orderHistoryApi(token, userId);
      setOrderHistory(history);
      setShowHistory((prev) => !prev);
      console.log(orderHistory, "order history");
    } catch (err) {
      console.error(err);
    }
  };

  // Handle profile update
  const onSubmit = async (data) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("user"))?.token;
      const response = await fetch(
        `http://localhost:3000/api/user/updateuser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        alert("Profile Updated Successfully!");
        setIsModalOpen(false);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar userData={userData} orders={orderHistory} />

      <div className="p-6 flex flex-col w-full">
        <button className="button-primary mb-4" onClick={handleOrderHistory}>
          Order History
        </button>

        {showHistory && (
          <div className="custom-p-6 bg-white shadow-md rounded-xl max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-bold custom-mb-4">Order History</h2>
            {orderHistory.orders.length > 0 ? (
              orderHistory.orders.map((order) => (
                <div
                  key={order._id}
                  className="order-card mb-4 p-4 border rounded"
                >
                  <h3 className="text-lg font-semibold">{order.bookName}</h3>
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.items.quantity}
                  </p>
                  <p>Book id : {order.items.id}</p>
                  <p>
                    <strong>Total Price:</strong> Rs.{order.totalPrice}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}

        {userData ? (
          <div className="custom-p-6 bg-white shadow-md rounded-xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold custom-mb-4">User Profile</h2>
            <div className="custom-grid-2 grid grid-cols-2 gap-4">
              <p>
                <strong>Username:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>First Name:</strong> {userData.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {userData.lastName}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone}
              </p>
              <p>
                <strong>Gender:</strong> {userData.gender}
              </p>
              <p>
                <strong>Address:</strong> {userData.address?.address}
              </p>
              <p>
                <strong>City:</strong> {userData.address?.city}
              </p>
              <p>
                <strong>State:</strong> {userData.address?.state}
              </p>
              <p>
                <strong>Country:</strong> {userData.address?.country}
              </p>
              <p>
                <strong>Zip:</strong> {userData.address?.zip}
              </p>
              <p>
                <strong>Birth Date:</strong> {userData.birthDate?.split("T")[0]}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="button-primary pd3"
            >
              Edit Profile
            </button>

            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-container">
                  <h2 className="text-xl font-semibold custom-mb-4">
                    Edit Profile
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Username"
                        name="username"
                        defaultValue={userData.username}
                        register={register}
                        errors={errors}
                        required
                      />
                      <InputField
                        label="Email"
                        name="email"
                        defaultValue={userData.email}
                        register={register}
                        errors={errors}
                        required
                      />
                      <InputField
                        label="First Name"
                        name="firstName"
                        defaultValue={userData.firstName || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="Last Name"
                        name="lastName"
                        defaultValue={userData.lastName || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="Phone"
                        name="phone"
                        defaultValue={userData.phone || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="Gender"
                        name="gender"
                        defaultValue={userData.gender || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="Address"
                        name="address.address"
                        defaultValue={userData.address?.address || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="City"
                        name="address.city"
                        defaultValue={userData.address?.city || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="State"
                        name="address.state"
                        defaultValue={userData.address?.state || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="Country"
                        name="address.country"
                        defaultValue={userData.address?.country || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="Zip"
                        name="address.zip"
                        defaultValue={userData.address?.zip || ""}
                        register={register}
                        errors={errors}
                      />
                      <InputField
                        label="Birth Date"
                        name="birthDate"
                        type="date"
                        defaultValue={userData.birthDate?.split("T")[0]}
                        register={register}
                        errors={errors}
                      />
                    </div>
                    <div className="modal-buttons space-x-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="button-primary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="button-primary hover:r:bg-green-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
