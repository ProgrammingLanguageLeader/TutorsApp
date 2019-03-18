import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import moment from 'moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import { lessonsActions, tutorsActions } from 'vk-apps-frontend/actions/api';

import LessonForm from 'vk-apps-frontend/forms/LessonForm';

const mapDispatchToProps = dispatch => {
  return {
    getStudentsList: bindActionCreators(tutorsActions.getStudentsList, dispatch),
    createLesson: bindActionCreators(lessonsActions.createLesson, dispatch),
  };
};

class LessonCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleLessonFormSubmit = this.handleLessonFormSubmit.bind(this);
    this.scrollIntoStartDiv = this.scrollIntoStartDiv.bind(this);
    this.startDiv = React.createRef();
    this.state = {
      students: [],
      success: null,
      errors: {},
    }
  }

  async componentDidMount() {
    const studentsListResponse = await this.props.getStudentsList();
    const students = studentsListResponse.status === 200
      ? studentsListResponse.data.results
      : [];
    this.setState({
      students,
    });
  }

  scrollIntoStartDiv() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  async handleLessonFormSubmit(values) {
    const response = await this.props.createLesson(values);
    const success = response.status < 400;
    const errors = success ? {} : response;
    this.setState({
      success,
      errors,
    });
    this.scrollIntoStartDiv();
  }

  render() {
    const { students, success } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Создание урока
          </PanelHeader>

          <div ref={this.startDiv} />

          <Group title="Форма создания">
            {success && <SuccessfulFormStatus title="Успешно" />}

            <Formik
              initialValues={{
                beginning_time: moment(),
                duration: moment.duration(60, 'minutes'),
              }}
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
                    submitLabel="Создать"
                  />
                )
              }
              onSubmit={async (values, action) => {
                await this.handleLessonFormSubmit(values);
                const { errors } = this.state;
                action.setSubmitting(false);
                action.setErrors(errors);
              }}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(LessonCreate);