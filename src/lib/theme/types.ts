export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  card: string;
  popover: string;
  destructive: string;
  warning: string;
  success: string;
  info: string;
}

export interface BrandColors {
  brand: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

export interface ThemeConfig {
  colors: ThemeColors & BrandColors;
  radius: string;
  fontFamily: {
    sans: string[];
    mono: string[];
  };
}
