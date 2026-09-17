function RecommendationCard({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const categories = {
    irrigation: {
      title: "Irrigation",
      icon: "💧",
      items: []
    },

    rainfall: {
      title: "Rainfall",
      icon: "🌧️",
      items: []
    },

    spraying: {
      title: "Spraying",
      icon: "🧪",
      items: []
    },

    weather: {
      title: "Weather & Temperature",
      icon: "🌡️",
      items: []
    },

    growth: {
      title: "Growth Stage",
      icon: "🌱",
      items: []
    },

    protection: {
      title: "Crop Protection",
      icon: "🛡️",
      items: []
    },

    general: {
      title: "General Advice",
      icon: "🌾",
      items: []
    }
  };

  // Categorize recommendations
  recommendations.forEach((recommendation) => {
    const text = recommendation.toLowerCase();

    if (
      text.includes("irrigation") ||
      text.includes("water") ||
      text.includes("soil moisture")
    ) {
      categories.irrigation.items.push(recommendation);
    } 
    
    else if (
      text.includes("rainfall") ||
      text.includes("rain") ||
      text.includes("rainy")
    ) {
      categories.rainfall.items.push(recommendation);
    } 
    
    else if (
      text.includes("spraying") ||
      text.includes("spray") ||
      text.includes("pesticide") ||
      text.includes("foliar")
    ) {
      categories.spraying.items.push(recommendation);
    } 
    
    else if (
      text.includes("temperature") ||
      text.includes("hot") ||
      text.includes("cold") ||
      text.includes("heat")
    ) {
      categories.weather.items.push(recommendation);
    } 
    
    else if (
      text.includes("sowing") ||
      text.includes("flowering") ||
      text.includes("vegetative") ||
      text.includes("maturity") ||
      text.includes("harvesting") ||
      text.includes("growth stage")
    ) {
      categories.growth.items.push(recommendation);
    } 
    
    else if (
      text.includes("pest") ||
      text.includes("disease") ||
      text.includes("crop protection")
    ) {
      categories.protection.items.push(recommendation);
    } 
    
    else {
      categories.general.items.push(recommendation);
    }
  });

  return (
    <section className="recommendation-card">

      <div className="section-title">
        <span>💡</span>

        <div>
          <h2>Farming Recommendations</h2>
          <p>Personalized advice based on crop and weather conditions</p>
        </div>
      </div>

      <div className="recommendation-categories">

        {Object.values(categories).map((category) => {

          if (category.items.length === 0) {
            return null;
          }

          return (
            <div
              className="recommendation-category"
              key={category.title}
            >

              <div className="category-header">
                <span className="category-icon">
                  {category.icon}
                </span>

                <h3>{category.title}</h3>
              </div>

              <div className="category-list">

                {category.items.map((recommendation, index) => (
                  <div
                    className="recommendation-item"
                    key={index}
                  >

                    <span className="recommendation-icon">
                      ✓
                    </span>

                    <p>{recommendation}</p>

                  </div>
                ))}

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default RecommendationCard;