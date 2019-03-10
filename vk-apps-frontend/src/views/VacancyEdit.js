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
  const { vacancy } = state.API.vacanciesReducer;
  return {
    vacancy,
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
    this.handleVacancyEditSubmit = this.handleVacancyEditSubmit.bind(this);
    this.state = {
      success: null,
      errors: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getVacancy(id);
  }

  componentDidUpdate() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth'
    });
  }

  async handleVacancyEditSubmit(id, values) {
    const response = await this.props.updateVacancy(id, values);
    if (response.status >= 400) {
      this.setState({
        success: false,
        errors: response,
      });
      return;
    }
    this.setState({
      success: true,
      errors: {},
    });
  }

  render() {
    const { vacancy } = this.props;

    return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Редактирование предложения
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
              initialValues={{
                ...vacancy,
              }}
              enableReinitialize
              render={formikProps =>
                <VacancyForm { ...formikProps } errors={this.state.errors} submitLabel="Редактировать" />
              }
              onSubmit={ async (values, action) => {
                const { id } = this.props.vacancy;
                await this.handleVacancyEditSubmit(id, values);
                action.setErrors(this.state.errors);
                action.setSubmitting(false);
              }}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VacancyEdit);