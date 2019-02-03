import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Div, File, FormLayout, Spinner } from '@vkontakte/vkui';

import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import Icon24Upload from '@vkontakte/icons/dist/24/upload';

import { usersActions, vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const { user } = state.apiReducer.vkAppsUsersReducer;
  const { fetching } = state.apiReducer.usersReducer;
  return {
    fetching, vkUserInfo, user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadAvatar: bindActionCreators(usersActions.uploadAvatar, dispatch),
    getVkAppsUser: bindActionCreators(vkAppsUsersActions.getVkAppsUser, dispatch),
  };
};

class UploadAvatarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarFile: null,
      avatar: null,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFileChange(event) {
    const avatarFile = event.target.files[0];
    this.setState({
      avatarFile,
    });
    const fileReader = new FileReader();
    fileReader.onload = event => {
      this.setState({
        avatar: event.target.result,
      });
    };
    fileReader.readAsDataURL(avatarFile);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const vkId = this.props.vkUserInfo.id;
    await this.props.getVkAppsUser(vkId);

    const { user } = this.props;
    if (user) {
      const { avatarFile } = this.state;
      await this.props.uploadAvatar(user.id, {
        avatar: avatarFile,
      });
    }
  }

  render() {
    const { avatar } = this.state;
    const { fetching } = this.props;

    return (
      <FormLayout>
        {
          fetching ? (
            <Spinner size="large" style={{ marginTop: 20 }} />
          ) : (
            <div>
              <File
                name="avatar"
                top="Аватар"
                before={<Icon24Camera />}
                size="l"
                onChange={this.handleFileChange}
              >
                Выбрать из галереи
              </File>

              { avatar && (
                <Div>
                  <img width={200} height={200} src={avatar} alt="Выбранное изображение" />
                </Div>
              )}

              { avatar && (
                <Button before={<Icon24Upload />} size="l" onClick={this.handleSubmit}>
                  Загрузить
                </Button>
              )}
            </div>
          )
        }
      </FormLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatarForm);