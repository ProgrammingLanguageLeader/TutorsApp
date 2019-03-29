import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ShortUserCard from 'vk-apps-frontend/components/ShortUserCard';
import ConfirmationPrompt from 'vk-apps-frontend/components/ConfirmationPrompt';

import { tutorsActions } from 'vk-apps-frontend/actions/api';

const mapDispatchToProps = dispatch => {
  return {
    getStudentsList: bindActionCreators(tutorsActions.getStudentsList, dispatch),
    deleteStudent: bindActionCreators(tutorsActions.deleteStudent, dispatch),
  };
};

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteStudentButtonClick = this.handleDeleteStudentButtonClick.bind(this);
    this.state = {
      popout: null,
      students: [],
      fetching: false,
    };
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    const studentsListResponse = await this.props.getStudentsList();
    const students = studentsListResponse.status === 200
      ? studentsListResponse.data.results
      : [];
    this.setState({
      students,
      fetching: false,
    })
  }

  handleDeleteStudentButtonClick(id) {
    const popout = (
      <ConfirmationPrompt
        label="Вы уверены, что хотите удалить ученика?"
        onClose={() => this.setState({
          popout: null,
        })}
        onConfirm={async () => {
          await this.props.deleteStudent(id);
        }}
      />
    );
    this.setState({
      popout: popout,
    });
  }

  render() {
    const { students, fetching } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id} popout={this.state.popout}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Список учеников
          </PanelHeader>

          {fetching && (
            <DivSpinner />
          )}

          {students.map(student => (
            <ShortUserCard
              key={student.id}
              history={this.props.history}
              user={student}
              isStudent={true}
              onDelete={() => this.handleDeleteStudentButtonClick(student.id)}
            />
          ))}
          <Footer>
            Показано пользователей: {students.length}
          </Footer>
        </Panel>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(Students);