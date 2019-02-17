import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Input from '@vkontakte/vkui/dist/components/Input/Input';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';

const MoneyTransferForm = ({
  values,
  errors,
  status,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  tutors
}) => (
  <FormLayout>
    { Object.keys(errors).length > 0 && (
      <ErrorFormStatus errors={errors} />
    )}
    { isSubmitting && (
      <DivSpinner />
    )}

    <FormLayoutGroup top="Выберите получателя из списка учителей">
      <Select
        name="recipient"
        placeholder="Не выбран"
        onChange={handleChange}
      >
        {tutors.map(tutor => {
          const tutorString = `${tutor.first_name} ${tutor.last_name}`;
          return (
            <option value={tutor.id} key={tutor.id}>
              {tutorString}
            </option>
          );
        })}
      </Select>
    </FormLayoutGroup>

    <FormLayoutGroup top="Сумма">
      <Input
        name="amount"
        type="number"
        value={String(values.amount)}
        onChange={handleChange}
      />
    </FormLayoutGroup>

    <Button size="xl" onClick={handleSubmit} disabled={isSubmitting}>
      Отправить
    </Button>
  </FormLayout>
);

export default MoneyTransferForm;