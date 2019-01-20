import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { 
	View, Panel, PanelHeader, Cell, Avatar, HeaderButton, Group
} from '@vkontakte/vkui';
import Moment from "react-moment";

import Icon24Write from '@vkontakte/icons/dist/24/write';

import {apiProfileActions, locationActions, vkApiActions} from '../actions';
import DivSpinner from '../components/DivSpinner';
import BackIcon from '../components/BackIcon';

const mapStateToProps = state => {
  const { accessToken } = state.vkAppsTokenReducer;
  const { vkUserInfo } = state.vkAppsUserReducer;
  const { vkUsersInfo } = state.vkApiUsersReducer;
  const { profile } = state.apiProfileReducer;
  const { params } = state.locationReducer;
  const vkAppsUserFetching = state.vkAppsUserReducer.fetching;
  const vkApiUsersFetching = state.vkApiUsersReducer.fetching;
  const apiProfileFetching = state.apiProfileReducer.fetching;
  return {
    vkUserInfo, vkUsersInfo, profile, vkAppsUserFetching, apiProfileFetching,
    vkApiUsersFetching, params, accessToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: bindActionCreators(locationActions.goBack, dispatch),
    changeLocation: bindActionCreators(locationActions.changeLocation, dispatch),
    getProfile: bindActionCreators(apiProfileActions.getProfile, dispatch),
    fetchUsersInfo: bindActionCreators(vkApiActions.fetchUsersInfo, dispatch),
  }
};

class ShowProfile extends React.Component {
  componentDidMount() {
    const { id } = this.props.vkUserInfo;
    const profileId = this.props.params.profileId || id;
    this.props.getProfile({
      profile_id: profileId,
    })
      .then(() => {
        const { accessToken } = this.props;
        this.props.fetchUsersInfo(accessToken, profileId);
      });
  }

	render() {
    const {
      vkUserInfo, vkUsersInfo, vkAppsUserFetching, apiProfileFetching, vkApiUsersFetching, profile
    } = this.props;
    const fetching = vkAppsUserFetching || apiProfileFetching || vkApiUsersFetching;
    const profileVkInfo = vkUsersInfo[profile.profile_id];

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

          { fetching
            ? (
              <DivSpinner />
            )
            : profileVkInfo && (
              <div>
                <Group>
                  <Cell
                    size="l"
                    multiline
                    description="Здесь можно посмотреть и отредактировать публичную информацию о Вашем профиле"
                    before={<Avatar size={80} src={profileVkInfo.photo_200} />}
                    asideContent={
                      (vkUserInfo.id === profile.profile_id) && (
                        <HeaderButton onClick={() => this.props.changeLocation('edit_profile')}>
                          <Icon24Write />
                        </HeaderButton>
                      )
                    }
                  >
                    {`${profileVkInfo.firstName} ${profileVkInfo.lastName}`}
                  </Cell>
                </Group>
                <Group title="Информация о пользователе">
                  {
                    profile.creation_time && (
                      <Cell multiline description="Дата создания профиля">
                        <Moment locale="ru" format="D MMMM YYYY">
                          {profile.creation_time}
                        </Moment>
                      </Cell>
                    )}
                  {
                    profile.experience && (
                      <Cell multiline description="Опыт преподавания">
                        {profile.experience}
                      </Cell>
                    )
                  }
                  {
                    profile.education && (
                      <Cell multiline description="Образование">
                        {profile.education}
                      </Cell>
                    )
                  }
                  {
                    profile.city && (
                      <Cell multiline description="Город">
                        {profile.city}
                      </Cell>
                    )
                  }
                  {
                    profile.district && (
                      <Cell multiline description="Район">
                        {profile.district}
                      </Cell>
                    )
                  }
                  {
                    profile.street && (
                      <Cell multiline description="Улица">
                        {profile.street}
                      </Cell>
                    )
                  }
                  {
                    profile.metro_station && (
                      <Cell multiline description="Станция метро">
                        {profile.metro_station}
                      </Cell>
                    )
                  }
                  {
                    profile.description && (
                      <Cell multiline description="О себе">
                        {profile.description}
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