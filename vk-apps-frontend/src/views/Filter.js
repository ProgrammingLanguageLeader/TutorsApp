import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';

import VacanciesFilterForm from 'vk-apps-frontend/forms/VacanciesFilterForm';

import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { filterActions } from 'vk-apps-frontend/actions';

const mapStateToProps = state => {
  const { filterReducer } = state;
  return {
    filterReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFilter: bindActionCreators(filterActions.deleteFilter, dispatch),
    updateFilter: bindActionCreators(filterActions.updateFilter, dispatch),
  }
};

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: false
    };
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
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader
            left={
              <HeaderButton onClick={this.props.history.goBack}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Фильтр предложений
          </PanelHeader>

          <Group title="Поля фильтра">
            <Formik
              component={VacanciesFilterForm}
              initialValues={{...this.props.filterReducer}}
              onSubmit={async (values, action) => {
                this.handleVacanciesFilterFormSubmit(values);
                await action.setSubmitting(false);
              }}
              onReset={async (values, action) => {
                this.handleVacanciesFilterFormReset();
                await action.setValues({...this.props.filterReducer});
              }}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);