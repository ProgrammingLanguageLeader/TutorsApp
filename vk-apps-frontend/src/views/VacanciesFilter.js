import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import VacanciesFilterForm from 'vk-apps-frontend/forms/VacanciesFilterForm';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';

import { vacanciesFilterActions } from 'vk-apps-frontend/actions';

const mapStateToProps = state => {
  const { vacanciesFilter } = state;
  return {
    vacanciesFilter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFilter: bindActionCreators(vacanciesFilterActions.deleteFilter, dispatch),
    updateFilter: bindActionCreators(vacanciesFilterActions.updateFilter, dispatch),
  }
};

class VacanciesFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleVacanciesFilterFormSubmit = this.handleVacanciesFilterFormSubmit.bind(this);
    this.handleVacanciesFilterFormReset = this.handleVacanciesFilterFormReset.bind(this);
  }

  handleVacanciesFilterFormSubmit(values) {
    this.props.updateFilter(values);
    this.props.history.push('/vacancies');
  }

  handleVacanciesFilterFormReset() {
    this.props.deleteFilter();
  }

  render() {
    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader
            left={
              <SmartBackButton history={this.props.history} />
            }
          >
            Фильтр предложений
          </PanelHeader>

          <Group title="Поля фильтра">
            <Formik
              component={VacanciesFilterForm}
              initialValues={{...this.props.vacanciesFilter}}
              onSubmit={async (values, action) => {
                this.handleVacanciesFilterFormSubmit(values);
                await action.setSubmitting(false);
              }}
              onReset={async (values, action) => {
                this.handleVacanciesFilterFormReset();
                await action.setValues({...this.props.vacanciesFilter});
              }}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VacanciesFilter);