import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import theme from './theme.js';
import '@fontsource/jua/400.css';
import './index.css';

/**
 * HashRouter 사용 이유:
 * GitHub Pages 는 /about 같은 경로를 새로고침하면 404 가 나기 때문에
 * 주소에 # 을 붙이는 방식(/#/about)으로 라우팅합니다.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
);
