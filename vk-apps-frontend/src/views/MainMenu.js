import React from 'react';
import { connect } from 'react-redux';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';

import BackIcon from 'vk-apps-frontend/components/BackIcon';

const mapStateToProps = state => {
  const { user } = state.currentUser;
  return {
    user,
  };
};

class MainMenu extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={() => this.props.history.goBack()}>
              <BackIcon />
            </HeaderButton>
          }>
            Главное меню
          </PanelHeader>

          <Group title="Профиль">
            <List>
              <Cell expandable onClick={() => this.props.history.push(`/user/${user && user.id}`)}>
                Просмотреть профиль
              </Cell>
              <Cell expandable onClick={() => this.props.history.push(`/user/${user && user.id}/edit`)}>
                Редактировать профиль
              </Cell>
            </List>
          </Group>

          <Group title="Предложения">
            <List>
              <Cell expandable onClick={() => this.props.history.push('/vacancies')}>
                Поиск предложений
              </Cell>
              <Cell expandable onClick={() => this.props.history.push('/vacancies/current_user')}>
                Просмотреть мои предложения
              </Cell>
              <Cell expandable onClick={() => this.props.history.push('/vacancy/create')}>
                Создать предложение
              </Cell>
            </List>
          </Group>

          <Group title="Уроки">
            <List>
              <Cell expandable onClick={() => this.props.history.push('/schedule')}>
                Расписание
              </Cell>
              <Cell expandable onClick={() => this.props.history.push('/lesson/create')}>
                Создание урока
              </Cell>
              <Cell expandable onClick={() => this.props.history.push('/students')}>
                Список учеников
              </Cell>
              <Cell expandable onClick={() => this.props.history.push('/tutors')}>
                Список учителей
              </Cell>
            </List>
          </Group>

          <Group title="Платежи">
            <List>
              <Cell expandable onClick={() => this.props.history.push('/money_transfer')}>
                Сделать перевод
              </Cell>
            </List>
          </Group>

          <Group title="Заявки и уведомления">
            <List>
              <Cell expandable onClick={() => this.props.history.push('/notifications')}>
                Уведомления
              </Cell>
              <Cell expandable onClick={() => this.props.history.push('/student_requests/outgoing')}>
                Исходящие заявки
              </Cell>
            </List>
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(MainMenu);