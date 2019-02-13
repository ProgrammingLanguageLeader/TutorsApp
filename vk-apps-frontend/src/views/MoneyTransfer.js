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
import { tutorsActions, vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { tutors } = state.apiReducer.tutorsReducer;
  const { currentUserReducer } = state;
  const { success, errors } = state.vkReducer.appsPayReducer;
  const { vkId } = state.apiReducer.vkAppsUsersReducer;
  return {
    tutors,
    success,
    errors,
    currentUserReducer,
    vkId,
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

        <div ref={this.startDiv} />

        <Group title="Форма перевода">
          <Formik
            initialValues={{}}
            render={formikProps =>
              <MoneyTransferForm {...formikProps} isSuccessful={success} tutors={tutors || []} />
            }
            onSubmit={ async (values, actions) => {
              await this.props.retrieveVkAppsUserByUserId(values.recipient);
              const { vkId } = this.props;
              console.log(vkId);
              this.props.openPayForm(
                'pay-to-user',
                {
                  'user_id': vkId,
                  'amount': values.amount,
                  'message': values.message,
                }
              );
              actions.setSubmitting(false);
              actions.setErrors(this.props.errors || {});
            }}
          />
        </Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransfer);