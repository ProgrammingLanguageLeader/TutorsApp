import React from 'react';
import { connect } from 'react-redux';
import { Tabs, TabsItem, FixedLayout } from '@vkontakte/vkui';

import { locationActions } from '../actions/location';

class ChangeTab extends React.Component {
  render() {
    const { activeView, activePanel } = this.props.locationReducer;

    return (
      <Tabs 
        theme="header"
        type="buttons"
      >
        <TabsItem 
          onClick={() => this.props.dispatch(locationActions.changeLocation(activeView, 'requests'))}
          selected={activePanel === 'requests'}
        >
          Мои завки
        </TabsItem>
        <TabsItem 
          onClick={() => this.props.dispatch(locationActions.changeLocation(activeView, 'students'))}
          selected={activePanel === 'students'}
        >
          Ученики
        </TabsItem>
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => {
  const { locationReducer } = state;
  return {
    locationReducer,
  }
};

export default connect(mapStateToProps)(ChangeTab);