import React from 'react';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

class Entrypoint extends React.Component {
  redirect() {
    const { user } = this.props.currentUser;
    if (user) {
      this.props.history.replace(`/user/${user.id}`);
    }
    else {
      this.props.history.replace('/home');
    }
  }

  componentDidMount() {
    this.redirect.call(this);
  }

  render() {
    const { id } = this.props;
    return (
      <View id={id} activePanel={id}>
        <Panel id={id}>
          <ScreenSpinner />
        </Panel>
      </View>
    );
  }
}

export default Entrypoint;