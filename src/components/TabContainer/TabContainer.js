import React from 'react';
import './TabContainer.scss';

const TabContainer = () => {
  const renderHeader = () => `hello header`;
  const renderContent = () => `hello content`;
  return (
    <div className="tab-container">
      <div className="tab-container__header">
        {renderHeader()}
      </div>
      <div className="tab-container__content">
        {renderContent()}
      </div>
    </div>
  );
};

TabContainer.propTypes = {};

export default TabContainer;
