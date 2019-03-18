import React from 'react';
import { Redirect } from 'react-router-dom';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

export default ({ id, currentUser }) => (
  <View id={id} activePanel={id}>
    <Panel id={id}>
      { currentUser
        ? <Redirect to={`/user/${currentUser.id}`} />
        : <Redirect to="/home" />
      }
    </Panel>
  </View>
);