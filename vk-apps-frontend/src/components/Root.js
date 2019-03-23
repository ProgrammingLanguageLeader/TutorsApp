import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { platform, IOS } from '@vkontakte/vkui/dist/lib/platform';

const Root = ({ id, activeView, isBack, match, children }) => {
  const currentPlatform = platform();
  const transitionTimeout = currentPlatform === IOS ? 600 : 500;
  return (
    <ReactCSSTransitionGroup
      transitionName={isBack ? "view-back" : "view"}
      transitionEnterTimeout={transitionTimeout}
      transitionLeaveTimeout={transitionTimeout}
    >
      {children.find(child => child.props.id === activeView)}
    </ReactCSSTransitionGroup>
  );
};

export default Root;