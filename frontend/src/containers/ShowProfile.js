import React from 'react';
import { connect } from 'react-redux';
import { 
	View, Panel, PanelHeader, Cell, Avatar, List, HeaderButton, Group
} from '@vkontakte/vkui';

import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Write from '@vkontakte/icons/dist/24/write';

import DivSpinner from '../components/DivSpinner';
import Main from '../components/Main';

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
    const { description, experience, education, address } = this.props.profile;

		return (
      <View id={this.props.id} activePanel="tutor_profile">
        <Panel id="tutor_profile">
          <PanelHeader>
            Профиль
          </PanelHeader>

          { fetching ? (
            <DivSpinner />
          ) : (
            <Main>
              <Group id="profile" style={{ marginTop: 0 }}>
                <Cell
                  size="l"
                  description={city ? city.title : ""}
                  before={<Avatar src={photo_200} />}
                  asideContent={
                    <HeaderButton onClick={() => this.props.dispatch(locationActions.changeLocation('edit_profile'))}>
                      <Icon24Write />
                    </HeaderButton>
                  }
                >
                  {`${first_name} ${last_name}`}
                </Cell>
              </Group>
              <Group id="profile_info">
                <List>
                  <Cell multiline before={<Icon24Recent />}>
                    {experience || "Стаж не задан"}
                  </Cell>
                  <Cell multiline before={<Icon24Education />}>
                    {education || "Образование не указано"}
                  </Cell>
                  <Cell multiline before={<Icon24Home />}>
                    {address || "Адрес не указан"}
                  </Cell>
                  <Cell multiline before={<Icon24Info />}>
                    {description || "Не указано"}
                  </Cell>
                </List>
              </Group>
            </Main>
          )}
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