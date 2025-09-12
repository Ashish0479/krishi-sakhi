import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { createAccount } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [signUpState, setSignUpState] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    landSize: '',
    cropType: '',
    state: '',
    district: '',
    village: ''
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignUpState({
      ...signUpState,
      [name]: value
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!signUpState.name || !signUpState.email || !signUpState.mobileNumber || !signUpState.password) {
      toast.error(t("fill_required"));
      return;
    }

    if (signUpState.password !== signUpState.confirmPassword) {
      toast.error(t("password_mismatch"));
      return;
    }

    if (signUpState.mobileNumber.length < 10 || signUpState.mobileNumber.length > 12) {
      toast.error(t("invalid_mobile"));
      return;
    }

    const apiResponse = await dispatch(createAccount(signUpState));
    if (createAccount.fulfilled.match(apiResponse)) {
      toast.success(t("signup_success"));
      navigate('/login');
    } else {
      toast.error(apiResponse?.payload?.message || t("signup_failed"));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          {t("farmer_signup")}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("name")} <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.name}
              onChange={handleUserInput}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("email")} <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.email}
              onChange={handleUserInput}
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("mobile")}{" "}{t("number")} <span className="text-red-500">*</span>
            </label>
            <input
              name="mobileNumber"
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.mobileNumber}
              onChange={handleUserInput}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("password")} <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.password}
              onChange={handleUserInput}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("confirm")}{" "}{t("password")} <span className="text-red-500">*</span>
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.confirmPassword}
              onChange={handleUserInput}
              required
            />
          </div>

          {/* Land Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("land")}{t("size")}
            </label>
            <select
              name="landSize"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.landSize}
              onChange={handleUserInput}
            >
              <option value="">{t("select")}{t("land")}{t("size")}</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {t("acre")}{i + 1 > 1 ? t("acres") : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Crop Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("crop")}{" "}{t("type")}
            </label>
            <select
              name="cropType"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.cropType}
              onChange={handleUserInput}
            >
              <option value="">{t("select")}{t("crop")}{t("type")}</option>
              <option value="Wheat">{t("wheat")}</option>
              <option value="Rice">{t("rice")}</option>
              <option value="Maize">{t("maize")}</option>
              <option value="Sugarcane">{t("sugarcane")}</option>
              <option value="Cotton">{t("cotton")}</option>
              <option value="Pulses">{t("pulses")}</option>
              <option value="Vegetables">{t("vegetables")}</option>
              <option value="Fruits">{t("fruits")}</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("state")}
            </label>
            <input
              name="state"
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.state}
              onChange={handleUserInput}
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("district")}
            </label>
            <input
              name="district"
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.district}
              onChange={handleUserInput}
            />
          </div>

          {/* Village */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("village")}
            </label>
            <input
              name="village"
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={signUpState.village}
              onChange={handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {t("signup")}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {t("already_account")}{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
