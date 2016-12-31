import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Button from './components/Button/Button';
import FilteringSelect from './components/FilteringSelect/FilteringSelect';
import filteringSelectOptions from './store/filteringSelectOptions';
import DateInput from './components/DateInput/DateInput';
import TabContainer from './components/TabContainer/TabContainer';

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
    <Route
      path="dateInput" key="3" component={() => {
        const date = (new Date('2016', '11', '12')).toISOString();
        return (
          <DateInput
            value={date}
            name="testDate"
            changeHandler={val => { console.log(`testDate value: ${val}`); }} />
        );
      }} />
    <Route
      path="tabContainer" key="4" component={() => <TabContainer changeHandler={val => { console.log(`tabContainer content: ${val}`); }}>
        <div name="tab1">Tab1</div>
        <div name="tab2">Tab2</div>
      </TabContainer>} />
  </Route>
);
