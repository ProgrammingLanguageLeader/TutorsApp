import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import moment from 'moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';
import DeleteConfirmationAlert from 'vk-apps-frontend/components/DeleteConfirmationAlert';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';

import { lessonsActions, vkAppsUsersActions } from 'vk-apps-frontend/actions/api';
import { appsActions } from 'vk-apps-frontend/actions/vk';

import { ROOT_URL } from 'vk-apps-frontend/constants';

import durationHumanizer from 'vk-apps-frontend/helpers/durationHumanizer';

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLesson: bindActionCreators(lessonsActions.getLesson, dispatch),
    deleteLesson: bindActionCreators(lessonsActions.deleteLesson, dispatch),
    retrieveVkAppsUserByUserId: bindActionCreators(vkAppsUsersActions.retrieveVkAppsUserByUserId, dispatch),
    openPayForm: bindActionCreators(appsActions.openPayForm, dispatch),
  };
};

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.deleteLessonButtonClick = this.deleteLessonButtonClick.bind(this);
    this.handleMoneyTransferButton = this.handleMoneyTransferButton.bind(this);
    this.state = {
      popout: null,
      errors: null,
      lesson: null,
      fetching: false,
      paymentFormOpened: false,
    };
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    const { id } = this.props.match.params;
    const lessonResponse = await this.props.getLesson(id);
    const lesson = lessonResponse.status === 200 && lessonResponse.data;
    this.setState({
      lesson,
      fetching: false,
    });
  }

  deleteLessonButtonClick(id) {
    const popout = (
      <DeleteConfirmationAlert
        label="Вы уверены, что хотите удалить урок?"
        onConfirm={async () => {
          await this.props.deleteLesson(id);
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

  async handleMoneyTransferButton(userId, amount) {
    if (this.state.paymentFormOpened) {
      return;
    }
    this.setState({
      paymentFormOpened: true,
    });
    const response = await this.props.retrieveVkAppsUserByUserId(userId);
    if (response.status >= 400) {
      this.setState({
        paymentFormOpened: false,
        errors: {
          message: 'Выбранный пользователь не зарегистрирован через VK Apps'
        }
      });
      return;
    }
    this.props.openPayForm(
      'pay-to-user',
      {
        'user_id': response.data.vk_id,
        'amount': amount,
      }
    );
    this.setState({
      paymentFormOpened: false,
      errors: null,
    });
  }

  render() {
    const { currentUser } = this.props;
    const {
      popout,
      lesson,
      fetching,
      errors,
      paymentFormOpened,
    } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id} popout={popout}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Урок
          </PanelHeader>

          {fetching && (
            <DivSpinner />
          )}

          {lesson && (
            <div>
              {currentUser.user && lesson.tutor.id === currentUser.user.id && (
                <Group title="Управление уроком">
                  <CellButton
                    before={<Icon24Write/>}
                    onClick={() => this.props.history.push(`/lesson/${lesson.id}/edit`)}
                  >
                    Редактирование урока
                  </CellButton>
                  <CellButton
                    level="danger"
                    before={<Icon24Cancel/>}
                    onClick={() => this.deleteLessonButtonClick(lesson.id)}
                  >
                    Удаление урока
                  </CellButton>
                </Group>
              )}
              {lesson.student.id === currentUser.user.id && (
                <Group title="Оплата урока">
                  <CellButton
                    before={<Icon24MoneyTransfer/>}
                    onClick={() => this.handleMoneyTransferButton(lesson.tutor.id, lesson.price)}
                    disabled={paymentFormOpened}
                  >
                    Открыть форму перевода
                  </CellButton>
                  {errors && (
                    <Div>
                      <ErrorFormStatus
                        title="Ошибка при попытке оплаты"
                        errors={errors}
                      />
                    </Div>
                  )}
                </Group>
              )}

              <Group title="Учитель">
                <Cell
                  expandable
                  before={<Avatar src={ROOT_URL + lesson.tutor.avatar} size={64} />}
                  onClick={() => this.props.history.push(`/user/${lesson.tutor.id}`)}
                >
                  {lesson.tutor.first_name} {lesson.tutor.last_name}
                </Cell>
              </Group>

              <Group title="Ученик">
                <Cell
                  expandable
                  before={<Avatar src={ROOT_URL + lesson.student.avatar} size={64} />}
                  onClick={() => this.props.history.push(`/user/${lesson.student.id}`)}
                >
                  {lesson.student.first_name} {lesson.student.last_name}
                </Cell>
              </Group>

              <Group title="Информация об уроке">
                <Cell multiline description="Дата">
                  <Moment locale="ru" format="D MMMM YYYY">
                    {lesson.beginning_time}
                  </Moment>
                </Cell>

                <Cell multiline description="Время начала">
                  <Moment locale="ru" format="HH:mm">
                    {lesson.beginning_time}
                  </Moment>
                </Cell>

                <Cell multiline description="Длительность">
                  {durationHumanizer(moment.duration(lesson.duration))}
                </Cell>

                <Cell multiline description="Стоимость">
                  {lesson.price}
                </Cell>

                <Cell multiline description="Время создания">
                  <Moment locale="ru" format="D MMMM YYYY - HH:mm">
                    {lesson.creation_time}
                  </Moment>
                </Cell>

                <Cell multiline description="Время изменения">
                  <Moment locale="ru" format="D MMMM YYYY - HH:mm">
                    {lesson.modification_time}
                  </Moment>
                </Cell>
              </Group>
            </div>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);