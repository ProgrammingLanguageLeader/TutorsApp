import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';
import ErrorMessageDiv from 'vk-apps-frontend/components/ErrorMessageDiv';

class EditUserForm extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.dirty !== this.props.dirty) {
      this.props.setShouldBlockNavigation(this.props.dirty);
    }
  }

  render() {
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
      isSubmitting,
    } = this.props;

    return (
      <FormLayout>
        {Object.keys(errors).length > 0 && (
          <ErrorFormStatus errors={errors}/>
        )}
        {isSubmitting && (
          <DivSpinner/>
        )}

        <Input
          name="first_name"
          maxLength={30}
          top="Имя"
          value={values.first_name}
          onChange={handleChange}
        />
        {errors.data && errors.data["first_name"] && (
          <ErrorMessageDiv>{errors.data["first_name"]}</ErrorMessageDiv>
        )}

        <Input
          name="last_name"
          maxLength={30}
          top="Фамилия"
          value={values.last_name}
          onChange={handleChange}
        />
        {errors.data && errors.data["last_name"] && (
          <ErrorMessageDiv>{errors.data["last_name"]}</ErrorMessageDiv>
        )}

        <Input
          name="experience"
          maxLength={100}
          top="Опыт преподавания"
          value={values.experience}
          onChange={handleChange}
        />
        {errors.data && errors.data["experience"] && (
          <ErrorMessageDiv>{errors.data["experience"]}</ErrorMessageDiv>
        )}

        <Input
          name="education"
          maxLength={100}
          top="Образование"
          value={values.education}
          onChange={handleChange}
        />
        {errors.data && errors.data["education"] && (
          <ErrorMessageDiv>{errors.data["education"]}</ErrorMessageDiv>
        )}

        <Input
          name="city"
          maxLength={50}
          top="Город"
          value={values.city}
          onChange={handleChange}
        />
        {errors.data && errors.data["city"] && (
          <ErrorMessageDiv>{errors.data["city"]}</ErrorMessageDiv>
        )}

        <Input
          name="district"
          maxLength={50}
          top="Район"
          value={values.district}
          onChange={handleChange}
        />
        {errors.data && errors.data["district"] && (
          <ErrorMessageDiv>{errors.data["district"]}</ErrorMessageDiv>
        )}

        <Input
          name="street"
          maxLength={50}
          top="Улица"
          value={values.street}
          onChange={handleChange}
        />
        {errors.data && errors.data["street"] && (
          <ErrorMessageDiv>{errors.data["street"]}</ErrorMessageDiv>
        )}

        <Input
          name="metro_station"
          maxLength={50}
          top="Станция метро"
          value={values.metro_station}
          onChange={handleChange}
        />
        {errors.data && errors.data["metro_station"] && (
          <ErrorMessageDiv>{errors.data["metro_station"]}</ErrorMessageDiv>
        )}

        <Textarea
          name="bio"
          maxLength={100}
          top="О себе"
          value={values.bio}
          onChange={handleChange}
        />
        {errors.data && errors.data["bio"] && (
          <ErrorMessageDiv>{errors.data["bio"]}</ErrorMessageDiv>
        )}

        <Button size="xl" onClick={handleSubmit} disabled={isSubmitting}>
          Сохранить
        </Button>
      </FormLayout>
    );
  };
}

export default EditUserForm;