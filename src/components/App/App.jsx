import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.jsx';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import RegistrationSuccessPage from '../RegistrationSuccessPage/RegistrationSuccessPage.jsx';
import GearListPage from '../GearListPage/GearListPage';
import EventListPage from '../EventListPage/EventListPage';
import AddGearPage from '../AddGearPage/AddGearPage';
import AddEventPage from '../AddEventPage/AddEventPage';
import UpdateGearPage from '../UpdateGearPage/UpdateGearPage';
import UpdateEventPage from '../UpdateEventPage/UpdateEventPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Header />
        {/* If no user is logged in, don't render the nav bar */}
        {user.id && (
          // If there's no user, don't show nav bar
          <Nav />
        )}



        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows GearListPage else shows LoginPage
            exact
            path="/gearlist"
          >
            <GearListPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows EventListPage else shows LoginPage
            exact
            path="/eventlist"
          >
            <EventListPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddGearPage else shows LoginPage
            exact
            path="/addgear"
          >
            <AddGearPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddEventPage else shows LoginPage
            exact
            path="/addevent"
          >
            <AddEventPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UpdateGearPage else shows LoginPage
            exact
            path="/updategear/:toolId"
          >
            <UpdateGearPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UpdateEventPage else shows LoginPage
            exact
            path="/updateevent/:eventId"
          >
            <UpdateEventPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /gearlist page
              <Redirect to="/gearlist" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /gearlist page
              <Redirect to="/gearlist" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/registrationsuccess"
          >
            <RegistrationSuccessPage />
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /gearlist page
              <Redirect to="/gearlist" />
              :
              // Otherwise, show the Login page
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
