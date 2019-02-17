import React from 'react';

import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';

const ErrorFormStatus = ({ errors }) => (
  <FormStatus title="Ошибка" state="error">
    {errors.status === 500 && 'Внутренняя ошибка сервера'}
    {400 <= errors.status && errors.status < 500 && Object.keys(errors.data).map(errorKey => {
      return (
        <div key={errorKey}>
          {errorKey} - {errors.data[errorKey]}
        </div>
      );
    })}
    {!errors.status && errors.message}
  </FormStatus>
);

export default ErrorFormStatus;