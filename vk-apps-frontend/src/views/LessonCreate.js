import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import NavigationPrompt from 'react-router-navigation-prompt';
import moment from 'moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';
import ConfirmationPrompt from 'vk-apps-frontend/components/ConfirmationPrompt';

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
    this.setShouldBlockNavigation = this.setShouldBlockNavigation.bind(this);
    this.state = {
      shouldBlockNavigation: false,
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

  async handleLessonFormSubmit(values) {
    const response = await this.props.createLesson(values);
    const success = response.status < 400;
    const errors = success ? {} : response;
    this.setState({
      shouldBlockNavigation: false,
      success,
      errors,
    });
  }

  setShouldBlockNavigation(shouldBlockNavigation) {
    this.setState({ shouldBlockNavigation });
  }

  render() {
    const { students, success, shouldBlockNavigation } = this.state;
    const defaultLessonValues = {
      beginning_time: moment(),
      duration: moment.duration(60, 'minutes'),
    };

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Создание урока
          </PanelHeader>

          <NavigationPrompt when={shouldBlockNavigation}>
            {({ onConfirm, onCancel }) => (
              <ConfirmationPrompt
                label="Некоторые данные будут потеряны. Вы действительно хотите покинуть эту страницу?"
                onConfirm={onConfirm}
                onCancel={onCancel}
              />
            )}
          </NavigationPrompt>

          <Group title="Форма создания">
            {success && <SuccessfulFormStatus title="Успешно" />}

            <Formik
              initialValues={defaultLessonValues}
              validate={values => {
                this.setState({
                  success: false,
                });
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
                return LessonForm.validate(values);
              }}
              validateOnChange={false}
              validateOnBlue={false}
              render={
                formikProps => (
                  <LessonForm
                    {...formikProps}
                    students={students}
                    submitLabel="Создать"
                    setShouldBlockNavigation={this.setShouldBlockNavigation}
                  />
                )
              }
              onSubmit={async (values, action) => {
                await this.handleLessonFormSubmit(values);
                const { errors } = this.state;
                action.setSubmitting(false);
                action.setErrors(errors);
                if (Object.keys(errors).length === 0) {
                  action.resetForm(defaultLessonValues);
                }
              }}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(LessonCreate);