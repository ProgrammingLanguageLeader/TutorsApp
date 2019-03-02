import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import { ROOT_URL } from 'vk-apps-frontend/constants';
import { usersActions } from 'vk-apps-frontend/actions/api';

import UploadAvatarForm from 'vk-apps-frontend/forms/UploadAvatarForm';
import EditUserForm from 'vk-apps-frontend/forms/EditUserForm';

const mapStateToProps = state => {
  const { currentUserReducer } = state;
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const { user, fetching } = state.apiReducer.usersReducer;
  return {
    vkUserInfo,
    fetching,
    currentUserReducer,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: bindActionCreators(usersActions.getUser, dispatch),
    updateUser: bindActionCreators(usersActions.updateUser, dispatch),
    uploadAvatar: bindActionCreators(usersActions.uploadAvatar, dispatch),
  }
};

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditProfileSubmit = this.handleEditProfileSubmit.bind(this);
    this.handleUploadAvatarFormSubmit = this.handleUploadAvatarFormSubmit.bind(this);
    this.startDiv = React.createRef();
    this.state = {
      success: null,
      errors: {},
    }
  }

  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.currentUserReducer.user;
      this.props.getUser(id);
    }
  }

  componentDidUpdate() {
    this.startDiv.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  async handleUploadAvatarFormSubmit(values) {
    const { id } = this.props.currentUserReducer.user;
    const { avatar } = values;
    const response = await this.props.uploadAvatar(id, {
      avatar,
    });
    if (response.status === 200) {
      await this.setState({
        success: true,
        errors: {},
      });
      this.props.getUser(id);
      return;
    }
    await this.setState({
      success: false,
      errors: response
    });
  }

  async handleEditProfileSubmit(values) {
    const { id } = this.props.currentUserReducer.user;
    const response = await this.props.updateUser(id, {
      ...values
    });
    if (response.status === 200) {
      await this.setState({
        success: true,
        errors: {},
      });
      this.props.getUser(id);
      return;
    }
    await this.setState({
      success: false,
      errors: response,
    });
  }

  render() {
    const { user } = this.props;

    return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Изменение профиля
          </PanelHeader>

          <div ref={this.startDiv} />

          {user && (
            <Group>
              <Cell
                multiline
                description="Редактирование информации пользователя"
                before={<Avatar size={80} src={ROOT_URL + user.avatar} />}
              >
                {user.first_name} {user.last_name}
              </Cell>
            </Group>
          )}

          {this.state.success && (
            <Group>
              <Div>
                <SuccessfulFormStatus title="Успешно" />
              </Div>
            </Group>
          )}

          {user && (
            <Group title="Изображение профиля">
              <Formik
                initialValues={{
                  avatar: null,
                }}
                component={UploadAvatarForm}
                onSubmit={ async (values, actions) => {
                  await this.handleUploadAvatarFormSubmit(values);
                  actions.setSubmitting(false);
                  actions.setErrors(this.state.errors)
                }}
              />
            </Group>
          )}

          {user && (
            <Group title="Информация о пользователе">
              <Formik
                initialValues={{
                  first_name: user.first_name,
                  last_name: user.last_name,
                  experience: user.experience,
                  education: user.education,
                  city: user.city,
                  district: user.district,
                  street: user.street,
                  metro_station: user.metro_station,
                  bio: user.bio
                }}
                component={EditUserForm}
                onSubmit={ async (values, actions) => {
                  await this.handleEditProfileSubmit(values);
                  actions.setSubmitting(false);
                  actions.setErrors(this.state.errors);
                }}
              />
            </Group>
          )}
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);