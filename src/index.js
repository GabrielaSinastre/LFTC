// No index importa-se o React, que renderizara toda a aplicacao
// importar o arquivo App e o index.css que estiliza a aplicacao
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Essa funcao usa o react para mostrar/renderizar toda a aplicacao rodando
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
