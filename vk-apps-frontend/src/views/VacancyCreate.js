import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import CreateVacancyForm from 'vk-apps-frontend/forms/CreateVacancyForm';

import { vacanciesActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { errors, success } = state.apiReducer.vacanciesReducer;
  return {
    errors,
    success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createVacancy: bindActionCreators(vacanciesActions.createVacancy, dispatch),
  };
};

class VacancyCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateVacancyFormSubmit = this.handleCreateVacancyFormSubmit.bind(this);
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  async handleCreateVacancyFormSubmit(values) {
    await this.props.createVacancy({
      ...values
    });
  }

  render() {
    const { success } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Создание вакансии
        </PanelHeader >

        {success && (
          <Group>
            <Div>
              <SuccessfulFormStatus title="Успешно" />
            </Div>
          </Group>
        )}

        <Group title="Заполняемые поля">
          <Formik
            component={CreateVacancyForm}
            onSubmit={ async (values, action) => {
              await this.handleCreateVacancyFormSubmit(values);
              action.setSubmitting(false);
              action.setErrors(this.props.errors || {});
            }}
          />
        </Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VacancyCreate);
