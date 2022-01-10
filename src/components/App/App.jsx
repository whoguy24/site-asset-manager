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
    
    // <Router>
    //   <div>
    //     <Nav />
    //     <Switch>
    //       {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
    //       <Redirect exact from="/" to="/home" />

    //       {/* Visiting localhost:3000/about will show the about page. */}
    //       <Route
    //         // shows AboutPage at all times (logged in or not)
    //         exact
    //         path="/about"
    //       >
    //         <AboutPage />
    //       </Route>

    //       {/* For protected routes, the view could show one of several things on the same route.
    //         Visiting localhost:3000/user will show the UserPage if the user is logged in.
    //         If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
    //         Even though it seems like they are different pages, the user is always on localhost:3000/user */}
    //       <ProtectedRoute
    //         // logged in shows UserPage else shows LoginPage
    //         exact
    //         path="/user"
    //       >
    //         <UserPage />
    //       </ProtectedRoute>

    //       <ProtectedRoute
    //         // logged in shows InfoPage else shows LoginPage
    //         exact
    //         path="/info"
    //       >
    //         <InfoPage />
    //       </ProtectedRoute>

    //       <Route
    //         exact
    //         path="/login"
    //       >
    //         {user.id ?
    //           // If the user is already logged in, 
    //           // redirect to the /user page
    //           <Redirect to="/user" />
    //           :
    //           // Otherwise, show the login page
    //           <LoginPage />
    //         }
    //       </Route>

    //       <Route
    //         exact
    //         path="/registration"
    //       >
    //         {user.id ?
    //           // If the user is already logged in, 
    //           // redirect them to the /user page
    //           <Redirect to="/user" />
    //           :
    //           // Otherwise, show the registration page
    //           <RegisterPage />
    //         }
    //       </Route>

    //       <Route
    //         exact
    //         path="/home"
    //       >
    //         {user.id ?
    //           // If the user is already logged in, 
    //           // redirect them to the /user page
    //           <Redirect to="/user" />
    //           :
    //           // Otherwise, show the Landing page
    //           <LandingPage />
    //         }
    //       </Route>

    //       {/* If none of the other routes matched, we will show a 404. */}
    //       <Route>
    //         <h1>404</h1>
    //       </Route>
    //     </Switch>
    //     <Footer />
    //   </div>
    // </Router>




  );
}

export default App;
