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
  const { currentUser } = state;
  const { errors } = state.VK.appsPay;
  return {
    errors,
    currentUser,
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
    this.state = {
      tutors: [],
    }
  }

  componentDidUpdate() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  async componentDidMount() {
    const tutorsListResponse = await this.props.getTutorsList();
    const tutors = tutorsListResponse.status === 200
      ? tutorsListResponse.data.results
      : [];
    this.setState({
      tutors,
    });
  }

  render() {
    const { tutors } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
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
                <MoneyTransferForm {...formikProps} tutors={tutors} />
              }
              validate={MoneyTransferForm.validate}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={ async (values, actions) => {
                const response = await this.props.retrieveVkAppsUserByUserId(values.recipient);
                if (response.status >= 400) {
                  actions.setSubmitting(false);
                  actions.setErrors({
                    data: {
                      recipient: 'Выбранный пользователь не зарегистрирован через VK Apps'
                    }
                  });
                  return;
                }
                this.props.openPayForm(
                  'pay-to-user',
                  {
                    'user_id': response.data.vk_id,
                    'amount': values.amount
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