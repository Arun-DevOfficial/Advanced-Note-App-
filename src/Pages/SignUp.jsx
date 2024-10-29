import { useState, useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import SigIn from "../assets/SignUp.svg";
import { handleGoogleSignIn } from "../auth/Oauth.js"; // Make sure this returns user data
import { Toaster, toast } from "react-hot-toast";
import { useCheckUserExists, useRegisterUser } from "../Hooks/useUsers.js";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../Context/NoteContext.jsx";

function Signup() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { data: userExists, refetch: checkUser } = useCheckUserExists(phone);
  const { mutate: register } = useRegisterUser();
  const navigate = useNavigate();
  const { setUsers } = useContext(NoteContext);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[+]*[0-9]{1,4} ?[0-9]{7,12}$/;
    if (!phone) {
      setError("Phone number is required");
      toast.error("Phone number is required!");
    } else if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number");
      toast.error("Please enter a valid phone number");
    } else {
      setError("");
      await checkUser();

      if (userExists) {
        toast.error("Phone number already exists. Please log in.");
      } else {
        register(
          { phone },
          {
            onSuccess: () => {
              toast.success("Registration successful!");
            },
            onError: () => {
              toast.error("Registration failed. Please try again.");
            },
          }
        );
      }
    }
  };

  const handleGoogleClick = async () => {
    try {
      const userData = await handleGoogleSignIn();

      if (userData) {
        const { accessToken, email, photoURL, displayName } = userData.data; // Extract user data

        // Set the user data in context, replacing the existing user data
        setUsers({
          accessToken,
          email,
          photoURL,
          displayName,
        });

        // Navigate to the dashboard after updating users
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
      toast.error("Google Sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 gap-8 px-4">
        {/* Left Image Section */}
        <div className="w-3/6 hidden lg:block">
          <img src={SigIn} alt="SignIn" className="w-full object-cover" />
        </div>

        {/* Right Form Section */}
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg transform transition duration-300 hover:shadow-xl">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
            Join with <span className="text-emerald-500">Notifly</span>
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                className="block text-sm font-semibold text-gray-500 mb-2 ml-4"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full p-4 border ${
                  error ? "border-red-500" : "border-gray-200"
                } rounded-full focus:border-gray-400 focus:outline-none text-gray-700 placeholder-gray-400`}
                placeholder="+1 234 567 890"
              />
              {error && (
                <p className="text-red-500 text-sm mt-3 ml-4">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 border border-emerald-500 text-emerald-500 hover:bg-emerald-400 hover:text-white font-semibold rounded-full transition duration-200"
            >
              Sign Up
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-gray-400">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <button
              onClick={handleGoogleClick}
              className="flex items-center justify-center w-full py-3 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition duration-200"
            >
              <FaGoogle className="mr-2 text-emerald-500" />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Signup;
