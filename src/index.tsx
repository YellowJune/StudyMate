import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 스타일 파일 있다면 여기에 import

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
