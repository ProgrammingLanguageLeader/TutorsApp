import React from 'react';
import { connect } from 'react-redux';
import { 
	View, Panel, PanelHeader, Cell, Avatar, List, HeaderButton, Spinner, Button, Group
} from '@vkontakte/vkui';

import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Mention from '@vkontakte/icons/dist/24/mention';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24Info from '@vkontakte/icons/dist/24/info';

import BackIcon from '../customComponents/BackIcon';

import { apiActions } from '../actions/api';
import { locationActions } from '../actions/location';

class ShowProfile extends React.Component {
  componentDidMount() {
    const { id, signed_user_id } = this.props.userInfo;
    this.props.dispatch(
      apiActions.getProfile({
        vk_id: id,
        user_id: id,
        signed_user_id: signed_user_id,
      })
    );
  }

	render() {
    const { fetching } = this.props;
    const { city, photo_200, first_name, last_name } = this.props.userInfo;
    const { description, experience, education, address, email } = this.props.profile;

		return (
      <View 
        id={this.props.id} 
        activePanel="tutor_profile"
      >
        <Panel id="tutor_profile">
          <PanelHeader 
            left={
              <HeaderButton key="back" onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Профиль
          </PanelHeader>

          { fetching ? (
            <Spinner />
          ) : (
            <div>
              <Group id="profile">
                <Cell
                  size="l"
                  description={city ? city.title : ""}
                  before={<Avatar src={photo_200} />}
                  bottomContent={
                    <Button onClick={() => this.props.dispatch(locationActions.changeLocation('edit_profile'))}>
                      Редактировать
                    </Button>
                  }
                >
                  {`${first_name} ${last_name}`}
                </Cell>
              </Group>
              <Group id="profile_info">
                <List>
                  <Cell
                    before={<Icon24Recent />}
                  >
                    {experience || "Стаж не задан"}
                  </Cell>
                  <Cell
                    before={<Icon24Education />}
                  >
                    {education || "Образование не указано"}
                  </Cell>
                  <Cell
                    before={<Icon24Home />}
                  >
                    {address || "Адрес не указан"}
                  </Cell>
                  <Cell
                    before={<Icon24Mention />}
                  >
                    {email || "E-mail не указан"}
                  </Cell>
                  <Cell
                    before={<Icon24Info />}
                  >
                    {description || "Не указано"}
                  </Cell>
                </List>
              </Group>
            </div>
          ) }
        </Panel>
      </View>
    );
	}
};

const mapStateToProps = (state) => {
  const { userInfo } = state.vkReducer;
  const { fetching } = state.apiReducer;
  const { profile } = state.apiReducer;
	return {
    userInfo, fetching, profile, 
  };
}

export default connect(mapStateToProps)(ShowProfile);