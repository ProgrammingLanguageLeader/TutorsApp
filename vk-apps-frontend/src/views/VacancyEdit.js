import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import VacancyForm from 'vk-apps-frontend/forms/VacancyForm';

import { vacanciesActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { vacancy, errors, success } = state.apiReducer.vacanciesReducer;
  const { currentUserReducer } = state;
  return {
    currentUserReducer,
    vacancy,
    errors,
    success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVacancy: bindActionCreators(vacanciesActions.getVacancy, dispatch),
    updateVacancy: bindActionCreators(vacanciesActions.updateVacancy, dispatch),
  };
};

class VacancyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.startDiv = React.createRef();
  }


  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.match.params;
      this.props.getVacancy(id);
    }
  }

  componentDidUpdate() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth'
    });
  }

  render() {
    const { vacancy, success } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Редактирование предложения
        </PanelHeader >

        <div ref={this.startDiv} />

        {success && (
          <Group>
            <Div>
              <SuccessfulFormStatus title="Успешно" />
            </Div>
          </Group>
        )}

        <Group title="Заполняемые поля">
          <Formik
            initialValues={{
              ...vacancy,
            }}
            render={formikProps =>
              <VacancyForm { ...formikProps } submitLabel="Редактировать" />
            }
            onSubmit={ async (values, action) => {
              const { id } = this.props.vacancy;
              await this.props.updateVacancy(id, values);
              action.setSubmitting(false);
              action.setErrors(this.props.errors || {});
            }}
          />
        </Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VacancyEdit);