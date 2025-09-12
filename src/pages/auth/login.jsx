import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { login } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginState({
      ...loginState,
      [name]: value
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!loginState.email || !loginState.password) {
      toast.error(t("fill_required"));
      return;
    }

    const apiResponse = await dispatch(login(loginState));

    if (login.fulfilled.match(apiResponse)) {
      toast.success(t("login_success"));
      navigate('/dashboard'); 
    } else {
      toast.error(apiResponse?.payload?.message || t("login_failed"));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          {t("farmer_login")}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("email")} <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md"
              value={loginState.email}
              onChange={handleUserInput}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("password")} <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md"
              value={loginState.password}
              onChange={handleUserInput}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {t("login")}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {t("no_account")}{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            {t("signup")}
          </Link>
        </p>
      </div>
    </div>
  );
}
