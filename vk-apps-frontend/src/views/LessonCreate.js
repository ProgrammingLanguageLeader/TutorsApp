import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import moment from 'moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
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
    const { students, success } = this.state;

    return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Создание урока
          </PanelHeader>

          <div ref={this.startDiv} />

          <Group title="Форма создания">
            {success && (
              <SuccessfulFormStatus title="Успешно" />
            )}

            <Formik
              initialValues={{
                beginning_time: moment(),
                duration: moment.duration(60, 'minutes'),
                price: 500,
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validate={values => {
                this.setState({
                  success: false,
                });
                this.scrollIntoStartDiv();
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