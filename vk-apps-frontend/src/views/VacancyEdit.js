import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';
import FormDisclaimer from 'vk-apps-frontend/components/FormDisclaimer';

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
    this.startDiv = React.createRef();
    this.handleVacancyEditSubmit = this.handleVacancyEditSubmit.bind(this);
    this.scrollIntoViewStartDiv = this.scrollIntoViewStartDiv.bind(this);
    this.state = {
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

  scrollIntoViewStartDiv() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth'
    });
  }

  async handleVacancyEditSubmit(id, values) {
    const response = await this.props.updateVacancy(id, values);
    const success = response.status < 400;
    const errors = success ? {} : response;
    this.setState({
      success,
      errors,
    });
    this.scrollIntoViewStartDiv();
  }

  render() {
    const { fetching, success, vacancy } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Редактирование предложения
          </PanelHeader >

          <div ref={this.startDiv} />

          {fetching && <DivSpinner />}

          <Group>
            <FormDisclaimer />
          </Group>

          <Group title="Заполняемые поля">
            {success && <SuccessfulFormStatus title="Успешно" />}

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
              enableReinitialize
              render={formikProps =>
                <VacancyForm
                  { ...formikProps }
                  submitLabel="Редактировать"
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
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(VacancyEdit);