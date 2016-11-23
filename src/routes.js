import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Button from './components/Button/Button';

export default (
  <Route path="/" component={App}>
    <Route path="button" component={Button} key="1" />
  </Route>
);
