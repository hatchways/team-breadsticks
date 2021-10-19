import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import { AuthProvider } from './context/useAuthContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { ConvoProvider } from './context/useConvoContext';
import { SocketProvider } from './context/useSocketContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import TempDashboardMain from './pages/TempDashboardMain/TempDashboardMain';
import Listings from './pages/Listings/Listings';
import Profile from './pages/Profile/Profile';
import ProfileDetail from './pages/Profile/ProfileDetail/ProfileDetail';
import Landing from './pages/Landing/Landing';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import Bookings from './pages/Bookings/Bookings';
import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SocketProvider>
          <SnackBarProvider>
            <AuthProvider>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <ProtectedRoute exact path="/dashboard" component={TempDashboardMain} />
                <Route exact path="/listings" component={Listings} />
                <Route path="/listings/:sitterId" component={ProfileDetail} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/profile/:setting" component={Profile} />
                <Route exact path="/notifications" component={Notifications} />
                <Route exact path="/bookings" component={Bookings} />
                <Route exact path="/" component={Landing} />
                <ConvoProvider>
                  <Route exact path="/messages" component={Messages} />
                </ConvoProvider>
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </AuthProvider>
          </SnackBarProvider>
        </SocketProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
