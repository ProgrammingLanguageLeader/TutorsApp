import React from 'react';
import { connect } from 'react-redux';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';

import BackIcon from 'vk-apps-frontend/components/BackIcon';

const mapStateToProps = state => {
  const { user } = state.currentUserReducer;
  return {
    user,
  };
};

class MainMenu extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={() => this.props.history.goBack()}>
            <BackIcon />
          </HeaderButton>
        }>
          Главное меню
        </PanelHeader>

        <Group title="Профиль">
          <List>
            <Cell expandable onClick={() => this.props.history.push(`/user/${user ? user.id : 1}`)}>
              Просмотреть профиль
            </Cell>
            <Cell expandable onClick={() => this.props.history.push('/user_edit')}>
              Редактировать профиль
            </Cell>
          </List>
        </Group>

        <Group title="Вакансии">
          <List>
            <Cell expandable onClick={() => this.props.history.push('/vacancies')}>
              Поиск вакансий
            </Cell>
            <Cell expandable onClick={() => this.props.history.push('/user_vacancies')}>
              Просмотреть мои вакансии
            </Cell>
            <Cell expandable onClick={() => this.props.history.push('/vacancy_create')}>
              Создать вакансию
            </Cell>
          </List>
        </Group>

        <Group title="Уроки">
          <List>
            <Cell expandable onClick={() => this.props.history.push('/schedule')}>
              Расписание
            </Cell>
            <Cell expandable onClick={() => this.props.history.push('/lesson_create')}>
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
            <Cell expandable onClick={() => this.props.history.push('/outgoing_student_requests')}>
              Исходящие заявки
            </Cell>
          </List>
        </Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MainMenu);