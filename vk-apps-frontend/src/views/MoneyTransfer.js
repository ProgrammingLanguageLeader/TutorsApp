import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import MoneyTransferForm from 'vk-apps-frontend/forms/MoneyTransferForm';

import { appsActions } from 'vk-apps-frontend/actions/vk';
import { tutorsActions, vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { tutors } = state.apiReducer.tutorsReducer;
  const { currentUserReducer } = state;
  const { errors } = state.vkReducer.appsPayReducer;
  return {
    tutors,
    errors,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTutorsList: bindActionCreators(tutorsActions.getTutorsList, dispatch),
    retrieveVkAppsUserByUserId: bindActionCreators(vkAppsUsersActions.retrieveVkAppsUserByUserId, dispatch),
    openPayForm: bindActionCreators(appsActions.openPayForm, dispatch),
  };
};

class MoneyTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.startDiv = React.createRef();
  }

  componentDidUpdate() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      this.props.getTutorsList();
    }
  }

  render() {
    const { tutors } = this.props;

    return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={() => this.props.history.goBack()}>
              <BackIcon />
            </HeaderButton>
          }>
            Перевод денег
          </PanelHeader>

          <div ref={this.startDiv} />

          <Group title="Форма перевода">
            <Formik
              initialValues={{
                amount: 500,
              }}
              render={formikProps =>
                <MoneyTransferForm {...formikProps} tutors={tutors || []} />
              }
              validate={values => {
                let errors = {};

                if (!values.amount) {
                  errors.amount = 'Это поле обязательно';
                } else if (!(1 <= Number(values.amount) && Number(values.amount) <= 10000)) {
                  errors.amount = 'Значение должно быть от 1 до 10000';
                }

                if (!values.recipient) {
                  errors.recipient = 'Это поле обязательно';
                }

                return errors;
              }}
              onSubmit={ async (values, actions) => {
                const response = await this.props.retrieveVkAppsUserByUserId(values.recipient);
                if (response.status >= 400) {
                  actions.setSubmitting(false);
                  actions.setErrors({
                    recipient: 'Выбранный пользователь не зарегистрирован через VK Apps'
                  });
                  return;
                }
                this.props.openPayForm(
                  'pay-to-user',
                  {
                    'user_id': response.data.vk_id,
                    'amount': values.amount,
                    'message': values.message,
                  }
                );
                actions.setSubmitting(false);
                actions.setErrors(this.props.errors || {});
              }}
            />
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransfer);