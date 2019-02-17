import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import moment from 'moment';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { lessonsActions, tutorsActions } from 'vk-apps-frontend/actions/api';

import LessonForm from 'vk-apps-frontend/forms/LessonForm';

const mapStateToProps = state => {
  const { lesson, fetching } = state.apiReducer.lessonsReducer;
  const { currentUserReducer } = state;
  const { students } = state.apiReducer.tutorsReducer;
  return {
    lesson,
    fetching,
    students,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudentsList: bindActionCreators(tutorsActions.getStudentsList, dispatch),
    getLesson: bindActionCreators(lessonsActions.getLesson, dispatch),
    updateLesson: bindActionCreators(lessonsActions.updateLesson, dispatch),
  };
};

class LessonEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleLessonFormSubmit = this.handleLessonFormSubmit.bind(this);
    this.startDiv = React.createRef();
    this.state = {
      success: null,
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.match.params;
      Promise.all([
        this.props.getLesson(id),
        this.props.getStudentsList()
      ]);
    }
  }

  componentDidUpdate() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  async handleLessonFormSubmit(id, values) {
    const response = await this.props.updateLesson(id, values);
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

  render() {
    const { fetching, students, lesson } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Редактирование урока
        </PanelHeader>

        <div ref={this.startDiv} />

        {fetching && (
          <DivSpinner />
        )}

        {lesson && (
          <Group title="Форма редактирования">
            <Formik
              initialValues={{
                student: lesson.student.id,
                beginning_time: moment(lesson.beginning_time),
                duration: moment.duration(lesson.duration),
                price: lesson.price,
              }}
              render={
                formikProps => (
                  <LessonForm
                    {...formikProps}
                    isSuccessful={this.state.success}
                    students={students || []}
                    submitLabel="Сохранить"
                  />
                )
              }
              onSubmit={async (values, action) => {
                await this.handleLessonFormSubmit(lesson.id, values);
                action.setSubmitting(false);
                action.setErrors(this.state.errors);
              }}
            />
          </Group>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonEdit);