import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { ROOT_URL } from 'vk-apps-frontend/constants';
import { usersActions } from 'vk-apps-frontend/actions/api';

import UploadAvatarForm from 'vk-apps-frontend/forms/UploadAvatarForm';
import EditUserForm from 'vk-apps-frontend/forms/EditUserForm';

const mapStateToProps = state => {
  const { vkUserInfo } = state.VK.appsUser;
  return {
    vkUserInfo,
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
    this.fetchUser = this.fetchUser.bind(this);
    this.handleUploadAvatarFromVK = this.handleUploadAvatarFromVK.bind(this);
    this.state = {
      user: null,
      fetching: false,
      errors: {},
    }
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    await this.fetchUser();
  }

  async fetchUser() {
    this.setState({
      fetching: true,
    });
    const { id } = this.props.match.params;
    const userResponse = await this.props.getUser(id);
    const user = userResponse.status === 200 && userResponse.data;
    this.setState({
      user,
      fetching: false,
    });
  }

  async handleUploadAvatarFromVK() {
    const { id } = this.props.match.params;
    const { photo_200 } = this.props.vkUserInfo;
    const avatarBlob = await axios({
      url: photo_200,
      method: 'GET',
      responseType: 'blob',
    });
    const fileExtension = photo_200
      .toString()
      .split('?')[0]
      .split('.')
      .slice(-1)[0];
    const avatar = new File(
      [avatarBlob.data],
      `avatar.${fileExtension}`,
      {
        type: avatarBlob.data.type,
        lastModified: Date.now()
      }
    );
    const uploadAvatarResponse = await this.props.uploadAvatar(id, {
      avatar,
    });
    const errors = uploadAvatarResponse.status < 400 ? {} : uploadAvatarResponse;
    if (Object.keys(errors).length === 0) {
      this.props.history.goBack();
    }
  }

  async handleUploadAvatarFormSubmit(values) {
    const { id } = this.props.match.params;
    const { avatar } = values;
    const response = await this.props.uploadAvatar(id, {
      avatar,
    });
    const errors = response.status < 400 ? {} : response;
    this.setState({
      fetching: false,
      errors,
    });
    await this.fetchUser();
    if (Object.keys(errors).length === 0) {
      this.props.history.goBack();
    }
  }

  async handleEditProfileSubmit(values) {
    this.setState({
      fetching: true,
    });
    const { id } = this.props.match.params;
    const response = await this.props.updateUser(id, {
      ...values
    });
    const errors = response.status < 400 ? {} : response;
    const user = {
      ...this.state.user,
      ...values,
    };
    this.setState({
      fetching: false,
      errors,
      user,
    });
    if (Object.keys(errors).length === 0) {
      this.props.history.goBack();
    }
  }

  render() {
    const { user, fetching } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
          }>
            Изменение профиля
          </PanelHeader>

          {fetching && <DivSpinner />}

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

          {user && (
            <Group title="Изображение профиля">
              <Formik
                initialValues={{
                  avatar: null,
                }}
                validate={UploadAvatarForm.validate}
                render={formikProps =>
                  <UploadAvatarForm
                    { ...formikProps }
                    handleUploadFromVK={this.handleUploadAvatarFromVK}
                  />
                }
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