import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import moment from 'moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';

import { lessonsActions, tutorsActions } from 'vk-apps-frontend/actions/api';

import LessonForm from 'vk-apps-frontend/forms/LessonForm';

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
    this.scrollIntoStartDiv = this.scrollIntoStartDiv.bind(this);
    this.startDiv = React.createRef();
    this.state = {
      lesson: null,
      students: [],
      fetching: false,
      success: null,
      errors: {},
    };
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    const { id } = this.props.match.params;
    const [lessonResponse, studentsListResponse] = await Promise.all([
      this.props.getLesson(id),
      this.props.getStudentsList()
    ]);
    const lesson = lessonResponse.status === 200
      ? lessonResponse.data
      : null;
    const students = studentsListResponse.status === 200
      ? studentsListResponse.data.results
      : [];
    this.setState({
      lesson,
      students,
      fetching: false,
    });
  }

  scrollIntoStartDiv() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  async handleLessonFormSubmit(id, values) {
    const response = await this.props.updateLesson(id, values);
    const success = response.status < 400;
    const errors = success ? {} : response;
    this.setState({
      success,
      errors,
    });
    this.scrollIntoStartDiv();
  }

  render() {
    const { fetching, students, lesson, success } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Редактирование урока
          </PanelHeader>

          <div ref={this.startDiv} />

          {fetching && <DivSpinner />}

          {lesson && (
            <Group title="Форма редактирования">
              {success && <SuccessfulFormStatus title="Успешно" />}

              <Formik
                initialValues={{
                  student: lesson.student.id,
                  beginning_time: moment(lesson.beginning_time),
                  duration: moment.duration(lesson.duration),
                  price: lesson.price,
                }}
                isInitialValid={true}
                validate={values => {
                  this.setState({
                    success: false,
                  });
                  return LessonForm.validate(values);
                }}
                render={
                  formikProps => (
                    <LessonForm
                      {...formikProps}
                      students={students}
                      submitLabel="Сохранить"
                    />
                  )
                }
                onSubmit={async (values, action) => {
                  await this.handleLessonFormSubmit(lesson.id, values);
                  const { errors } = this.state;
                  action.setSubmitting(false);
                  action.setErrors(errors);
                }}
              />
            </Group>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(LessonEdit);