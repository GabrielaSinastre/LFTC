//importar todos as paginas da aplicacao e o react
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainHome from './components/pages/MainHome';
import Regex from './components/pages/Regex';
import Gramatica from './components/pages/Gramatica';
import AutoFin from './components/pages/AutoFin';

// essa funcao define cada uma das rotas a ser renderizada, tendo cada pagina
// um caminho diferente
function App() {
  return (
    <BrowserRouter basename={window.location.pathname || ''}>
      <Switch>
        <Route exact path='/' component={MainHome} />
        <Route path='/gramatica' component={Gramatica} />
        <Route path='/regex' component={Regex} />
        <Route path='/autofin' component={AutoFin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
