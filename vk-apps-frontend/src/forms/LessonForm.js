import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Slider from '@vkontakte/vkui/dist/components/Slider/Slider';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import TimePicker from 'vk-apps-frontend/components/TimePicker';
import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';
import ErrorMessageDiv from 'vk-apps-frontend/components/ErrorMessageDiv';

import durationHumanizer from 'vk-apps-frontend/helpers/durationHumanizer';

class LessonForm extends React.Component {
  static validate(values) {
    const errorsData = {};
    if (!values.student) {
      errorsData.student = 'Это поле обязательно';
    }
    if (!values.price) {
      errorsData.price = 'Это поле обязательно';
    } else if (!(1 <= Number(values.price) && Number(values.price) <= 10000)) {
      errorsData.price = 'Значение должно быть от 1 до 10000';
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
      students,
      setFieldValue,
      submitLabel,
      isValid,
    } = this.props;

    return (
      <FormLayout>
        { Object.keys(errors).length > 0 && (
          <ErrorFormStatus errors={errors} />
        )}

        { isSubmitting && (
          <DivSpinner/>
        )}

        <FormLayoutGroup top="Ученик">
          <Select
            name="student"
            value={values.student}
            placeholder="Выберите ученика"
            onChange={handleChange}
          >
            { students.map(student => (
              <option value={student.id} key={student.id}>
                {student.first_name} {student.last_name}
              </option>
            ))}
          </Select>
          {errors.data && errors.data["student"] && (
            <ErrorMessageDiv>{errors.data["student"]}</ErrorMessageDiv>
          )}
        </FormLayoutGroup>

        <FormLayoutGroup top="День занятия">
          <Div>
            <Datetime
              input={false}
              value={values.beginning_time}
              timeFormat={null}
              onChange={newMoment => {
                const beginningTimeDate = newMoment.startOf('day');
                const currentBeginningTime = values.beginning_time.clone();
                const beginningTimeOffset = moment.duration(
                  currentBeginningTime.diff(
                    currentBeginningTime
                      .clone()
                      .startOf('day')
                  )
                );
                const beginningTime = beginningTimeDate
                  .clone()
                  .add(beginningTimeOffset);
                setFieldValue("beginning_time", beginningTime);
              }}
              locale="ru"
              isValidDate={currentMoment => {
                const yesterdayMoment = moment().subtract(1, 'day');
                const nextMonthMoment = moment().add(1, 'month');
                return currentMoment.isAfter(yesterdayMoment) && currentMoment.isBefore(nextMonthMoment);
              }}
            />
          </Div>
        </FormLayoutGroup>

        <FormLayoutGroup top="Время начала">
          <Div>
            <TimePicker
              value={values.beginning_time}
              onChange={newMoment => setFieldValue("beginning_time", newMoment)}
            />
          </Div>
        </FormLayoutGroup>

        <FormLayoutGroup top={`Длительность - ${durationHumanizer(values.duration)}`}>
          <Slider
            min={0.5}
            max={4}
            step={0.25}
            value={values.duration.asHours()}
            onChange={durationHours => setFieldValue(
              "duration",
              moment.duration(durationHours * 60, 'minutes')
            )}
          />
          {errors.data && errors.data["duration"] && (
            <ErrorMessageDiv>{errors.data["duration"]}</ErrorMessageDiv>
          )}
        </FormLayoutGroup>

        <FormLayoutGroup top="Цена">
          <Input
            name="price"
            type="number"
            min="1"
            max="10000"
            inputMode="numeric"
            onChange={handleChange}
            value={String(values.price || "")}
          />
          {errors.data && errors.data["price"] && (
            <ErrorMessageDiv>{errors.data["price"]}</ErrorMessageDiv>
          )}
        </FormLayoutGroup>

        <Button size="xl" onClick={handleSubmit} disabled={!isValid}>
          {submitLabel || 'Отправить'}
        </Button>
      </FormLayout>
    );
  }
}

export default LessonForm;