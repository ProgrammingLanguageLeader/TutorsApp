import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, HeaderButton, Group, List
} from '@vkontakte/vkui';

import { locationActions } from '../actions';
import BackIcon from '../components/BackIcon';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: bindActionCreators(locationActions.goBack, dispatch),
    changeLocation: bindActionCreators(locationActions.changeLocation, dispatch),
  }
};

class MainMenu extends React.Component {
  render() {
    return (
      <View id={this.props.id} activePanel="menu">
        <Panel id="menu">
          <PanelHeader left={
            <HeaderButton onClick={() => this.props.goBack()}>
              <BackIcon />
            </HeaderButton>
          }>
            Главное меню
          </PanelHeader>

          <Group title="Профиль">
            <List>
              <Cell expandable onClick={() => this.props.changeLocation('show_profile')}>
                Просмотреть профиль
              </Cell>
              <Cell expandable onClick={() => this.props.changeLocation('edit_profile')}>
                Редактировать профиль
              </Cell>
            </List>
          </Group>

          <Group title="Вакансии">
            <List>
              <Cell expandable onClick={() => this.props.changeLocation('search_vacancies')}>
                Поиск вакансий
              </Cell>
              <Cell expandable onClick={() => this.props.changeLocation('show_profile_vacancies')}>
                Просмотреть мои вакансии
              </Cell>
            </List>
          </Group>

          <Group title="Уроки">
            <List>
              <Cell expandable onClick={() => this.props.changeLocation('schedule')}>
                Расписание
              </Cell>
              <Cell expandable onClick={() => this.props.changeLocation('create_lesson')}>
                Создание урока
              </Cell>
            </List>
          </Group>

          <Group title="Заявки и уведомления">
            <List>
              <Cell expandable onClick={() => this.props.changeLocation('incoming_applications')}>
                Уведомления и входящие заявки
              </Cell>
              <Cell expandable onClick={() => this.props.changeLocation('outgoing_applications')}>
                Исходящие заявки
              </Cell>
            </List>
          </Group>

          <Group title="Ученики и учителя">
            <List>
              <Cell expandable onClick={() => this.props.changeLocation('students')}>
                Список учеников
              </Cell>
              <Cell expandable onClick={() => this.props.changeLocation('tutors')}>
                Список учителей
              </Cell>
            </List>
          </Group>

          <Group title="Платежи">
            <List>
              <Cell expandable onClick={() => this.props.changeLocation('create_payment')}>
                Сделать перевод
              </Cell>
              <Cell expandable onClick={() => this.props.changeLocation('create_payment_application')}>
                Запросить оплату занятия
              </Cell>
            </List>
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);