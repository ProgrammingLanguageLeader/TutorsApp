import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

const EditUserForm = ({
  values,
  errors,
  status,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => (
  <FormLayout>
    { Object.keys(errors).length > 0 && (
      <FormStatus title="Ошибка" state="error">
        Проверьте заполненные поля: {JSON.stringify(errors)}
      </FormStatus>
    )}
    { isSubmitting && (
      <DivSpinner />
    )}
    { values.isSuccessful && (
      <SuccessfulFormStatus title="Успешно" />
    )}

    <Input
      name="experience"
      top="Опыт преподавания"
      value={values.experience}
      onChange={handleChange}
    />

    <Input
      name="education"
      top="Образование"
      value={values.education}
      onChange={handleChange}
    />

    <Input
      name="city"
      top="Город"
      value={values.city}
      onChange={handleChange}
    />

    <Input
      name="district"
      top="Район"
      value={values.district}
      onChange={handleChange}
    />

    <Input
      name="street"
      top="Улица"
      value={values.street}
      onChange={handleChange}
    />

    <Input
      name="metro_station"
      top="Станция метро"
      value={values.metro_station}
      onChange={handleChange}
    />

    <Textarea
      name="bio"
      top="О себе"
      value={values.bio}
      onChange={handleChange}
    />
    <Button size="xl" onClick={handleSubmit} disabled={isSubmitting}>
      Сохранить
    </Button>
  </FormLayout>
);

export default EditUserForm;