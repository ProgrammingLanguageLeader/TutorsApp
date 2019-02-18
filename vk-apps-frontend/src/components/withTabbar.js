import React from 'react';

import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import Root from '@vkontakte/vkui/dist/components/Root/Root';

import Tabbar from 'vk-apps-frontend/components/Tabbar';

const withTabbar = (
  WrappedComponent,
  currentUserId,
  unreadNotificationsCount,
  selectedItem,
  popout,
) => {
  class ComponentWithTabbar extends React.Component {
    render() {
      return (
        <Epic activeStory="root" tabbar={
          <Tabbar
            userId={currentUserId}
            selectedItem={selectedItem}
            unreadNotificationsCount={unreadNotificationsCount}
          />
        }>
          <Root id="root" activeView="view" popout={popout}>
            <WrappedComponent id="view" {...this.props} />
          </Root>
        </Epic>
      );
    }
  }

  return ComponentWithTabbar;
};

export default withTabbar;