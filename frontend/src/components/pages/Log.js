
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next"; // Import useTranslation
// import axios from "axios";
// import Loader from "../loader/Loader";

// const Login = ({ setRole }) => {
//   const { t } = useTranslation(); // Use the translation hook
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     setTimeout(async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/api/auth/login",
//           { email, password },
//           { withCredentials: true }
//         );

//         const { token, role } = response.data;

//         if (token) {
//           localStorage.setItem("token", token);
//           setRole(role);
//         }
//       } catch (error) {
//         setError(error.response?.data?.error || t("loginFailed"));
//         console.error("Login failed:", error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <h1 className="text-2xl font-semibold">{t("login")}</h1>
//             {error && <p className="text-red-500 mt-2">{error}</p>}

//             {isLoading && <Loader />}

//             <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//               <div className="relative">
//                 <input
//                   autoComplete="off"
//                   id="email"
//                   name="email"
//                   type="email"
//                   className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
//                   placeholder={t("email")}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   disabled={isLoading}
//                 />
//                 <label
//                   htmlFor="email"
//                   className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                 >
//                   {t("email")}
//                 </label>
//               </div>

//               <div className="relative">
//                 <input
//                   autoComplete="off"
//                   id="password"
//                   name="password"
//                   type="password"
//                   className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
//                   placeholder={t("password")}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   disabled={isLoading}
//                 />
//                 <label
//                   htmlFor="password"
//                   className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                 >
//                   {t("password")}
//                 </label>
//               </div>

//               <div className="relative">
//                 <button
//                   type="submit"
//                   className={`bg-cyan-500 text-white rounded-md px-2 py-1 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-600'}`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? <span className="spinner"></span> : t("submit")}
//                 </button>
//               </div>
//             </form>

//             <div className="w-full flex justify-center">
//               <button
//                 className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 disabled={isLoading}
//               >
//                 <svg
//                   className="h-6 w-6 mr-2"
//                   xmlns="http://www.w3.org/2000/svg"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   width="800px"
//                   height="800px"
//                   viewBox="-0.5 0 48 48"
//                   version="1.1"
//                 >
//                   <title>Google-color</title>
//                   <desc>Created with Sketch.</desc>
//                   <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//                     <g id="Color-" transform="translate(-401.000000, -860.000000)">
//                       <g id="Google" transform="translate(401.000000, 860.000000)">
//                         <path
//                           d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
//                           id="Fill-1"
//                           fill="#FBBC05"
//                         />
//                         <path
//                           d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
//                           id="Fill-2"
//                           fill="#EB4335"
//                         />
//                         <path
//                           d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
//                           id="Fill-3"
//                           fill="#34A853"
//                         />
//                         <path
//                           d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
//                           id="Fill-4"
//                           fill="#4285F4"
//                         />
//                       </g>
//                     </g>
//                   </g>
//                 </svg>
//                 <span>{t("continueWithGoogle")}</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import axios from "axios";
import Loader from "../loader/Loader";

const Login = ({ setRole }) => {
  const { t } = useTranslation(); // Use the translation hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password },
          { withCredentials: true }
        );
        const { token, role } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          setRole(role);
        }
      } catch (error) {
        setError(error.response?.data?.error || t("loginFailed"));
        console.error("Login failed:", error.message);
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg--950 py-6 flex flex-col sm:py-12">
      {/* Container for the Login Box */}
      <div className="relative mt-3 ml-auto mr-24  sm:max-w-xl">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        {/* White Login Box */}
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-green-950">{t("login")}</h1>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {isLoading && <Loader />}
            <form
              onSubmit={handleLogin}
              className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              {/* Email Input */}
              <div className="relative">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="email"
                  className="peer placeholder-transparent h-10 w-full bg-transparent border-b-2 border-green-950 text-green-950 focus:outline-none focus:border-green-500"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-green-950 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-green-950 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-950 peer-focus:text-sm"
                >
                  {t("email")}
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
                  className="peer placeholder-transparent h-10 w-full bg-transparent border-b-2 border-green-950 text-green-950 focus:outline-none focus:border-green-500"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-green-950 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-green-950 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-950 peer-focus:text-sm"
                >
                  {t("password")}
                </label>
              </div>

              {/* Submit Button */}
              <div className="relative">
                <button
                  type="submit"
                  className={`text-green-950 ring-2 ring-green-950 rounded-md px-4 py-2 hover:ring-green-700 focus:outline-none focus:ring-4 focus:ring-green-700 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? <span className="spinner"></span> : t("submit")}
                </button>
              </div>
            </form>

            {/* Google Login Button */}
            <div className="w-full flex justify-center mt-4">
              <button
                className="flex items-center ring-2 ring-green-950 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-green-950 hover:ring-green-700 focus:outline-none focus:ring-4 focus:ring-green-700"
                disabled={isLoading}
              >
                <svg
                  className="h-6 w-6 mr-2 text-green-950"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  {/* Google SVG Icon */}
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    fill="#EB4335"
                  />
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    fill="#34A853"
                  />
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    fill="#4285F4"
                  />
                </svg>
                <span>{t("continueWithGoogle")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;