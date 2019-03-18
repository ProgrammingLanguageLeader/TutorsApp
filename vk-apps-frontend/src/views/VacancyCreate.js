import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import FormDisclaimer from 'vk-apps-frontend/components/FormDisclaimer';

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
    this.startDiv = React.createRef();
    this.handleCreateVacancyFormSubmit = this.handleCreateVacancyFormSubmit.bind(this);
    this.scrollIntoStartDiv = this.scrollIntoStartDiv.bind(this);
    this.state = {
      errors: {},
    };
  }

  scrollIntoStartDiv() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth'
    });
  }

  async handleCreateVacancyFormSubmit(values) {
    const response = await this.props.createVacancy({
      ...values
    });
    const errors = response.status < 400 ? {} : response;
    this.setState({
      errors,
    });
    if (Object.keys(errors).length === 0) {
      this.props.history.goBack();
    }
    else {
      this.scrollIntoStartDiv();
    }
  }

  render() {
    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Создание предложения
          </PanelHeader >

          <div ref={this.startDiv} />

          <Group>
            <FormDisclaimer />
          </Group>

          <Group title="Заполняемые поля">
            <Formik
              render={formikProps =>
                <VacancyForm
                  { ...formikProps }
                  submitLabel="Создать"
                />
              }
              validate={values => {
                this.setState({
                  success: false,
                });
                return VacancyForm.validate(values)
              }}
              enableReinitialize
              onSubmit={ async (values, action) => {
                await this.handleCreateVacancyFormSubmit(values);
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

export default connect(null, mapDispatchToProps)(VacancyCreate);