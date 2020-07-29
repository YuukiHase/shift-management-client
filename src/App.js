import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import themeUI from './themeUI';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
import DateFnsUtils from '@date-io/date-fns';
import NotFoundPage from './pages/NotFoundPage';

const theme = createMuiTheme(themeUI);

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <Switch>
              <PrivateRoute exact path='/' component={DashboardPage} />
              <Route path='/login' component={LoginPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router >
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

export default App;
