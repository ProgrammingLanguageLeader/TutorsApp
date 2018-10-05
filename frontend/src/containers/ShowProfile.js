import React from 'react';
import { connect } from 'react-redux';
import { 
	View, Panel, PanelHeader, Cell, Avatar, List, HeaderButton
} from '@vkontakte/vkui';

import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Mention from '@vkontakte/icons/dist/24/mention';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon28Write from '@vkontakte/icons/dist/28/write';

import BackIcon from '../customComponents/BackIcon';

import { locationActions } from '../actions/location';

class ShowProfile extends React.Component {
	render() {
		return (
      <div>
        <View id={this.props.id} activePanel="tutor_profile">
          <Panel id="tutor_profile">
            <PanelHeader 
              noShadow
              left={
                <HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
                  <BackIcon />
                </HeaderButton>
              }
              right={<HeaderButton><Icon28Write /></HeaderButton>}
            >
              Профиль
            </PanelHeader>
            <List>
              <Cell
                size="l"
                description="20 лет"
                before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
              >
                Артур Стамбульцян
              </Cell>
              <Cell
                before={<Icon24Recent />}
              >
                Стаж
                {/* From EditProfile */}
              </Cell>
              <Cell
                before={<Icon24Education />}
              >
                Образование
                {/* From EditProfile */}
              </Cell>
              <Cell
                before={<Icon24Home />}
              >
                Адрес
                {/* From EditProfile */}
              </Cell>
              <Cell
                before={<Icon24Mention />}
              >
                e-mail
                {/* From EditProfile */}
              </Cell>
              <Cell
                before={<Icon24Info />}
              >
                О себе
                {/* From EditProfile */}
              </Cell>
            </List>
          </Panel>
        </View>
      </div>
    );
	}
};

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(ShowProfile);