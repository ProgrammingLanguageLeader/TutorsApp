import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Moment from "react-moment";

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24Write from '@vkontakte/icons/dist/24/write';

import { usersActions } from 'vk-apps-frontend/actions/api';
import { ROOT_URL } from 'vk-apps-frontend/constants';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

const mapStateToProps = state => {
  const { user, fetching } = state.apiReducer.usersReducer;
  const { currentUserReducer } = state;
  return {
    user,
    currentUserReducer,
    fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: bindActionCreators(usersActions.getUser, dispatch),
  }
};

class User extends React.Component {
  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.match.params;
      this.props.getUser(id);
    }
  }

	render() {
    const { id } = this.props.match.params;
    const { user, fetching, currentUserReducer } = this.props;
    const isProfileEditable = currentUserReducer.user && Number(id) === Number(currentUserReducer.user.id);

		return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={() => this.props.history.goBack()}>
              <BackIcon />
            </HeaderButton>
          }>
            Профиль
          </PanelHeader>

          {fetching && (
            <DivSpinner />
          )}

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
                    onClick={() => this.props.history.push('/user_edit')}
                  >
                    Редактировать
                  </CellButton>
                </Group>
              )}

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
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);