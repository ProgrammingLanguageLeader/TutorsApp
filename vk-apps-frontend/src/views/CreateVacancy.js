import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import {
  View,
  Panel,
  PanelHeader,
  HeaderButton,
  Cell,
  Group,
  Div
} from '@vkontakte/vkui';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import CreateVacancyForm from 'vk-apps-frontend/forms/CreateVacancyForm';

import { locationActions } from 'vk-apps-frontend/actions';
import { vacanciesActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { errors, success } = state.apiReducer.vacanciesReducer;
  return {
    errors, success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: bindActionCreators(locationActions.goBack, dispatch),
    createVacancy: bindActionCreators(vacanciesActions.createVacancy, dispatch),
  };
};

class CreateVacancy extends React.Component {
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
      <View id={this.props.id} activePanel="create_vacancy">
        <Panel id="create_vacancy">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.goBack()}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Создание вакансии
          </PanelHeader >

          { success && (
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
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVacancy);
