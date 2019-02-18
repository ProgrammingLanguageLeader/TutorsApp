import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24UserAdd from '@vkontakte/icons/dist/24/user_add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';
import SuccessFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DeleteConfirmationAlert from 'vk-apps-frontend/components/DeleteConfirmationAlert';

import { vacanciesActions, tutorsActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const fetching = state.apiReducer.vacanciesReducer.fetching || state.apiReducer.tutorsReducer.fetching;
  const { vacancy } = state.apiReducer.vacanciesReducer;
  const { currentUserReducer } = state;
  return {
    vacancy,
    fetching,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVacancy: bindActionCreators(vacanciesActions.getVacancy, dispatch),
    deleteVacancy: bindActionCreators(vacanciesActions.deleteVacancy, dispatch),
    createStudentRequest: bindActionCreators(tutorsActions.createStudentRequest, dispatch),
  };
};

class Vacancy extends React.Component {
  constructor(props) {
    super(props);
    this.createStudentRequest = this.createStudentRequest.bind(this);
    this.deleteVacancyButtonClick = this.deleteVacancyButtonClick.bind(this);

    this.state = {
      success: null,
      errors: {},
      popout: null,
    }
  }


  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.match.params;
      this.props.getVacancy(id);
    }
  }

  async createStudentRequest(tutorId) {
    const response = await this.props.createStudentRequest({
      tutor: tutorId,
    });
    if (response.status < 400) {
      this.setState({
        success: true,
        errors: {},
      });
      return;
    }
    this.setState({
      success: false,
      errors: response,
    });
  }

  deleteVacancyButtonClick(id) {
    const popout = (
      <DeleteConfirmationAlert
        label="Вы уверены, что хотите удалить предложение?"
        onConfirm={async () => {
          await this.props.deleteVacancy(id);
          this.props.history.goBack();
        }}
        onClose={() => this.setState({
          popout: null
        })}
      />
    );
    this.setState({
      popout: popout
    });
  }

  render() {
    const { fetching, vacancy, currentUserReducer } = this.props;
    const isEditable = currentUserReducer.user && vacancy && currentUserReducer.user.id === vacancy.owner.id;

    return (
      <View activePanel="panel" popout={this.state.popout}>
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Предложение
          </PanelHeader>

          {fetching && (
            <DivSpinner />
          )}

          {isEditable && (
            <Group title="Управление">
              <CellButton
                before={<Icon24Write />}
                onClick={() => this.props.history.push(`/vacancy_edit/${vacancy.id}`)}
              >
                Редактировать предложение
              </CellButton>
              <CellButton
                level="danger"
                before={<Icon24Cancel/>}
                onClick={() => this.deleteVacancyButtonClick(vacancy.id)}
              >
                Удалить предложение
              </CellButton>
            </Group>
          )}

          {vacancy && (
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
                    {vacancy.owner.first_name} {vacancy.owner.last_name}
                  </div>
                </Cell>
              </Group>

              <Group title="Добавление в список учеников">
                <CellButton before={<Icon24UserAdd />} onClick={() => this.createStudentRequest(vacancy.owner.id)}>
                  Отправить заявку
                </CellButton>
                {this.state.success && (
                  <Div>
                    <SuccessFormStatus title="Успешно" />
                  </Div>
                )}
                {Object.keys(this.state.errors).length > 0 && (
                  <Div>
                    <ErrorFormStatus errors={this.state.errors} />
                  </Div>
                )}
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
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vacancy);