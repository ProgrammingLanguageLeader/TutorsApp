import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import VacancyForm from 'vk-apps-frontend/forms/VacancyForm';

import { vacanciesActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  return {};
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
    this.startDiv = React.createRef();
    this.state = {
      success: null,
      errors: {},
    };
  }

  componentDidUpdate() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth'
    });
  }

  async handleCreateVacancyFormSubmit(values) {
    const response = await this.props.createVacancy({
      ...values
    });
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
    return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Создание предложения
          </PanelHeader >

          <div ref={this.startDiv} />

          {this.state.success && (
            <Group>
              <Div>
                <SuccessfulFormStatus title="Успешно" />
              </Div>
            </Group>
          )}

          <Group title="Заполняемые поля">
            <Formik
              render={formikProps =>
                <VacancyForm { ...formikProps } submitLabel="Создать" />
              }
              enableReinitialize
              onSubmit={ async (values, action) => {
                await this.handleCreateVacancyFormSubmit(values);
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

export default connect(mapStateToProps, mapDispatchToProps)(VacancyCreate);