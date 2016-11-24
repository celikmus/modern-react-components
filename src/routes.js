import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Button from './components/Button/Button';
import FilteringSelect from './components/FilteringSelect/FilteringSelect';

export default (
  <Route path="/" component={App}>
    <Route path="button" component={Button} key="1" />
    <Route path="filteringSelect" component={FilteringSelect} key="2" />
  </Route>
);
