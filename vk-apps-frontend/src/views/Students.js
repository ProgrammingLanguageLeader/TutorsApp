import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ShortUserCard from 'vk-apps-frontend/components/ShortUserCard';
import DeleteConfirmationAlert from 'vk-apps-frontend/components/DeleteConfirmationAlert';

import { tutorsActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { students, fetching } = state.apiReducer.tutorsReducer;
  const { currentUserReducer } = state;
  return {
    students,
    fetching,
    currentUserReducer,
  };
};

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
    };
  }

  componentDidMount() {
    this.props.getStudentsList();
  }

  handleDeleteStudentButtonClick(id) {
    const popout = (
      <DeleteConfirmationAlert
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
    const { students, fetching } = this.props;

    return (
      <View activePanel="panel" popout={this.state.popout}>
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(Students);