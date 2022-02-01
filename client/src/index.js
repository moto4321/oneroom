import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
import { CookiesProvider } from "react-cookie";
import './App.css'


ReactDOM.render(
  <CookiesProvider>
    <RecoilRoot>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RecoilRoot>
  </CookiesProvider>,
  document.getElementById('root')
);
