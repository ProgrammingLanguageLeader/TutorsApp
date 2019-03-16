import React from 'react';
import { Redirect } from 'react-router-dom';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

export default ({ id, fetching, currentUser }) => (
  <View id={id} activePanel={this.props.id}>
    <Panel id={this.props.id}>
      {fetching
        ? <DivSpinner />
        : currentUser
          ? <Redirect to={`/user/${currentUser.id}`} />
          : <Redirect to="/home" />
      }
    </Panel>
  </View>
);