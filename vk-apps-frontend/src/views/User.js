import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Moment from "react-moment";

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24Write from '@vkontakte/icons/dist/24/write';

import { usersActions, vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: bindActionCreators(usersActions.getUser, dispatch),
    retrieveVkAppsUserByUserId: bindActionCreators(
      vkAppsUsersActions.retrieveVkAppsUserByUserId,
      dispatch
    ),
  }
};

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      vkId: null,
      fetching: false,
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    this.setState({
      fetching: true,
    });
    const { id } = this.props.match.params;
    const userResponse = await this.props.getUser(id);
    const user = userResponse.status === 200 && userResponse.data;
    const vkAppsUserResponse = await this.props.retrieveVkAppsUserByUserId(id);
    const vkAppsUser = vkAppsUserResponse.status === 200 && vkAppsUserResponse.data;
    this._isMounted && this.setState({
      user,
      vkId: vkAppsUser && vkAppsUser.vk_id,
      fetching: false,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

	render() {
    const { id } = this.props.match.params;
    const { user, fetching, vkId } = this.state;
    const { currentUser } = this.props;
    const isProfileEditable = currentUser.user && Number(id) === Number(currentUser.user.id);

		return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Профиль
          </PanelHeader>

          {fetching && <DivSpinner />}

          {user && (
            <div>
              <Group>
                <Cell
                  multiline
                  description="Просмотр информации о пользователе"
                  before={<Avatar size={80} src={ROOT_URL + user.avatar} />}
                >
                  {user.first_name} {user.last_name}
                </Cell>
              </Group>

              {isProfileEditable && (
                <Group>
                  <CellButton
                    before={<Icon24Write/>}
                    onClick={() => this.props.history.push(`/user/${user.id}/edit`)}
                  >
                    Редактировать
                  </CellButton>
                </Group>
              )}

              {vkId && (
                <Group title="Страница ВКонтакте">
                  <a href={`https://vk.com/id${vkId}`} target="_blank" rel="noopener noreferrer">
                    <CellButton>
                      Перейти по ссылке
                    </CellButton>
                  </a>
                </Group>
              )}

              <Group title="Информация о пользователе">
                <Cell multiline description="Дата создания профиля">
                  <Moment locale="ru" format="D MMMM YYYY">
                    {user.date_joined || "Не задано"}
                  </Moment>
                </Cell>

                {user.experience && (
                  <Cell multiline description="Опыт преподавания">
                    {user.experience}
                  </Cell>
                )}

                {user.education && (
                  <Cell multiline description="Образование">
                    {user.education || "Не задано"}
                  </Cell>
                )}

                {user.city && (
                  <Cell multiline description="Город">
                    {user.city || "Не задано"}
                  </Cell>
                )}

                {user.district && (
                  <Cell multiline description="Район">
                    {user.district}
                  </Cell>
                )}
                {user.street && (
                  <Cell multiline description="Улица">
                    {user.street}
                  </Cell>
                )}
                {user.metro_station && (
                  <Cell multiline description="Станция метро">
                    {user.metro_station}
                  </Cell>
                )}
                {user.bio && (
                  <Cell multiline description="О себе">
                    {user.bio}
                  </Cell>
                )}
              </Group>
            </div>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);