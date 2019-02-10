import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import { ROOT_URL } from 'vk-apps-frontend/constants';
import { usersActions } from 'vk-apps-frontend/actions/api';

import UploadAvatarForm from 'vk-apps-frontend/forms/UploadAvatarForm';
import EditProfileForm from 'vk-apps-frontend/forms/EditProfileForm';

const mapStateToProps = state => {
  const { currentUserReducer } = state;
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const {
    user,
    fetching,
    errors,
    success,
  } = state.apiReducer.usersReducer;
  return {
    vkUserInfo,
    fetching,
    errors,
    success,
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
  }

  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.currentUserReducer.user;
      this.props.getUser(id);
    }
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  async handleUploadAvatarFormSubmit(values) {
    try {
      const { id } = this.props.currentUserReducer.user;
      const { avatar } = values;
      await this.props.uploadAvatar(id, {
        avatar,
      });
      await this.props.getUser(id);
    }
    catch (exception) {
      console.log(exception);
    }
  }

  async handleEditProfileSubmit(values) {
    try {
      const { id } = this.props.currentUserReducer.user;
      await this.props.updateUser(id, {
        ...values
      });
      await this.props.getUser(id);
    }
    catch (exception) {
      console.log(exception);
    }
  }

  render() {
    const { user, fetching, success } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Изменение профиля
        </PanelHeader>

        {fetching && (
          <DivSpinner />
        )}

        {user && (
          <Group>
            <Cell
              size="l"
              multiline
              description="Здесь можно посмотреть и отредактировать публичную информацию о Вашем профиле"
              before={<Avatar size={80} src={ROOT_URL + user.avatar} />}
            >
              {user.first_name} {user.last_name}
            </Cell>
          </Group>
        )}

        {success && (
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
                actions.setErrors(this.props.errors || {})
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
              component={EditProfileForm}
              onSubmit={ async (values, actions) => {
                await this.handleEditProfileSubmit(values);
                actions.setSubmitting(false);
                actions.setErrors(this.props.errors || {});
              }}
            />
          </Group>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);