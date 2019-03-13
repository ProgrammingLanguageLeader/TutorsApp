import React from 'react';
import moment from 'moment';

import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';

const errorKeyValues = {
  'tutor': 'учитель',
  'student': 'ученик',
  'price': 'цена',
  'beginning_time': 'время начала',
  'duration': 'длительность',
  'ending_time': 'время окончания',
  'user': 'пользователь',
  'first_name': 'имя',
  'last_name': 'фамилия',
  'experience': 'опыт',
  'education': 'образование',
  'city': 'город',
  'district': 'район',
  'street': 'улица',
  'metro_station': 'станция метро',
  'bio': 'о себе',
  'avatar': 'аватар',
  'subject': 'предмет',
  'ege': 'ЕГЭ',
  'oge': 'ОГЭ',
  'foreign_lang_cert': 'сертификат о знании иностранного языка',
  'primary_school': 'начальная школа',
  'secondary_school': 'средняя школа',
  'olympiads': 'олимпиады',
  'university': 'курс высшего образования',
  'home_schooling': 'выезд на дом',
  'extra_info': 'дополнительная информация',
  'amount': 'сумма',
  'recipient': 'получатель',
};

const switchcase = (cases, defaultCase, key) => {
  if (cases.hasOwnProperty(key)) {
    return cases[key];
  }
  return defaultCase;
};

const getTimingErrorMessage = (errorsData, errorKey) => {
  const [ message, timeValue ] = errorsData[errorKey];
  // TODO: fix deprecation warning (it doesn't influence
  //  a normal work on a correct function usage)
  const localTimeValue = moment
    .utc(timeValue)
    .local()
    .format("D MMMM YYYY HH:mm");
  return `${errorKeyValues[errorKey]} - ${message.toLowerCase()} ${localTimeValue}`;
};

const capitalize = string => string[0].toUpperCase() + string.slice(1);

const ErrorFormStatus = ({ errors }) => (
  <FormStatus state="error">
    {errors.status >= 500 && 'Внутренняя ошибка сервера'}
    {errors.data && (!errors.status || errors.status < 500) && Object.keys(errors.data).map(
      (errorKey, errorIndex) => {
        const errorMessage = switchcase(
          {
            'non_field_errors': errors.data[errorKey][0],
            'beginning_time': getTimingErrorMessage(errors.data, errorKey),
            'ending_time': getTimingErrorMessage(errors.data, errorKey),
          }, 
          `${errorKeyValues[errorKey]} - ${String(errors.data[errorKey]).toLowerCase()}`, 
          errorKey
        );
        return (
          <div key={errorIndex}>
            {capitalize(errorMessage)}
          </div>
        );
      }
    )}
    {!errors.status && errors.message}
  </FormStatus>
);

export default ErrorFormStatus;