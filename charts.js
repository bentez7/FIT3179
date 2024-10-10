// Line Chart
vegaEmbed('#linechart', {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 800,
    "height": 400,
    "title": "Trends in National Estimates of Overweight, Stunting, and Severe Wasting (1986–2022)",
    "data": {
      "url": "https://raw.githubusercontent.com/bentez7/FIT3179/main/Cleaned_data.csv"
    },
    "transform": [
      {
        "fold": [
          "Overweight_National_Point_Estimate",
          "Stunting_National_Point_Estimate",
          "Severe_Wasting_National_Point_Estimate"
        ],
        "as": ["Types of Malnutrition", "National Point Estimate"]
      }
    ],
    "mark": "line",
    "encoding": {
      "x": {
        "field": "Year",
        "type": "temporal",
        "axis": {"title": "Year"}
      },
      "y": {
        "field": "National Point Estimate",
        "type": "quantitative",
        "axis": {"title": "National Point Estimates"}
      },
      "color": {
        "field": "Types of Malnutrition",
        "type": "nominal",
        "legend": {"title": "Types of Malnutrition"}
      }
    }
  });
  
  // Bar Chart
  vegaEmbed('#barchart', {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "title": "Stunting Estimates by Income Group (Asian Countries)",
    "width": 800,
    "height": 400,
    "data": {
      "url": "https://raw.githubusercontent.com/bentez7/FIT3179/main/Income%20and%20stunning%20dataset.csv",
      "format": {"type": "csv"}
    },
    "mark": "bar",
    "encoding": {
      "y": {
        "field": "Countries",
        "type": "nominal",
        "title": "Country",
        "sort": "-x"
      },
      "x": {
        "field": "Estimate",
        "type": "quantitative",
        "title": "Stunting (%)"
      },
      "color": {
        "field": "Income Groups",
        "type": "nominal",
        "title": "Income Group",
        "scale": {
          "domain": ["High Income", "Upper Middle Income", "Lower Middle Income"],
          "range": ["#377eb8", "#e41a1c", "#ff7f00"]
        }
      }
    }
  });
  
  // Scatterplot
  vegaEmbed('#scatterplot', {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "title": "Stunting Estimates vs Education Disparities in Asia",
    "width": 600,
    "height": 400,
    "data": {
      "url": "https://raw.githubusercontent.com/bentez7/FIT3179/main/Education%20and%20stunning.csv",
      "format": {"type": "csv"}
    },
    "layer": [
      {
        "mark": "point",
        "encoding": {
          "x": {
            "field": "Education",
            "type": "quantitative",
            "title": "Education Disparity"
          },
          "y": {
            "field": "Estimate",
            "type": "quantitative",
            "title": "Stunting Estimate (%)"
          }
        }
      },
      {
        "transform": [
          {"regression": "Estimate", "on": "Education", "method": "linear"}
        ],
        "mark": {
          "type": "line",
          "color": "black",
          "strokeDash": [4, 4]
        }
      }
    ]
  });
  
  // Map of Malaysia
  vegaEmbed('#map', {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "title": "Stunting Percentage by State in Malaysia",
    "width": 1200,
    "height": 600,
    "projection": {
      "type": "mercator",
      "scale": 3000,
      "translate": [600, 300],
      "center": [110, 3]
    },
    "layer": [
      {
        "data": {
          "url": "https://raw.githubusercontent.com/FIT3179/Vega-Lite/main/7_others/oceans.topojson",
          "format": { "type": "topojson", "feature": "oceans" }
        },
        "mark": { "type": "geoshape", "fill": "skyblue" }
      },
      {
        "mark": {"type": "geoshape", "fill": "#e0dac2", "stroke": "white"}
      },
      {
        "data": {
          "url": "https://raw.githubusercontent.com/bentez7/FIT3179/main/malaysia-states.topojson",
          "format": {"type": "topojson", "feature": "states"}
        },
        "transform": [
          {
            "lookup": "properties.Name",
            "from": {
              "data": {
                "url": "https://raw.githubusercontent.com/bentez7/FIT3179/main/Stunting(Malaysia).csv",
                "format": {"type": "csv"}
              },
              "key": "States",
              "fields": ["Percentage"]
            }
          }
        ],
        "mark": {"type": "geoshape"},
        "encoding": {
          "color": {
            "field": "Percentage",
            "type": "quantitative",
            "scale": {"scheme": "reds"}
          }
        }
      }
    ]
  });