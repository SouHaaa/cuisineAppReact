import React from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Acceuil from './composants/Acceuil';
import Detail from './composants/Detail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import general from './general';
import NavBar from './NavigationBar'
import SearchRecette from './composants/SearchRecette';
import SearchByName from './composants/SearchByName';
import history from './history';


function App() {

  return (
    <div className="App">
      <Router history={history}>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Acceuil} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/search/:nom" component={SearchByName} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
