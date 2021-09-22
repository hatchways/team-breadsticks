import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import TempDashboardMain from './pages/TempDashboardMain/TempDashboardMain';
import Listings from './pages/Listings/Listings';
import ChatSideBanner from './components/ChatSideBanner/ChatSideBanner';
import MySitters from './pages/MySitters/MySitters';
import MyJobs from './pages/MyJobs/MyJobs';
import Profile from './pages/Profile/Profile';
import ProfileDetail from './pages/Profile/ProfileDetail/ProfileDetail';
import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/dashboard" component={TempDashboardMain} />
                <Route exact path="/listings" component={Listings} />
                <Route path="/listings/:sitterId" component={ProfileDetail} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/messages" component={ChatSideBanner} />
                <Route exact path="/my-sitters" component={MySitters} />
                <Route exact path="/my-jobs" component={MyJobs} />
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
