import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { tutorsActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { studentRequest, fetching } = state.apiReducer.tutorsReducer;
  const { currentUserReducer } = state;
  return {
    studentRequest,
    fetching,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudentRequest: bindActionCreators(tutorsActions.getStudentRequest, dispatch),
    acceptStudentRequest: bindActionCreators(tutorsActions.acceptStudentRequest, dispatch),
    deleteStudentRequest: bindActionCreators(tutorsActions.deleteStudentRequest, dispatch),
  };
};

class StudentRequest extends React.Component {
  constructor(props) {
    super(props);
    this.handleAcceptButtonClick = this.handleAcceptButtonClick.bind(this);
    this.handleDeclineOrDeleteButtonClick = this.handleDeclineOrDeleteButtonClick.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.match.params;
      this.props.getStudentRequest(id);
    }
  }

  async handleAcceptButtonClick() {
    const { id } = this.props.match.params;
    await this.props.acceptStudentRequest(id);
    this.props.history.goBack();
  }

  async handleDeclineOrDeleteButtonClick() {
    const { id } = this.props.match.params;
    await this.props.deleteStudentRequest(id);
    this.props.history.goBack();
  }

  render() {
    const {
      studentRequest,
      fetching,
      currentUserReducer,
    } = this.props;
    const isTutor = currentUserReducer.user && studentRequest && currentUserReducer.user.id === studentRequest.tutor.id;
    const showingUser = studentRequest ? (isTutor ? studentRequest.student : studentRequest.tutor) : {};

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Заявка ученика
        </PanelHeader>

        {fetching && (
          <DivSpinner />
        )}

        {studentRequest && (
          <div>
            <Group title={isTutor ? "Информация об ученике" : "Информация об учителе"}>
              <Cell before={<Avatar size={64} src={ROOT_URL + showingUser.avatar} />}>
                {showingUser.first_name} {showingUser.last_name}
              </Cell>

              <Cell multiline description="Дата создания профиля">
                <Moment locale="ru" format="D MMMM YYYY">
                  {showingUser.date_joined}
                </Moment>
              </Cell>

              {showingUser.education && (
                <Cell description="Образование">
                  {showingUser.education}
                </Cell>
              )}

              {showingUser.city && (
                <Cell description="Город">
                  {showingUser.city}
                </Cell>
              )}

              {showingUser.district && (
                <Cell description="Район">
                  {showingUser.district}
                </Cell>
              )}

              {showingUser.street && (
                <Cell description="Улица">
                  {showingUser.street}
                </Cell>
              )}

              {showingUser.metro_station && (
                <Cell description="Станция метро">
                  {showingUser.metro_station}
                </Cell>
              )}

              {showingUser.bio && (
                <Cell multiline description="О себе">
                  {showingUser.bio}
                </Cell>
              )}
            </Group>

            <Group title="Управление заявкой">
              <div style={{ display: "flex", padding: 8 }}>
                { isTutor && (
                  <div>
                    <Button
                      size="m"
                      level="primary"
                      before={<Icon24Add/>}
                      style={{ marginRight: 4 }}
                      onClick={this.handleAcceptButtonClick}
                    >
                      Принять
                    </Button>
                    <Button
                      size="m"
                      level="secondary"
                      before={<Icon24Cancel/>}
                      onClick={this.handleDeclineOrDeleteButtonClick}
                    >
                      Отклонить
                    </Button>
                  </div>
                )}
                { !isTutor && (
                  <div>
                    <Button
                      size="m"
                      level="secondary"
                      before={<Icon24Cancel/>}
                      onClick={this.handleDeclineOrDeleteButtonClick}
                    >
                      Удалить
                    </Button>
                  </div>
                )}
              </div>
            </Group>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentRequest);