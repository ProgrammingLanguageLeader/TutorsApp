import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
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
import Icon24Delete from '@vkontakte/icons/dist/24/delete'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Article from '@vkontakte/icons/dist/24/article';

import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import DeleteConfirmationAlert from 'vk-apps-frontend/components/DeleteConfirmationAlert';

import { vacanciesActions, tutorsActions } from 'vk-apps-frontend/actions/api';

import { educationLevelList, ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVacancy: bindActionCreators(vacanciesActions.getVacancy, dispatch),
    deleteVacancy: bindActionCreators(vacanciesActions.deleteVacancy, dispatch),
    createStudentRequest: bindActionCreators(tutorsActions.createStudentRequest, dispatch),
    getStudentRequestsList: bindActionCreators(tutorsActions.getStudentRequestsList, dispatch),
    deleteStudentRequest: bindActionCreators(tutorsActions.deleteStudentRequest, dispatch),
  };
};

class Vacancy extends React.Component {
  constructor(props) {
    super(props);
    this.createStudentRequest = this.createStudentRequest.bind(this);
    this.deleteVacancyButtonClick = this.deleteVacancyButtonClick.bind(this);
    this.deleteStudentRequest = this.deleteStudentRequest.bind(this);
    this.state = {
      fetching: false,
      vacancy: null,
      studentRequest: null,
      errors: {},
      popout: null,
    }
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    const { currentUser } = this.props;
    const { id } = this.props.match.params;
    const vacancyResponse = await this.props.getVacancy(id);
    const vacancy = vacancyResponse.status === 200 && vacancyResponse.data;
    const studentRequestsListResponse = await this.props.getStudentRequestsList({
      student: currentUser.id,
      tutor: vacancy.owner.id,
    });
    const studentRequests = studentRequestsListResponse.status === 200
      && studentRequestsListResponse.data.results;
    const studentRequest = studentRequests.length > 0 && studentRequests[0];
    this.setState({
      vacancy,
      studentRequest,
      fetching: false,
    });
  }

  async createStudentRequest(tutorId) {
    this.setState({
      fetching: true,
    });
    const response = await this.props.createStudentRequest({
      tutor: tutorId,
    });
    const errors = response.status < 400 ? {} : response;
    const studentRequest = response.status < 400 && response.data;
    this.setState({
      fetching: false,
      studentRequest,
      errors,
    });
  }

  async deleteStudentRequest(studentRequestId) {
    this.setState({
      fetching: true,
    });
    const response = await this.props.deleteStudentRequest(studentRequestId);
    const errors = response.status < 400 ? {} : response;
    this.setState({
      fetching: false,
      studentRequest: null,
      errors,
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
    const { currentUser } = this.props;
    const {
      fetching,
      vacancy,
      popout,
      studentRequest,
      errors
    } = this.state;
    const isEditable = currentUser.user
      && vacancy
      && currentUser.user.id === vacancy.owner.id;

    return (
      <View id={this.props.id} activePanel={this.props.id} popout={popout}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Предложение
          </PanelHeader>

          {fetching && <DivSpinner />}

          {isEditable && (
            <Group title="Управление">
              <CellButton
                before={<Icon24Write />}
                onClick={() => this.props.history.push(`/vacancy/${vacancy.id}/edit`)}
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
                <Cell expandable size="l"
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

              {!isEditable && !studentRequest && (
                <Group title="Добавление в список учеников">
                  <CellButton
                    before={<Icon24UserAdd/>}
                    onClick={() => this.createStudentRequest(vacancy.owner.id)}
                  >
                    Отправить заявку
                  </CellButton>
                  {Object.keys(errors).length > 0 && (
                    <Div>
                      <ErrorFormStatus errors={errors}/>
                    </Div>
                  )}
                </Group>
              )}

              {studentRequest && (
                <Group title="Управление заявкой">
                  <CellButton
                    before={<Icon24Delete/>}
                    onClick={() => this.deleteStudentRequest(studentRequest.id)}
                  >
                    Удалить заявку
                  </CellButton>
                  {Object.keys(errors).length > 0 && (
                    <Div>
                      <ErrorFormStatus errors={errors}/>
                    </Div>
                  )}
                </Group>
              )}

              <Group title="Информация о предложении">
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
                  before={<Icon24MoneyCircle />}
                >
                  {vacancy.price} рублей/час
                </Cell>

                <Cell description="Выезд на дом" before={<Icon24Home />}>
                  {vacancy.home_schooling ? "Да" : "Нет"}
                </Cell>

                {educationLevelList.map(level => {
                  if (vacancy[level.backendField]) {
                    return (
                      <Cell key={level.backendField} before={<Icon24Article/>}>
                        {level.name}
                      </Cell>
                    );
                  }
                })}

                {vacancy.extra_info && (
                  <Cell
                    multiline
                    description="Дополнительная информация"
                    before={<Icon24Info />}
                  >
                    {vacancy.extra_info}
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