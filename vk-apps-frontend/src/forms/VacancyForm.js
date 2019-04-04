import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea';

import { educationLevelList, subjectsList } from 'vk-apps-frontend/constants';

import ErrorFormStatus from 'vk-apps-frontend/components/ErrorFormStatus';

class VacancyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSubject: '',
      inputSubject: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dirty !== this.props.dirty) {
      this.props.setShouldBlockNavigation(this.props.dirty);
    }
  }

  componentDidMount() {
    this.setState({
      selectSubject: '',
      inputSubject: this.props.values.subject || '',
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { subject } = props.values;
    if (subject !== state.selectSubject) {
      return subjectsList.find(subjectItem => subject === subjectItem)
        ? {
          selectSubject: subject,
          inputSubject: '',
        }
        : {
          selectSubject: '',
          inputSubject: subject,
        }
    }
    return state;
  }

  static validate(values) {
    const errorsData = {};
    if (!values.subject) {
      errorsData.subject = 'Это поле обязательно';
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
      setFieldValue,
      submitLabel,
      isSubmitting
    } = this.props;
    const { selectSubject, inputSubject } = this.state;

    return (
      <FormLayout status="default">
        { Object.keys(errors).length > 0 && (
          <ErrorFormStatus errors={errors} />
        )}

        <Select
          top="Предмет"
          status={errors.data && errors.data.subject && "error"}
          bottom={errors.data && errors.data.subject}
          name="select_subject"
          value={selectSubject || ""}
          placeholder="Выберите предмет"
          onChange={event => {
            setFieldValue('subject', event.currentTarget.value);
            this.setState({
              selectSubject: event.currentTarget.value,
              inputSubject: '',
            });
          }}
        >
          { subjectsList.map(subject => (
            <option value={subject} key={subject}>
              {subject}
            </option>
          ))}
        </Select>

        <Input
          top="Если вашего предмета не оказалось в списке, введите его название вручную"
          status={errors.data && errors.data.subject && "error"}
          bottom={errors.data && errors.data.subject}
          name="input_subject"
          maxLength={128}
          type="text"
          placeholder="Введите название предмета"
          value={inputSubject || ""}
          onChange={event => {
            setFieldValue("subject", event.currentTarget.value);
            this.setState({
              selectSubject: '',
              inputSubject: event.currentTarget.value,
            });
          }}
        />

        <FormLayoutGroup top="Уровень обучения">
          { educationLevelList.map(level => (
            <Checkbox
              key={level.name}
              name={level.backendField}
              onChange={handleChange}
              checked={values[level.backendField] || false}
            >
              {level.name}
            </Checkbox>
          ))}
        </FormLayoutGroup>

        <FormLayoutGroup top="Выезд на дом">
          <Checkbox
            name="home_schooling"
            onChange={handleChange}
            checked={values.home_schooling || false}
          >
            Да
          </Checkbox>
        </FormLayoutGroup>

        <Input
          top="Плата за час обучения"
          status={errors.data && errors.data.price && "error"}
          bottom={errors.data && errors.data.price}
          name="price"
          type="number"
          min="1"
          max="10000"
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={handleChange}
          value={String(values.price || "")}
        />

        <Textarea
          top="Дополнительная информация"
          status={errors.data && errors.data.extra_info && "error"}
          bottom={errors.data && errors.data.extra_info}
          name="extra_info"
          maxLength={128}
          onChange={handleChange}
          value={values.extra_info || ""}
        />

        <Button size="xl" onClick={handleSubmit} disabled={isSubmitting}>
          {submitLabel || "Отправить"}
        </Button>
      </FormLayout>
    );
  }
}

export default VacancyForm;