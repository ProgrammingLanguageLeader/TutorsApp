import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Input from '@vkontakte/vkui/dist/components/Input/Input';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';

class MoneyTransferForm extends React.Component {
  static validate(values) {
    const errorsData = {};

    if (!values.amount) {
      errorsData.amount = 'Это поле обязательно';
    } else if (!(1 <= Number(values.amount) && Number(values.amount) <= 10000)) {
      errorsData.amount = 'Значение должно быть от 1 до 10000';
    }

    if (!values.recipient) {
      errorsData.recipient = 'Это поле обязательно';
    }

    return Object.keys(errorsData).length > 0
      ? { data: errorsData }
      : {};
  }

  render() {
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
      isSubmitting,
      tutors
    } = this.props;

    return (
      <FormLayout>
        {Object.keys(errors).length > 0 && (
          <ErrorFormStatus errors={errors}/>
        )}
        {isSubmitting && (
          <DivSpinner/>
        )}

        <Select
          top="Получатель"
          status={errors.data && errors.data["recipient"] && "error"}
          bottom={errors.data && errors.data["recipient"]}
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

        <Input
          top="Сумма"
          status={errors.data && errors.data["amount"] && "error"}
          bottom={errors.data && errors.data["amount"]}
          name="amount"
          type="number"
          min={1}
          max={10000}
          inputMode="numeric"
          pattern="[0-9]*"
          value={String(values.amount)}
          onChange={handleChange}
        />

        <Button size="xl" onClick={handleSubmit} disabled={isSubmitting}>
          Отправить
        </Button>
      </FormLayout>
    );
  }
}

export default MoneyTransferForm;