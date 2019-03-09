import React from 'react';
import { Redirect } from 'react-router-dom';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

export default ({isUserRegistered, currentUser}) => (
  <View activePanel="panel">
    <Panel id="panel">
      {!isUserRegistered
        ? <Redirect to="/home"/>
        : currentUser
          ? <Redirect to={`/user/${currentUser.id}`}/>
          : <DivSpinner/>
      }
    </Panel>
  </View>
);