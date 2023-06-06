import "./styles.css";
const designTokens = {
  core: {
    "#F0EAFF": {
      value: "#F0EAFF",
      type: "color",
      description: "Milky White"
    },
    "#5B2BC2": {
      value: "#5B2BC2",
      type: "color",
      description: "Spacy Violet"
    },
    "#FF8800": {
      value: "#FF8800",
      type: "color",
      description: "Fantastic Orange"
    },
    "#4B3280": {
      value: "#4B3280",
      type: "color",
      description: "Galactic Black"
    },
    "#ffffff": {
      value: "#ffffff",
      type: "color",
      description: "Nova White"
    },
    "linear_gradient_#FF8800_#FFC700": {
      value: "linear-gradient(135deg, $#FF8800 0%, #FFC700 100%);",
      type: "color",
      description: "Sunny Orange"
    },
    dropshadow: {
      small: {
        value: [
          {
            x: "-10px",
            y: "-10px",
            blur: "20px",
            spread: "5px",
            color: "$#ffffff",
            type: "dropShadow"
          },
          {
            x: "10px",
            y: "10px",
            blur: "20px",
            spread: "5px",
            color: "#C1AEF0",
            type: "dropShadow"
          }
        ],
        type: "boxShadow",
        description: "Small Dropshadow"
      }
    },
    "#test123": {
      value: "#DED6F0",
      type: "color",
      description: "Galactic Border"
    },
    fontFamilies: {
      body: {
        value: "Poppins",
        type: "fontFamilies"
      },
      heading: {
        value: "Poppins",
        type: "fontFamilies"
      }
    },
    fontWeights: {
      bodyRegular: {
        value: "Regular",
        type: "fontWeights"
      }
    },
    dimension: {
      desktop: {
        scale: {
          value: "0.5rem",
          type: "dimension"
        },
        xs: {
          value: "0.5rem",
          type: "dimension"
        },
        sm: {
          value: "{dimension.desktop.xs} + {dimension.desktop.scale}",
          type: "dimension"
        },
        md: {
          value: "{dimension.desktop.sm}+{dimension.desktop.scale}",
          type: "dimension"
        },
        lg: {
          value: "{dimension.desktop.md}+{dimension.desktop.scale}",
          type: "dimension"
        },
        xl: {
          value: "{dimension.desktop.lg}+{dimension.desktop.scale}",
          type: "dimension"
        }
      }
    },
    fontSizes: {
      body: {
        value: "1rem",
        type: "fontSizes"
      },
      h3: {
        value: "1.5rem",
        type: "fontSizes"
      }
    }
  }
};

function convertDesignTokensToCSSVariables(designTokens, prefix = "") {
  let cssVariables = "";

  for (const key in designTokens) {
    const token = designTokens[key];

    // Überprüfen, ob es sich bei dem aktuellen Token um ein Objekt handelt
    if (typeof token === "object") {
      const updatedPrefix = prefix ? `${prefix}-${key}` : key;
      // Rekursiv die Funktion aufrufen, um die inneren Tokens zu verarbeiten
      cssVariables += convertDesignTokensToCSSVariables(token, updatedPrefix);
    } else {
      // Wenn es sich nicht um ein Objekt handelt, handelt es sich um einen Wert
      const variableName = `--${prefix}-${key}`;
      // Ersetzen von Token-Referenzen im Wert durch CSS-Variablen
      const variableValue = token.replace(/{([^}]+)}/g, (match, p1) => {
        return `var(--${prefix}-${p1.trim()})`;
      });
      // Zusammenstellen der CSS-Variable mit Namen und Wert
      cssVariables += `${variableName}: ${variableValue};\n`;
    }
  }

  return cssVariables;
}

const cssVariables = convertDesignTokensToCSSVariables(designTokens);
console.log(cssVariables);

document.getElementById("app").innerHTML = "<pre>" + cssVariables + "</pre>";
