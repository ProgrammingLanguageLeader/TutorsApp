import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import MoneyTransferForm from 'vk-apps-frontend/forms/MoneyTransferForm';

import { appsActions } from 'vk-apps-frontend/actions/vk';

const mapStateToProps = state => {
  const { tutors } = state.apiReducer.tutorsReducer;
  const { success, errors } = state.vkReducer.appsPayReducer;
  return {
    tutors, success, errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPayForm: bindActionCreators(appsActions.openPayForm, dispatch),
  };
};

class MoneyTransfer extends React.Component {
  render() {
    const { tutors, success } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={() => this.props.history.goBack()}>
            <BackIcon />
          </HeaderButton>
        }>
          Перевод денег
        </PanelHeader>

        <Group title="Форма перевода">
          <Formik
            initialValues={{
              amount: 0,
            }}
            render={formikProps =>
              <MoneyTransferForm {...formikProps} isSuccessful={success} tutors={tutors || []} />
            }
            onSubmit={ async (values, actions) => {
              await this.props.openPayForm(
                'pay-to-user',
                {
                  'user_id': values.recipient,
                  'amount': values.amount,
                  'description': values.message,
                }
              );
              actions.setSubmitting(false);
              actions.setErrors(this.props.errors || {})
            }}
          />
        </Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransfer);