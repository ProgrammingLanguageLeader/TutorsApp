import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import File from '@vkontakte/vkui/dist/components/File/File';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';

import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import Icon24Upload from '@vkontakte/icons/dist/24/upload';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

class UploadAvatarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarThumb: null,
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.values.avatar === this.props.values.avatar) {
      return;
    }
    const { avatar } = this.props.values;
    const fileReader = new FileReader();
    fileReader.onload = event => {
      this.setState({
        avatarThumb: event.target.result,
      });
    };
    fileReader.readAsDataURL(avatar);
  }

  render() {
    const {
      errors,
      isSubmitting,
      values,
      handleSubmit,
      setFieldValue
    } = this.props;
    const { avatarThumb } = this.state;

    return (
      <FormLayout>
        { Object.keys(errors).length > 0 && (
          <FormStatus title="Ошибка" state="error">
            Проверьте заполненные поля: {JSON.stringify(errors)}
          </FormStatus>
        )}
        {
          isSubmitting ? (
            <DivSpinner />
          ) : (
            <div>
              <File
                name="avatar"
                top="Аватар"
                before={<Icon24Camera />}
                size="l"
                onChange={event => {
                  setFieldValue("avatar", event.currentTarget.files[0]);
                }}
              >
                Выбрать из галереи
              </File>

              { values.avatar && (
                <div>
                  <Div>
                    <div>Выбранное изображение: </div>
                    <img
                      width={200}
                      src={avatarThumb}
                      alt="Выбранное изображение"
                    />
                  </Div>
                  <Button before={<Icon24Upload />} size="l" onClick={handleSubmit}>
                    Загрузить
                  </Button>
                </div>
              )}
            </div>
          )
        }
      </FormLayout>
    );
  }
}

export default UploadAvatarForm;