import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import NavigationPrompt from 'react-router-navigation-prompt';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import FormDisclaimer from 'vk-apps-frontend/components/FormDisclaimer';
import ConfirmationPrompt from 'vk-apps-frontend/components/ConfirmationPrompt';

import VacancyForm from 'vk-apps-frontend/forms/VacancyForm';

import { vacanciesActions } from 'vk-apps-frontend/actions/api';

const mapDispatchToProps = dispatch => {
  return {
    createVacancy: bindActionCreators(vacanciesActions.createVacancy, dispatch),
  };
};

class VacancyCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateVacancyFormSubmit = this.handleCreateVacancyFormSubmit.bind(this);
    this.setShouldBlockNavigation = this.setShouldBlockNavigation.bind(this);
    this.state = {
      shouldBlockNavigation: false,
      errors: {},
    };
  }

  async handleCreateVacancyFormSubmit(values) {
    const response = await this.props.createVacancy({
      ...values
    });
    const errors = response.status < 400 ? {} : response;
    this.setState({
      shouldBlockNavigation: false,
      errors,
    });
  }

  setShouldBlockNavigation(shouldBlockNavigation) {
    this.setState({ shouldBlockNavigation });
  }

  render() {
    const { shouldBlockNavigation } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Создание предложения
          </PanelHeader >

          <NavigationPrompt when={shouldBlockNavigation}>
            {({ onConfirm, onCancel }) => (
              <ConfirmationPrompt
                label="Некоторые данные будут потеряны. Вы действительно хотите покинуть эту страницу?"
                onConfirm={onConfirm}
                onCancel={onCancel}
              />
            )}
          </NavigationPrompt>

          <Group>
            <FormDisclaimer />
          </Group>

          <Group title="Заполняемые поля">
            <Formik
              render={formikProps =>
                <VacancyForm
                  { ...formikProps }
                  submitLabel="Создать"
                  setShouldBlockNavigation={this.setShouldBlockNavigation}
                />
              }
              validateOnChange={false}
              validateOnBlur={false}
              validate={values => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
                return VacancyForm.validate(values)
              }}
              onSubmit={ async (values, action) => {
                await this.handleCreateVacancyFormSubmit(values);
                const { errors } = this.state;
                action.setSubmitting(false);
                action.setErrors(errors);
                if (Object.keys(errors).length === 0) {
                  action.resetForm({});
                }
              }}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(VacancyCreate);