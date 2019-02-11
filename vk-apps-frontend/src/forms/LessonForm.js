import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import Slider from '@vkontakte/vkui/dist/components/Slider/Slider';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import TimePicker from 'vk-apps-frontend/components/TimePicker';
import SuccessfulFormStatus from 'vk-apps-frontend/components/SuccessfulFormStatus';

import durationHumanizer from 'vk-apps-frontend/helpers/durationHumanizer';

class LessonForm extends React.Component {
  render() {
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
      isSubmitting,
      isSuccessful,
      students,
      setFieldValue,
      submitLabel,
    } = this.props;

    return (
      <FormLayout>
        { Object.keys(errors).length > 0 && (
          <FormStatus title="Ошибка" state="error">
            Проверьте заполненные поля: {JSON.stringify(errors)}
          </FormStatus>
        )}

        { isSubmitting && (
          <DivSpinner/>
        )}

        { isSuccessful && (
          <Div>
            <SuccessfulFormStatus title="Успешно" />
          </Div>
        )}

        <FormLayoutGroup top="Выбор ученика">
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
        </FormLayoutGroup>

        <FormLayoutGroup top="День занятия">
          <Div>
            <Datetime
              input={false}
              value={values.beginning_time}
              timeFormat={null}
              onChange={newMoment => setFieldValue("beginning_time", newMoment)}
              locale="ru"
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
        </FormLayoutGroup>

        <FormLayoutGroup top="Сумма к оплате">
          <Input
            name="price"
            type="number"
            onChange={handleChange}
            value={String(values.price)}
          />
        </FormLayoutGroup>

        <Button size="xl" onClick={handleSubmit}>
          {submitLabel || 'Отправить'}
        </Button>
      </FormLayout>
    );
  }
}

export default LessonForm;