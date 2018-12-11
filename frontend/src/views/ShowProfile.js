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

import { apiProfileActions, locationActions } from '../actions';
import Moment from "react-moment";

const mapStateToProps = (state) => {
  const { vkUserInfo } = state.vkAppsReducer;
  const { profile } = state.apiProfileReducer;
  const vkAppsFetching = state.vkAppsReducer.fetching;
  const apiProfileFetching = state.apiProfileReducer.fetching;
  return {
    vkUserInfo, profile, vkAppsFetching, apiProfileFetching,
  };
};

class ShowProfile extends React.Component {
  componentDidMount() {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.dispatch(
      apiProfileActions.getProfile({
        profile_id: id,
        user_id: id,
        signed_user_id: signed_user_id,
      })
    );
  }

	render() {
    const { vkUserInfo, vkAppsFetching, apiProfileFetching, profile } = this.props;

		return (
      <View id={this.props.id} activePanel="profile">
        <Panel id="profile">
          <PanelHeader>
            Профиль
          </PanelHeader>

          { vkAppsFetching || apiProfileFetching ? (
            <DivSpinner />
          ) : (
            <div>
              <Group>
                <Cell
                  size="l"
                  multiline
                  description="Здесь можно посмотреть и отредактировать публичную информацию о Вашем профиле"
                  before={<Avatar size={80} src={vkUserInfo.photo_200} />}
                  asideContent={
                    <HeaderButton onClick={() => this.props.dispatch(
                      locationActions.changeLocation('edit_profile')
                    )}>
                      <Icon24Write />
                    </HeaderButton>
                  }
                >
                  {`${vkUserInfo.first_name} ${vkUserInfo.last_name}`}
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
          )}
        </Panel>
      </View>
    );
	}
}

export default connect(mapStateToProps)(ShowProfile);