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

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { lessonsActions, tutorsActions } from 'vk-apps-frontend/actions/api';

import LessonForm from 'vk-apps-frontend/forms/LessonForm';

const mapStateToProps = state => {
  const { fetching } = state.API.lessonsReducer;
  const { students } = state.API.tutorsReducer;
  return {
    fetching,
    students,
  };
};

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
    this.startDiv = React.createRef();
    this.state = {
      success: null,
      errors: {},
    }
  }

  componentDidMount() {
    this.props.getStudentsList();
  }

  componentDidUpdate() {
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
    const { fetching, students } = this.props;

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

          {fetching && (
            <DivSpinner />
          )}

          <Group title="Форма создания">
            <Formik
              initialValues={{
                beginning_time: moment(),
                duration: moment.duration(60, 'minutes'),
                price: 500,
              }}
              render={
                formikProps => (
                  <LessonForm
                    {...formikProps}
                    isSuccessful={this.state.success}
                    errors={this.state.errors}
                    students={students || []}
                    submitLabel="Создать"
                  />
                )
              }
              onSubmit={async (values, action) => {
                await this.handleLessonFormSubmit(values);
                action.setSubmitting(false);
                action.setErrors(this.state.errors);
              }}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonCreate);