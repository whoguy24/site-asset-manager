import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AppLogin from '../AppLogin/AppLogin';
import AppRegister from '../AppRegister/AppRegister';
import AppMain from '../AppMain/AppMain';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (

    <Router>

      <Switch>

        <Redirect exact from='/' to='/main' />

        <Route exact path='/login'>
          <AppLogin />
        </Route>

        <Route exact path='/register'>
          <AppRegister />
        </Route>

        <ProtectedRoute exact path='/main'>
          <AppMain />
        </ProtectedRoute>

        <Route>
          <h1>404</h1>
        </Route>

      </Switch>

    </Router>

  );
}

export default App;
