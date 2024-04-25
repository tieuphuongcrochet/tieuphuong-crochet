import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './config/routerConfig';
import './index.scss';
import { ConfigProvider } from 'antd';
import LanguageProvider from 'components/LanguageProvider';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#fc8282',
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </Provider>
    </LanguageProvider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
