import React from 'react';
import { Redirect } from 'react-router-dom';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

export default ({ fetching, currentUser }) => (
  <View activePanel="panel">
    <Panel id="panel">
      {fetching
        ? <DivSpinner />
        : currentUser
          ? <Redirect to={`/user/${currentUser.id}`} />
          : <Redirect to="/home" />
      }
    </Panel>
  </View>
);