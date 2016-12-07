import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Button from './components/Button/Button';
import FilteringSelect from './components/FilteringSelect/FilteringSelect';
import filteringSelectOptions from './store/filteringSelectOptions';
import DateInput from './components/DateInput/DateInput';

export default (
  <Route path="/" component={App}>
    <Route path="button" component={Button} key="1" />
    <Route
      path="filteringSelect" component={() => (
        <FilteringSelect
          name="test"
          options={filteringSelectOptions}
          changeHandler={(name, val) => { console.log(`${name} control value: ${val}`); }} />
        )}
      key="2" />
    <Route path="dateInput" component={() => (<DateInput name="testDate" />)} key="3" />
  </Route>
);
