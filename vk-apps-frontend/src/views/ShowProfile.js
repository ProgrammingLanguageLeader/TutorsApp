import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { 
	View, Panel, PanelHeader, Cell, Avatar, HeaderButton, Group
} from '@vkontakte/vkui';
import Moment from "react-moment";

import Icon24Write from '@vkontakte/icons/dist/24/write';

import { locationActions } from 'vk-apps-frontend/actions';
import { vkAppsUsersActions } from 'vk-apps-frontend/actions/api';
import { ROOT_URL } from 'vk-apps-frontend/constants';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

const mapStateToProps = state => {
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const { user, vkId } = state.apiReducer.vkAppsUsersReducer;
  const { params } = state.locationReducer;
  const vkAppsUsersFetching = state.apiReducer.vkAppsUsersReducer.fetching;
  return {
    vkUserInfo, user, params, vkAppsUsersFetching, vkId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: bindActionCreators(locationActions.goBack, dispatch),
    changeLocation: bindActionCreators(locationActions.changeLocation, dispatch),
    getVkAppsUser: bindActionCreators(vkAppsUsersActions.getVkAppsUser, dispatch),
  }
};

class ShowProfile extends React.Component {
  componentDidMount() {
    const id = this.props.params.profileId || this.props.vkUserInfo.id;
    this.props.getVkAppsUser(id);
  }

	render() {
    const { user, vkId, params, vkAppsUsersFetching, vkUserInfo } = this.props;
    const isProfileEditable = params.profileId === vkId || vkUserInfo.id === vkId;

		return (
      <View id={this.props.id} activePanel="profile">
        <Panel id="profile">
          <PanelHeader left={
            <HeaderButton onClick={() => this.props.goBack()}>
              <BackIcon />
            </HeaderButton>
          }>
            Профиль
          </PanelHeader>

          { vkAppsUsersFetching
            ? (
              <DivSpinner />
            )
            : user && (
              <div>
                <Group>
                  <Cell
                    size="l"
                    multiline
                    description="Здесь можно посмотреть и отредактировать публичную информацию о Вашем профиле"
                    before={<Avatar size={80} src={ROOT_URL + user.avatar} />}
                    asideContent={
                      isProfileEditable && (
                        <HeaderButton onClick={() => this.props.changeLocation('edit_profile')}>
                          <Icon24Write />
                        </HeaderButton>
                      )
                    }
                  >
                    {`${user.first_name} ${user.last_name}`}
                  </Cell>
                </Group>
                <Group title="Информация о пользователе">
                  <Cell multiline description="Дата создания профиля">
                    <Moment locale="ru" format="D MMMM YYYY">
                      {user.date_joined || "Не задано"}
                    </Moment>
                  </Cell>
                  {
                    user.experience && (
                      <Cell multiline description="Опыт преподавания">
                        {user.experience}
                      </Cell>
                    )
                  }
                  {
                    user.education && (
                      <Cell multiline description="Образование">
                        {user.education || "Не задано"}
                      </Cell>
                    )
                  }
                  {
                    user.city && (
                      <Cell multiline description="Город">
                        {user.city || "Не задано"}
                      </Cell>
                    )
                  }
                  {
                    user.district && (
                      <Cell multiline description="Район">
                        {user.district}
                      </Cell>
                    )
                  }
                  {
                    user.street && (
                      <Cell multiline description="Улица">
                        {user.street}
                      </Cell>
                    )
                  }
                  {
                    user.metro_station && (
                      <Cell multiline description="Станция метро">
                        {user.metro_station}
                      </Cell>
                    )
                  }
                  {
                    user.bio && (
                      <Cell multiline description="О себе">
                        {user.bio}
                      </Cell>
                    )
                  }
                </Group>
              </div>
            )
          }
        </Panel>
      </View>
    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProfile);