///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Import App Components
import AppLogin from '../AppLogin/AppLogin';
import AppRegister from '../AppRegister/AppRegister';
import AppMain from '../AppMain/AppMain';

// Import Stylesheets
import './App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// The main app component, loaded by index.js.
// The main function of this component is to define routes along with their assigned components.

function App() {

  // Define Library Variables
  const dispatch = useDispatch();

  // Run on Component Load
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  // Render DOM
  return (
    <>

      {/* Router Switch */}
      <Router>
        <Switch>

          {/* Redirect to Main */}
          <Redirect exact from='/' to='/main' />

          {/* Login Page */}
          <Route exact path='/login'>
            <AppLogin />
          </Route>

          {/* Registration Page */}
          <Route exact path='/register'>
            <AppRegister />
          </Route>

          {/* Main App */}
          <ProtectedRoute exact path='/main'>
            <AppMain />
          </ProtectedRoute>

          {/* Invalid Path / Page Not Found */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
      </Router>

    </>

  );
}

// Export Component Function
export default App;
