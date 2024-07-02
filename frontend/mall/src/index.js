import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Provider store={store}> // 리액트 쿼리, 리코일 사용 후에 리덕스 툴킷 설정(스토어 관련 설정) 삭제
        <RecoilRoot>
            <App />
        </RecoilRoot>
    // </Provider>
);

reportWebVitals();
