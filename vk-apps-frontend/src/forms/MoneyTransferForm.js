import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

const MoneyTransferForm = ({
  values,
  errors,
  status,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  isSuccessful,
  tutors
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
    { isSuccessful && (
      <Div>
        <SuccessfulFormStatus title="Успешно" />
      </Div>
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
        value={values.amount}
        onChange={handleChange}
      />
    </FormLayoutGroup>

    <FormLayoutGroup top="Сообщение к переводу">
      <Input name="message" />
    </FormLayoutGroup>

    <Button size="xl" onClick={handleSubmit} disabled={isSubmitting}>
      Отправить
    </Button>
  </FormLayout>
);

export default MoneyTransferForm;