import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Input from '@vkontakte/vkui/dist/components/Input/Input';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';
import ErrorMessageDiv from 'vk-apps-frontend/components/ErrorMessageDiv';

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
          {errors.data && errors.data["recipient"] && (
            <ErrorMessageDiv>{errors.data["recipient"]}</ErrorMessageDiv>
          )}
        </FormLayoutGroup>

        <FormLayoutGroup top="Сумма">
          <Input
            name="amount"
            type="number"
            min={1}
            max={10000}
            inputmode="numeric"
            value={String(values.amount)}
            onChange={handleChange}
          />
          {errors.data && errors.data["amount"] && (
            <ErrorMessageDiv>{errors.data["amount"]}</ErrorMessageDiv>
          )}
        </FormLayoutGroup>

        <Button size="xl" onClick={handleSubmit} disabled={isSubmitting}>
          Отправить
        </Button>
      </FormLayout>
    );
  }
}

export default MoneyTransferForm;