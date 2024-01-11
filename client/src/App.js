import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './files/App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import LoginPage from "./User/pages/Login";
import RegisterPage from "./User/pages/Register";

import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    return (
      <ThemeProvider theme={theme}>
          <div className="w-100">
            <Provider store={props.store}>
              <Navbar />
                <div className="w-100 pt-5 mt-5">
										<NotificationContainer />
                    <BrowserRouter>
                      <Switch>
												<Route path="/" exact component={PostListPage} />
												<Route path="/login" exact component={LoginPage} />
                        <Route path="/register" exact component={RegisterPage} />
                        <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
												<Route path="*" component={() => "404 Page Not Found"} />
                      </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
          </div>
      </ThemeProvider>
);
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
