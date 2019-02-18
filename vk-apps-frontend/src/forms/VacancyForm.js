import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Select from '@vkontakte/vkui/dist/components/Select/Select';

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

  componentDidMount() {
    this.setState({
      selectSubject: '',
      inputSubject: this.props.values.subject || '',
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.values.subject !== state.selectSubject) {
      return {
        selectSubject: '',
        inputSubject: props.values.subject,
      };
    }
    return state;
  }

  render() {
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
      setFieldValue,
      submitLabel,
    } = this.props;
    const { selectSubject, inputSubject } = this.state;

    return (
      <FormLayout>
        { Object.keys(errors).length > 0 && (
          <ErrorFormStatus errors={errors} />
        )}

        <FormLayoutGroup top="Предмет">
          <Select
            name="select_subject"
            value={selectSubject}
            placeholder="Выберите предмет"
            onChange={event => {
              setFieldValue("subject", event.currentTarget.value);
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
        </FormLayoutGroup>

        <FormLayoutGroup top="Если вашего предмета не оказалось в списке, введите его название вручную">
          <Input
            name="input_subject"
            type="text"
            placeholder="Введите название предмета"
            value={inputSubject}
            onChange={event => {
              setFieldValue("subject", event.currentTarget.value);
              this.setState({
                selectSubject: '',
                inputSubject: event.currentTarget.value,
              });
            }}
          />
        </FormLayoutGroup>

        <FormLayoutGroup top="Уровень обучения">
          { educationLevelList.map(level => (
            <Checkbox
              key={level.name}
              name={level.backendField}
              onChange={handleChange}
              checked={values[level.backendField]}
            >
              {level.name}
            </Checkbox>
          ))}
        </FormLayoutGroup>

        <FormLayoutGroup top="Выезд на дом">
          <Radio value="yes" name="home_schooling" onChange={handleChange} checked={values.home_schooling}>
            Да
          </Radio>
          <Radio value="no" name="home_schooling" onChange={handleChange} checked={!values.home_schooling}>
            Нет
          </Radio>
        </FormLayoutGroup>

        <FormLayoutGroup top="Плата за час обучения">
          <Input name="price" type="number" onChange={handleChange} value={String(values.price || '')} />
        </FormLayoutGroup>

        <FormLayoutGroup top="Дополнительная информация">
          <Input name="extra_info" onChange={handleChange} value={values.extra_info} />
        </FormLayoutGroup>

        <Button size="xl" onClick={handleSubmit}>
          {submitLabel || "Отправить"}
        </Button>
      </FormLayout>
    );
  }
}

export default VacancyForm;