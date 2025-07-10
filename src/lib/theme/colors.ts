import { ThemeConfig } from './types';

// Brand colors - 메인 브랜드 컬러 팔레트
export const brandColors = {
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe', 
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // 메인 브랜드 컬러
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  }
};

// 성공, 경고, 에러 등의 시스템 컬러
export const systemColors = {
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  }
};

// 라이트 테마 설정
export const lightTheme: ThemeConfig = {
  colors: {
    ...brandColors,
    primary: brandColors.brand[500],
    secondary: '#f1f5f9',
    accent: brandColors.brand[100],
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f8fafc',
    border: '#e2e8f0',
    card: '#ffffff',
    popover: '#ffffff',
    destructive: systemColors.danger[500],
    warning: systemColors.warning[500],
    success: systemColors.success[500],
    info: systemColors.info[500],
  },
  radius: '0.5rem',
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif'
    ],
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'Monaco',
      'Consolas',
      'monospace'
    ]
  }
};

// 다크 테마 설정
export const darkTheme: ThemeConfig = {
  colors: {
    ...brandColors,
    primary: brandColors.brand[400],
    secondary: '#1e293b',
    accent: brandColors.brand[900],
    background: '#0f172a',
    foreground: '#f8fafc',
    muted: '#1e293b',
    border: '#334155',
    card: '#1e293b',
    popover: '#1e293b',
    destructive: systemColors.danger[400],
    warning: systemColors.warning[400],
    success: systemColors.success[400],
    info: systemColors.info[400],
  },
  radius: '0.5rem',
  fontFamily: lightTheme.fontFamily
};

export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const;
