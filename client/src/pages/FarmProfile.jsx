import { useState } from "react";
import axios from "axios";

function FarmProfile() {
    const [formData, setFormData] = useState({
        farmerName: "",
        location: "",
        crop: "Wheat",
        soilType: "loamy",
        farmSize: "",
        growthStage: "vegetative",
        farmingActivity: "general"
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);

        try {
            await axios.post(
                "http://localhost:5000/api/farms",
                {
                    ...formData,
                    farmSize: Number(formData.farmSize)
                }
            );

            setMessage("Farm preferences saved successfully! 🌾");

            setFormData({
                farmerName: "",
                location: "",
                crop: "Wheat",
                soilType: "loamy",
                farmSize: "",
                growthStage: "vegetative",
                farmingActivity: "general"
            });

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to save farm preferences"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="farm-profile-page">

            <section className="farm-profile-hero">
                <span className="farm-profile-icon">🌾</span>

                <div>
                    <p className="farm-profile-eyebrow">
                        FARM PROFILE
                    </p>

                    <h1>Save Your Farm Preferences</h1>

                    <p>
                        Add your farm details to receive more
                        personalized farming recommendations.
                    </p>
                </div>
            </section>

            <section className="farm-profile-card">

                <form onSubmit={handleSubmit}>

                    <div className="farm-profile-grid">

                        <div className="farm-form-group">
                            <label>Farmer Name</label>

                            <input
                                type="text"
                                name="farmerName"
                                value={formData.farmerName}
                                onChange={handleChange}
                                placeholder="Enter farmer name"
                                required
                            />
                        </div>

                        <div className="farm-form-group">
                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter village/city"
                                required
                            />
                        </div>

                        <div className="farm-form-group">
                            <label>Crop</label>

                            <select
                                name="crop"
                                value={formData.crop}
                                onChange={handleChange}
                            >
                                <option>Wheat</option>
                                <option>Rice</option>
                                <option>Maize</option>
                                <option>Potato</option>
                                <option>Tomato</option>
                                <option>Cotton</option>
                                <option>Mustard</option>
                                <option>Sugarcane</option>
                            </select>
                        </div>

                        <div className="farm-form-group">
                            <label>Soil Type</label>

                            <select
                                name="soilType"
                                value={formData.soilType}
                                onChange={handleChange}
                            >
                                <option value="loamy">Loamy</option>
                                <option value="sandy">Sandy</option>
                                <option value="clayey">Clayey</option>
                                <option value="silty">Silty</option>
                                <option value="black">Black Soil</option>
                                <option value="red">Red Soil</option>
                            </select>
                        </div>

                        <div className="farm-form-group">
                            <label>Farm Size (acres)</label>

                            <input
                                type="number"
                                name="farmSize"
                                value={formData.farmSize}
                                onChange={handleChange}
                                placeholder="e.g. 5"
                                min="0"
                                step="0.1"
                                required
                            />
                        </div>

                        <div className="farm-form-group">
                            <label>Growth Stage</label>

                            <select
                                name="growthStage"
                                value={formData.growthStage}
                                onChange={handleChange}
                            >
                                <option value="seedling">
                                    Seedling
                                </option>

                                <option value="vegetative">
                                    Vegetative
                                </option>

                                <option value="flowering">
                                    Flowering
                                </option>

                                <option value="fruiting">
                                    Fruiting
                                </option>

                                <option value="maturity">
                                    Maturity
                                </option>

                                <option value="harvesting">
                                    Harvesting
                                </option>
                            </select>
                        </div>

                        <div className="farm-form-group farm-form-full">
                            <label>Farming Activity</label>

                            <select
                                name="farmingActivity"
                                value={formData.farmingActivity}
                                onChange={handleChange}
                            >
                                <option value="general">
                                    General Farming
                                </option>

                                <option value="irrigation">
                                    Irrigation
                                </option>

                                <option value="sowing">
                                    Sowing
                                </option>

                                <option value="fertilization">
                                    Fertilization
                                </option>

                                <option value="spraying">
                                    Spraying
                                </option>

                                <option value="harvesting">
                                    Harvesting
                                </option>
                            </select>
                        </div>

                    </div>

                    {message && (
                        <div className="farm-success-message">
                            ✅ {message}
                        </div>
                    )}

                    {error && (
                        <div className="farm-error-message">
                            ❌ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="farm-save-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "💾 Save Farm Preferences"}
                    </button>

                </form>

            </section>

        </main>
    );
}

export default FarmProfile;