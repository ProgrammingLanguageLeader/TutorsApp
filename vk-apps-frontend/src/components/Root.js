import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Root = ({ id, activeView, isBack, match, children }) => {
  return (
    <ReactCSSTransitionGroup
      transitionName={isBack ? "view-back" : "view"}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {children.find(child => child.props.id === activeView)}
    </ReactCSSTransitionGroup>
  );
};

export default Root;