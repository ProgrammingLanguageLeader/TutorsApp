import React from 'react';
import styled from 'styled-components';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import File from '@vkontakte/vkui/dist/components/File/File';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';

import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import Icon24Upload from '@vkontakte/icons/dist/24/upload';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';

const CenteredDiv = styled(Div)`
  text-align: center;
`;

const StyledImage = styled.img`
  border-radius: 8px;
  box-shadow: 0 0 8px;
`;

const PaddingBottomDiv = styled.div`
  padding-bottom: 8px;
`;

class UploadAvatarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarThumb: null,
    };
  }

  static validate(values) {
    const errorsData = {};
    if (!UploadAvatarForm.validateAvatar(values.avatar)) {
      errorsData.avatar = 'Неподдерживаемый тип файла'
    }
    return Object.keys(errorsData).length > 0
      ? { data: errorsData }
      : {};
  }

  static validateAvatar(avatar) {
    const validAvatarTypes = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml'
    ];
    if (!avatar) {
      return true;
    }
    return validAvatarTypes.includes(avatar.type)
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
      setFieldValue,
      handleUploadFromVK
    } = this.props;
    const { avatarThumb } = this.state;
    const isAvatarValid = UploadAvatarForm.validateAvatar(values.avatar);

    return (
      <FormLayout>
        { Object.keys(errors).length > 0 && (
          <ErrorFormStatus errors={errors} />
        )}

        {isSubmitting && <DivSpinner />}

        <FormLayoutGroup>
          <Button size="xl" onClick={handleUploadFromVK}>
            Загрузить аватар из ВКонтакте
          </Button>

          <File
            name="avatar"
            before={<Icon24Camera />}
            size="xl"
            onChange={event => {
              setFieldValue("avatar", event.currentTarget.files[0]);
            }}
          >
            Выбрать из галереи
          </File>
        </FormLayoutGroup>

        { values.avatar && isAvatarValid && (
          <FormLayoutGroup>
            <CenteredDiv>
              <PaddingBottomDiv>
                Выбранное изображение:
              </PaddingBottomDiv>
              <StyledImage
                width={200}
                src={avatarThumb}
                alt="Выбранное изображение"
              />
            </CenteredDiv>
            <Button before={<Icon24Upload />} size="xl" onClick={handleSubmit}>
              Загрузить
            </Button>
          </FormLayoutGroup>
        )}
      </FormLayout>
    );
  }
}

export default UploadAvatarForm;