import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { tutorsActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { studentRequests, fetching } = state.apiReducer.tutorsReducer;
  const { currentUserReducer } = state;
  return {
    studentRequests,
    fetching,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudentRequestsList: bindActionCreators(tutorsActions.getStudentRequestsList, dispatch),
  };
};

class OutgoingStudentRequests extends React.Component {
  componentDidMount() {
    const { user } = this.props.currentUserReducer;
    if (user) {
      this.props.getStudentRequestsList({
        student: user.id,
      });
    }
  }

  render() {
    const { studentRequests, fetching } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Исходящие заявки
        </PanelHeader>

        {fetching && (
          <DivSpinner />
        )}

        <Group title="Список заявок">
          {studentRequests.map(studentRequest => (
            <Cell
              key={studentRequest.id}
              expandable
              description={
                <div>
                  <div>
                    Создана
                  </div>
                  <div>
                    <Moment locale="ru" format="D MMMM YYYY">
                      {studentRequest.creation_time}
                    </Moment>
                  </div>
                </div>
              }
              before={<Avatar size={64} src={ROOT_URL + studentRequest.tutor.avatar} />}
              onClick={() => this.props.history.push(`/student_request/${studentRequest.id}`)}
            >
              {studentRequest.tutor.first_name} {studentRequest.tutor.last_name}
            </Cell>
          ))}
        </Group>
        <Footer>
          Показано заявок: {studentRequests.length}
        </Footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutgoingStudentRequests);