const Step1AuthCheck = ({ nextStep }) => {
  const isLoggedIn = true; // Change as needed

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">User Authentication</h2>
      {isLoggedIn ? (
        <>
          <p className="text-green-600 mb-4">✅ You are logged in!</p>
          <button
            className="bg-violet-600 text-white px-4 py-2 rounded"
            onClick={nextStep}
          >
            Proceed to Address
          </button>
        </>
      ) : (
        <p className="text-red-500">Please log in to continue.</p>
      )}
    </div>
  );
};

export default Step1AuthCheck;
