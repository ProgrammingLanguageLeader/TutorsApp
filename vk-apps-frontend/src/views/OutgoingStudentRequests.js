import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
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
  const { currentUser } = state;
  return {
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudentRequestsList: bindActionCreators(tutorsActions.getStudentRequestsList, dispatch),
  };
};

class OutgoingStudentRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentRequests: [],
      fetching: false,
    }
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    const { user } = this.props.currentUser;
    const studentRequestsResponse = await this.props.getStudentRequestsList({
      student: user && user.id,
    });
    const studentRequests = studentRequestsResponse.status === 200
      ? studentRequestsResponse.data.results
      : [];
    this.setState({
      studentRequests,
      fetching: false,
    });
  }

  render() {
    const { studentRequests, fetching } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
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
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutgoingStudentRequests);