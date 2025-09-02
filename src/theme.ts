export interface Theme {
  /** Color for browser icons and generic icons */
  iconColor: string;
  /** Color for "Yes" support indicators */
  supportYesColor: string;
  /** Color for "No" support indicators */
  supportNoColor: string;
  /** Primary text color */
  textColor: string;
  /** Border color for table elements */
  borderColor: string;
  /** Background color (mainly for potential future use) */
  backgroundColor: string;
}

export const lightTheme: Theme = {
  iconColor: "#696969",
  supportYesColor: "#007936", 
  supportNoColor: "#d30038",
  textColor: "#1b1b1b",
  borderColor: "#cdcdcd",
  backgroundColor: "#ffffff",
};

export const darkTheme: Theme = {
  iconColor: "#a0a0a0",
  supportYesColor: "#4ade80",
  supportNoColor: "#f87171", 
  textColor: "#e5e5e5",
  borderColor: "#404040",
  backgroundColor: "#1f1f1f",
};

export const defaultTheme = lightTheme;