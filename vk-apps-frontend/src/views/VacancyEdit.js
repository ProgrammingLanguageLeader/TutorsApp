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
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';
import FormDisclaimer from 'vk-apps-frontend/components/FormDisclaimer';
import ConfirmationPrompt from 'vk-apps-frontend/components/ConfirmationPrompt';

import VacancyForm from 'vk-apps-frontend/forms/VacancyForm';

import { vacanciesActions } from 'vk-apps-frontend/actions/api';

const mapDispatchToProps = dispatch => {
  return {
    getVacancy: bindActionCreators(vacanciesActions.getVacancy, dispatch),
    updateVacancy: bindActionCreators(vacanciesActions.updateVacancy, dispatch),
  };
};

class VacancyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleVacancyEditSubmit = this.handleVacancyEditSubmit.bind(this);
    this.setShouldBlockNavigation = this.setShouldBlockNavigation.bind(this);
    this.state = {
      shouldBlockNavigation: false,
      vacancy: null,
      success: null,
      errors: {},
    };
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    const { id } = this.props.match.params;
    const vacancyResponse = await this.props.getVacancy(id);
    const vacancy = vacancyResponse.status === 200 && vacancyResponse.data;
    this.setState({
      fetching: false,
      vacancy,
    });
  }

  async handleVacancyEditSubmit(id, values) {
    const response = await this.props.updateVacancy(id, values);
    const success = response.status < 400;
    const errors = success ? {} : response;
    this.setState({
      shouldBlockNavigation: false,
      success,
      errors,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  setShouldBlockNavigation(shouldBlockNavigation) {
    this.setState({ shouldBlockNavigation });
  }

  render() {
    const { fetching, success, vacancy, shouldBlockNavigation } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Редактирование предложения
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

          {fetching && <DivSpinner />}

          <Group>
            <FormDisclaimer />
          </Group>

          <Group title="Заполняемые поля">
            {success && <SuccessfulFormStatus title="Успешно" />}

            {vacancy && (
              <Formik
                initialValues={{
                  ...vacancy,
                }}
                validate={values => {
                  this.setState({
                    success: false,
                  });
                  return VacancyForm.validate(values)
                }}
                render={formikProps =>
                  <VacancyForm
                    { ...formikProps }
                    submitLabel="Редактировать"
                    setShouldBlockNavigation={this.setShouldBlockNavigation}
                  />
                }
                onSubmit={ async (values, action) => {
                  const { id } = vacancy;
                  await this.handleVacancyEditSubmit(id, values);
                  const { errors } = this.state;
                  action.setErrors(errors);
                  action.setSubmitting(false);
                }}
              />
            )}
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(VacancyEdit);