import { createTheme } from '@mui/material/styles';

/**
 * MUI 테마
 * 색상 값은 '컬러 팔레트 디자인 시스템.md' 의 CSS 변수와 같은 값입니다.
 * MUI 가 내부에서 hover 색 등을 계산할 수 있도록 var() 대신 HEX 값을 넣었습니다.
 * 시스템 다크모드 설정(prefers-color-scheme)에 따라 light / dark 가 자동 전환됩니다.
 */
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'media',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#FFC8EA',
          light: '#FFD8F0',
          dark: '#E8A5CC',
          contrastText: '#000000',
        },
        secondary: {
          main: '#977190',
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#000000',
          secondary: '#666666',
          disabled: '#A8A8A8',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#FFC8EA',
          light: '#3A2A35',
          dark: '#FFD8F0',
          contrastText: '#000000',
        },
        secondary: {
          main: '#C9A3C0',
          contrastText: '#000000',
        },
        background: {
          default: '#1A1418',
          paper: '#2A2128',
        },
        text: {
          primary: '#F5EEF2',
          secondary: '#C9B8C3',
          disabled: '#8E7F89',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Apple SD Gothic Neo", "Noto Sans KR", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
