import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import {
  View,
  Panel,
  PanelHeader,
  HeaderButton,
  Cell,
  Group
} from '@vkontakte/vkui';

import BackIcon from 'vk-apps-frontend/components/BackIcon';

import CreateVacancyForm from 'vk-apps-frontend/forms/CreateVacancyForm';

import { locationActions } from 'vk-apps-frontend/actions';
// import { vacanciesActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { errors } = state.apiReducer.vacanciesReducer;
  return {
    errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: bindActionCreators(locationActions.goBack, dispatch),
  };
};

class CreateVacancy extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateVacancyFormSubmit = this.handleCreateVacancyFormSubmit.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleCreateVacancyFormSubmit(values) {
    await this.props.createVacancy({
      ...values
    });
  }

  render() {
    const { errors } = this.props;

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
          </PanelHeader>
          <Group title="Заполняемые поля">
            <Formik
              component={CreateVacancyForm}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVacancy);
