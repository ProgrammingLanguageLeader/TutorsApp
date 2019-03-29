import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';

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
          status={errors.data && errors.data["first_name"] && "error"}
          bottom={errors.data && errors.data["first_name"]}
          value={values.first_name}
          onChange={handleChange}
        />

        <Input
          name="last_name"
          maxLength={30}
          top="Фамилия"
          status={errors.data && errors.data["last_name"] && "error"}
          bottom={errors.data && errors.data["last_name"]}
          value={values.last_name}
          onChange={handleChange}
        />

        <Input
          name="experience"
          maxLength={100}
          top="Опыт преподавания"
          status={errors.data && errors.data["experience"] && "error"}
          bottom={errors.data && errors.data["experience"]}
          value={values.experience}
          onChange={handleChange}
        />

        <Input
          name="education"
          maxLength={100}
          top="Образование"
          status={errors.data && errors.data["education"] && "error"}
          bottom={errors.data && errors.data["education"]}
          value={values.education}
          onChange={handleChange}
        />

        <Input
          name="city"
          maxLength={50}
          top="Город"
          status={errors.data && errors.data["city"] && "error"}
          bottom={errors.data && errors.data["city"]}
          value={values.city}
          onChange={handleChange}
        />

        <Input
          name="district"
          maxLength={50}
          top="Район"
          status={errors.data && errors.data["district"] && "error"}
          bottom={errors.data && errors.data["district"]}
          value={values.district}
          onChange={handleChange}
        />

        <Input
          name="street"
          maxLength={50}
          top="Улица"
          status={errors.data && errors.data["street"] && "error"}
          bottom={errors.data && errors.data["street"]}
          value={values.street}
          onChange={handleChange}
        />

        <Input
          name="metro_station"
          maxLength={50}
          top="Станция метро"
          status={errors.data && errors.data["metro_station"] && "error"}
          bottom={errors.data && errors.data["metro_station"]}
          value={values.metro_station}
          onChange={handleChange}
        />

        <Textarea
          name="bio"
          maxLength={100}
          top="О себе"
          status={errors.data && errors.data["bio"] && "error"}
          bottom={errors.data && errors.data["bio"]}
          value={values.bio}
          onChange={handleChange}
        />

        <Button size="xl" onClick={handleSubmit} disabled={isSubmitting}>
          Сохранить
        </Button>
      </FormLayout>
    );
  };
}

export default EditUserForm;