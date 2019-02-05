import React from 'react';

import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

const withTabbar = (
  WrappedComponent,
  tabbar,
  popout,
  panelTheme = "gray",
  panelFlex = false
) => {
  class ComponentWithTabbar extends React.Component {
    render() {
      return (
        <Epic activeStory="root" tabbar={tabbar} >
          <Root id="root" activeView="view" popout={popout}>
            <View id="view" activePanel="panel">
              <Panel theme={panelTheme} id="panel" style={{
                display: panelFlex ? "flex": "block"
              }}>
                <WrappedComponent {...this.props} />
              </Panel>
            </View>
          </Root>
        </Epic>
      );
    }
  }

  return ComponentWithTabbar;
};

export default withTabbar;