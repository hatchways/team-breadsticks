import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import { AuthProvider } from './context/useAuthContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { ConvoProvider } from './context/useConvoContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import TempDashboardMain from './pages/TempDashboardMain/TempDashboardMain';
import Listings from './pages/Listings/Listings';
import MySitters from './pages/MySitters/MySitters';
import MyJobs from './pages/MyJobs/MyJobs';
import Profile from './pages/Profile/Profile';
import ProfileDetail from './pages/Profile/ProfileDetail/ProfileDetail';
import Landing from './pages/Landing/Landing';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import PaymentProfile from './pages/Payment/Payment';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentProfilesProvider } from './context/usePaymentProfilesContext';
import './App.css';

const stripePromise = loadStripe();

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <PaymentProfilesProvider>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <ProtectedRoute exact path="/dashboard" component={TempDashboardMain} />
                  <Route exact path="/listings" component={Listings} />
                  <Route path="/listings/:sitterId" component={ProfileDetail} />
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/profile/:setting" component={Profile} />
                  <Elements stripe={stripePromise}>
                    <ProtectedRoute exact path="/payment" component={PaymentProfile} />
                  </Elements>
                  <ConvoProvider>
                    <Route exact path="/messages" component={Messages} />
                  </ConvoProvider>

                  <Route exact path="/my-sitters" component={MySitters} />
                  <Route exact path="/my-jobs" component={MyJobs} />
                    <Route exact path="/" component={Landing} />
                  <Route exact path="/notifications" component={Notifications} />
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </PaymentProfilesProvider>
            </SocketProvider>

        
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
