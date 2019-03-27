import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { platform, IOS } from '@vkontakte/vkui/dist/lib/platform';

const Root = ({ id, activeView, isBack, match, children }) => {
  const currentPlatform = platform();
  const transitionEnterTimeout = currentPlatform === IOS ? 800 : 400;
  const transitionLeaveTimeout = currentPlatform === IOS ? 900 : 500;
  return (
    <ReactCSSTransitionGroup
      transitionName={isBack ? "view-back" : "view"}
      transitionEnterTimeout={transitionEnterTimeout}
      transitionLeaveTimeout={transitionLeaveTimeout}
    >
      {children.find(child => child.props.id === activeView)}
    </ReactCSSTransitionGroup>
  );
};

export default Root;