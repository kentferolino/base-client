import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors'
import store from './store';
import { loadUser } from './actions/authActions';
import Main from './Main';

const theme = createMuiTheme({ palette: { primary: blue } })

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <MuiThemeProvider theme={theme}>
              <Main />
            </MuiThemeProvider>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
