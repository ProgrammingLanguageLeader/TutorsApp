import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Panel, PanelHeader, Cell, Avatar, HeaderButton, Group, Div } from '@vkontakte/vkui';
import { Formik } from 'formik';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import { ROOT_URL } from 'vk-apps-frontend/constants';
import { locationActions } from 'vk-apps-frontend/actions';
import { usersActions, vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

import UploadAvatarForm from 'vk-apps-frontend/forms/UploadAvatarForm';
import EditProfileForm from 'vk-apps-frontend/forms/EditProfileForm';

const mapStateToProps = state => {
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const { user, vkId } = state.apiReducer.vkAppsUsersReducer;
  const fetching = state.apiReducer.vkAppsUsersReducer.fetching || state.apiReducer.usersReducer.fetching;
  const { errors, success } = state.apiReducer.usersReducer;
  return {
    vkUserInfo, user, fetching, errors, vkId, success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: bindActionCreators(locationActions.goBack, dispatch),
    changeLocation: bindActionCreators(locationActions.changeLocation, dispatch),
    getVkAppsUser: bindActionCreators(vkAppsUsersActions.getVkAppsUser, dispatch),
    updateUser: bindActionCreators(usersActions.updateUser, dispatch),
    uploadAvatar: bindActionCreators(usersActions.uploadAvatar, dispatch),
  }
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditProfileSubmit = this.handleEditProfileSubmit.bind(this);
    this.handleUploadAvatarFormSubmit = this.handleUploadAvatarFormSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.vkUserInfo;
    this.props.getVkAppsUser(id);
  }

  async handleUploadAvatarFormSubmit(values) {
    try {
      const { id } = this.props.user;
      const { avatar } = values;
      await this.props.uploadAvatar(id, {
        avatar,
      });
      const { vkId } = this.props;
      await this.props.getVkAppsUser(vkId);
    }
    catch (exception) {
      console.log(exception);
    }
  }

  async handleEditProfileSubmit(values) {
    try {
      const { id } = this.props.user;
      await this.props.updateUser(id, {
        ...values
      });
      const { vkId } = this.props;
      await this.props.getVkAppsUser(vkId);
    }
    catch (exception) {
      console.log(exception);
    }
  }

  render() {
    const { user, success } = this.props;
    const {
      first_name,
      last_name,
      experience,
      education,
      city,
      district,
      street,
      metro_station,
      bio
    } = user;

    return (
      <View id={this.props.id} activePanel="edit_profile">
        <Panel id="edit_profile">
          <PanelHeader
            left={
              <HeaderButton onClick={this.props.goBack}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Изменение профиля
          </PanelHeader>
          <Group>
            <Cell
              size="l"
              multiline
              description="Здесь можно посмотреть и отредактировать публичную информацию о Вашем профиле"
              before={<Avatar size={80} src={ROOT_URL + user.avatar} />}
            >
              {`${user.first_name} ${user.last_name}`}
            </Cell>
          </Group>

          { success && (
            <Group>
              <Div>
                <SuccessfulFormStatus title="Успешно" />
              </Div>
            </Group>
          )}

          <Group title="Изображение профиля">
            <Formik
              initialValues={{
                avatar: null,
              }}
              component={UploadAvatarForm}
              onSubmit={ async (values, actions) => {
                await this.handleUploadAvatarFormSubmit(values);
                actions.setSubmitting(false);
                actions.setErrors(this.props.errors || {})
              }}
            />
          </Group>

          <Group title="Информация о пользователе">
            <Formik
              initialValues={{
                first_name,
                last_name,
                experience,
                education,
                city,
                district,
                street,
                metro_station,
                bio,
              }}
              component={EditProfileForm}
              onSubmit={ async (values, actions) => {
                await this.handleEditProfileSubmit(values);
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);