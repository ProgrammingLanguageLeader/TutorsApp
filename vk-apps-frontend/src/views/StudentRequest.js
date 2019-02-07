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
  return {
    studentRequest, fetching,
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
    this.handleDeclineButtonClick = this.handleDeclineButtonClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getStudentRequest(id);
  }

  async handleAcceptButtonClick() {
    const { id } = this.props.match.params;
    await this.props.acceptStudentRequest(id);
    this.props.history.goBack();
  }

  async handleDeclineButtonClick() {
    const { id } = this.props.match.params;
    await this.props.deleteStudentRequest(id);
    this.props.history.goBack();
  }

  render() {
    const { studentRequest, fetching } = this.props;

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
            <Group title="Информация об ученике">
              <Cell before={<Avatar size={64} src={ROOT_URL + studentRequest.student.avatar} />}>
                {studentRequest.student.first_name} {studentRequest.student.last_name}
              </Cell>

              <Cell multiline description="Дата создания профиля">
                <Moment locale="ru" format="D MMMM YYYY">
                  {studentRequest.student.date_joined}
                </Moment>
              </Cell>

              {studentRequest.student.city && (
                <Cell description="Город">
                  {studentRequest.student.city}
                </Cell>
              )}

              {studentRequest.student.district && (
                <Cell description="Район">
                  {studentRequest.student.district}
                </Cell>
              )}

              {studentRequest.student.street && (
                <Cell description="Улица">
                  {studentRequest.student.street}
                </Cell>
              )}

              {studentRequest.student.metro_station && (
                <Cell description="Станция метро">
                  {studentRequest.student.metro_station}
                </Cell>
              )}

              {studentRequest.student.bio && (
                <Cell multiline description="О себе">
                  {studentRequest.student.bio}
                </Cell>
              )}
            </Group>

            <Group title="Управление заявкой">
              <div style={{ display: "flex", padding: 8 }}>
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
                  onClick={this.handleDeclineButtonClick}
                >
                  Отклонить
                </Button>
              </div>
            </Group>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentRequest);