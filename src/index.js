import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import WorklogstoreService from './services/bookstore-service';
import { WorklogstoreServiceProvider } from './components/bookstore-service-context';



const worklogstoreService = new WorklogstoreService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <WorklogstoreServiceProvider value={worklogstoreService}>
        <Router>
          <App />
        </Router>
      </WorklogstoreServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);