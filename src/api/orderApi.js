export const orderHistoryApi = async (token,id) => {
  const response = await fetch("http://localhost:3000/api/orders/history", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      id: id,
    },
  });
  return response.json();
};

