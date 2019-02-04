import React from 'react';

import { Button, FormLayout, FormStatus, Input, Textarea } from '@vkontakte/vkui';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

const EditProfileForm = ({
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

export default EditProfileForm;