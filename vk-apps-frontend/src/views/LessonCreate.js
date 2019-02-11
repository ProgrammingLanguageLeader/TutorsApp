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
  const { fetching, success, errors } = state.apiReducer.lessonsReducer;
  const { currentUserReducer } = state;
  const { students } = state.apiReducer.tutorsReducer;
  return {
    fetching,
    success,
    errors,
    students,
    currentUserReducer,
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
    this.startDiv = React.createRef();
  }


  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      this.props.getStudentsList();
    }
  }

  componentDidUpdate() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  render() {
    const { fetching, success, students } = this.props;

    return (
      <div>
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
                  isSuccessful={success}
                  students={students || []}
                  submitLabel="Создать"
                />
              )
            }
            onSubmit={async (values, action) => {
              await this.props.createLesson(values);
              action.setSubmitting(false);
              action.setErrors(this.props.errors || {});
            }}
          />
        </Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonCreate);