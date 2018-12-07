import React from 'react';
import { connect } from 'react-redux';
import { Tabs, TabsItem, FixedLayout, platform, IOS } from '@vkontakte/vkui';

import { locationActions } from '../actions/locationActions';

class ChangeTab extends React.Component {
  render() {
    const { activeView, activePanel } = this.props.locationReducer;
    const osname = platform();

    if (osname === IOS) {
      return (
        <FixedLayout vertical="top">
          <Tabs theme="header" type="buttons">
            <TabsItem 
              style={{ width: "40%", marginLeft: "5%", marginRight: "5%" }}
              onClick={() => this.props.dispatch(locationActions.changeLocation(activeView, 'requests'))}
              selected={activePanel === 'requests'}
            >
              Мои завки
            </TabsItem>
            <TabsItem 
              style={{ width: "40%", marginLeft: "5%", marginRight: "5%" }}
              onClick={() => this.props.dispatch(locationActions.changeLocation(activeView, 'students'))}
              selected={activePanel === 'students'}
            >
              Ученики
            </TabsItem>
          </Tabs>
        </FixedLayout>
      );
    }
  return (
    <FixedLayout vertical="top">
      <Tabs theme="header">
    
        <TabsItem 
          onClick={() => this.props.dispatch(locationActions.changeLocation(activeView, 'requests'))}
          selected={activePanel === 'requests'}
        >
          Мои вакансии
        </TabsItem>
        <TabsItem 
          onClick={() => this.props.dispatch(locationActions.changeLocation(activeView, 'students'))}
          selected={activePanel === 'students'}
        >
          Ученики
        </TabsItem>
      </Tabs>
    </FixedLayout>
    );
  };
}

const mapStateToProps = (state) => {
  const { locationReducer } = state;
  return {
    locationReducer,
  }
};

export default connect(mapStateToProps)(ChangeTab);