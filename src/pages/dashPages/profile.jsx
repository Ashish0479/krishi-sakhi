import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../redux/slices/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = () => {
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.email}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Contact Number</label>
            {isEditing ? (
              <input
                type="text"
                name="contactNumber"
                value={formData?.contactNumber || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.contactNumber}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={formData?.gender || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={formData?.dateOfBirth?.split("T")[0] || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.dateOfBirth?.split("T")[0]}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-600">State</label>
            {isEditing ? (
              <select
                name="state"
                value={formData?.state || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select State</option>
                <option value="Kerala">Kerala</option>
                <option value="Haryana">Haryana</option>
                <option value="Punjab">Punjab</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.state}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-600">District</label>
            {isEditing ? (
              <input
                type="text"
                name="district"
                value={formData?.district || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.district}</p>
            )}
          </div>

          {/* Village */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Village</label>
            {isEditing ? (
              <input
                type="text"
                name="village"
                value={formData?.village || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.village}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Pincode</label>
            {isEditing ? (
              <input
                type="text"
                name="pincode"
                value={formData?.pincode || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.pincode}</p>
            )}
          </div>

          {/* Land Size */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Land Size (acres)</label>
            {isEditing ? (
              <input
                type="number"
                name="landSize"
                value={formData?.landSize || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.landSize}</p>
            )}
          </div>

          {/* Land Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Land Type</label>
            {isEditing ? (
              <input
                type="text"
                name="landType"
                value={formData?.landType || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.landType}</p>
            )}
          </div>

          {/* Current Crop */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Current Crop</label>
            {isEditing ? (
              <input
                type="text"
                name="currentCrop"
                value={formData?.currentCrop || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.currentCrop}</p>
            )}
          </div>

          {/* Crops (Comma separated) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Other Crops</label>
            {isEditing ? (
              <input
                type="text"
                name="crops"
                value={formData?.crops?.join(",") || ""}
                onChange={(e) =>
                  setFormData({ ...formData, crops: e.target.value.split(",") })
                }
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.crops?.join(", ")}</p>
            )}
          </div>

          {/* Farming Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Farming Experience (years)</label>
            {isEditing ? (
              <input
                type="number"
                name="farmingExperience"
                value={formData?.farmingExperience || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.farmingExperience}</p>
            )}
          </div>

          {/* Water Source */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Water Source</label>
            {isEditing ? (
              <input
                type="text"
                name="waterSource"
                value={formData?.waterSource || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.waterSource}</p>
            )}
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Soil Type</label>
            {isEditing ? (
              <input
                type="text"
                name="soilType"
                value={formData?.soilType || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.soilType}</p>
            )}
          </div>

          {/* Planting Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Planting Date</label>
            {isEditing ? (
              <input
                type="date"
                name="plantingDate"
                value={formData?.plantingDate?.split("T")[0] || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.plantingDate?.split("T")[0]}</p>
            )}
          </div>

          {/* Irrigation Method */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Irrigation Method</label>
            {isEditing ? (
              <select
                name="irrigationMethod"
                value={formData?.irrigationMethod || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select Method</option>
                <option value="Drip">Drip</option>
                <option value="Sprinkler">Sprinkler</option>
                <option value="Surface">Surface</option>
                <option value="Subsurface">Subsurface</option>
                <option value="Manual">Manual</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.irrigationMethod}</p>
            )}
          </div>

          {/* Fertilizer Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Fertilizer Preference</label>
            {isEditing ? (
              <select
                name="fertilizerPreference"
                value={formData?.fertilizerPreference || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select Preference</option>
                <option value="Organic">Organic</option>
                <option value="Chemical">Chemical</option>
                <option value="Mixed">Mixed</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.fertilizerPreference}</p>
            )}
          </div>

          {/* Pesticide Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Pesticide Usage</label>
            {isEditing ? (
              <select
                name="pesticideUsage"
                value={formData?.pesticideUsage || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select Usage</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Organic">Organic</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.pesticideUsage}</p>
            )}
          </div>

          {/* Mechanization Level */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Mechanization Level</label>
            {isEditing ? (
              <select
                name="mechanizationLevel"
                value={formData?.mechanizationLevel || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select Level</option>
                <option value="Manual">Manual</option>
                <option value="Semi">Semi</option>
                <option value="Fully">Fully</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.mechanizationLevel}</p>
            )}
          </div>

          {/* Primary Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Primary Goal</label>
            {isEditing ? (
              <select
                name="primaryGoal"
                value={formData?.primaryGoal || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select Goal</option>
                <option value="Maximize Yield">Maximize Yield</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Cost Efficiency">Cost Efficiency</option>
                <option value="Quality Improvement">Quality Improvement</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.primaryGoal}</p>
            )}
          </div>

          {/* Budget Level */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Budget Level</label>
            {isEditing ? (
              <select
                name="budgetLevel"
                value={formData?.budgetLevel || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select Budget</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.budgetLevel}</p>
            )}
          </div>

          {/* Market Access */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Market Access</label>
            {isEditing ? (
              <select
                name="marketAccess"
                value={formData?.marketAccess || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              >
                <option value="">Select Access</option>
                <option value="Local">Local</option>
                <option value="Regional">Regional</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">{user?.marketAccess}</p>
            )}
          </div>

          {/* Notifications */}
          <div className="col-span-2 flex items-center gap-2">
            {isEditing ? (
              <>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData?.notifications || false}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label className="text-sm font-medium text-gray-600">Enable Notifications</label>
              </>
            ) : (
              <p className="mt-1 p-2 bg-gray-100 rounded-lg">
                Notifications: {user?.notifications ? "Enabled" : "Disabled"}
              </p>
            )}
          </div>

        </div>

        {/* Save / Cancel */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
