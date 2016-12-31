import React, {PropTypes} from 'react';
import './TabContainer.scss';

const TabContainer = ({children, changeHandler, activeTab}) => {
  const activeTabName = activeTab || children[0].props.name;

  const renderHeader = () => children.map((child, i) => child.props.name);
  const renderContent = () => {
    const content = children.filter(child => child.props.name === activeTabName)[0];
    return content;
  };
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

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  changeHandler: PropTypes.func.isRequired,
  activeTab: PropTypes.string
};

export default TabContainer;
