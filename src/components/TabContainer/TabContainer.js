import React, {Component, PropTypes} from 'react';
import './TabContainer.scss';

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.handleOnClickTab = this.handleOnClickTab.bind(this);
    this.state = {
      activeTabName: props.activeTab || props.children[0].name
    };
  }

  handleOnClickTab(e) {
    e.stopPropagation();
    const activeTabName = e.target.name;
    this.setState({activeTabName});
    this.props.changeHandler(activeTabName);
  }

  renderHeader(activeTabName, children = []) {
    return (
      children.map((child, i) => <button
        className={`tab-container__tab${(activeTabName === child.props.name) ? ' active' : ''}`}
        name={child.props.name}
        key={i}
        onClick={this.handleOnClickTab}>
        {child.props.name}
      </button>
    ));
  }

  renderContent(activeTabName, children = []) {
    const content = children.filter(child => child.props.name === activeTabName)[0];
    return content;
  }

  render() {
    const {activeTabName} = this.state;
    const {children} = this.props;
    return (
      <div className="tab-container">
        <div className="tab-container__header">
          {this.renderHeader(activeTabName, children)}
        </div>
        <div className="tab-container__content">
          {this.renderContent(activeTabName, children)}
        </div>
      </div>
    );
  }
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  changeHandler: PropTypes.func.isRequired,
  activeTab: PropTypes.string
};

export default TabContainer;
