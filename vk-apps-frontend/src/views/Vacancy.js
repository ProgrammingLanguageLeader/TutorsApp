import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import 'moment/locale/ru';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24UserAdd from '@vkontakte/icons/dist/24/user_add';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { vacanciesActions, tutorsActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const fetching = state.apiReducer.vacanciesReducer.fetching || state.apiReducer.tutorsReducer.fetching;
  const vacanciesErrors = state.apiReducer.vacanciesReducer.errors;
  const tutorsErrors = state.apiReducer.tutorsReducer.errors;
  const { vacancy } = state.apiReducer.vacanciesReducer;
  const { studentRequestSuccess } = state.apiReducer.tutorsReducer;
  return {
    vacancy, fetching, vacanciesErrors, tutorsErrors, studentRequestSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVacancy: bindActionCreators(vacanciesActions.getVacancy, dispatch),
    createStudentRequest: bindActionCreators(tutorsActions.createStudentRequest, dispatch),
  };
};

class Vacancy extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getVacancy(id);
  }

  render() {
    const { fetching, vacancy } = this.props;

    return (
      <div>
        <PanelHeader
          left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }
        >
          Предложение
        </PanelHeader>
        {
          fetching
          ? (
            <DivSpinner />
          )
          : vacancy && (
            <div>
              <Group title="Учитель">
                <Cell
                  expandable
                  size="l"
                  description={
                    <div>
                      Пользуется сервисом с
                      <div>
                        <Moment format="LL" date={vacancy.owner.date_joined} />
                      </div>
                    </div>
                  }
                  before={<Avatar src={ROOT_URL + vacancy.owner.avatar} size={64} />}
                  onClick={() => this.props.history.push(`/user/${vacancy.owner.id}`)}
                >
                  <div>
                    {`${vacancy.owner.first_name} ${vacancy.owner.last_name}`}
                  </div>
                </Cell>
              </Group>

              <Group title="Добавление в список учеников">
                <CellButton before={<Icon24UserAdd />}>
                  Отправить заявку
                </CellButton>
              </Group>

              <Group title="Информация о вакансии">
                <Cell
                  multiline
                  description="Предмет обучения"
                  before={<Icon24Education />}
                >
                  {vacancy.subject}
                </Cell>

                <Cell
                  multiline
                  description="Стоимость занятия"
                  before={<Icon24MoneyCircle/>}
                >
                  {vacancy.price} рублей/час
                </Cell>

                <Cell description="Выезд на дом" before={<Icon24Home />}>
                  {vacancy.home_schooling ? "Да" : "Нет"}
                </Cell>

                {vacancy.extra_info && (
                  <Cell
                    multiline
                    description="Дополнительная информация"
                    before={<Icon24Info />}
                  >
                    {vacancy.extra_info || "Не указана"}
                  </Cell>
                )}
              </Group>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vacancy);