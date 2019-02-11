import React from 'react';

import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';

import { educationLevelList, subjectsList } from 'vk-apps-frontend/constants';

class VacancyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSubject: '',
      inputSubject: '',
    };
  }

  render() {
    const {
      errors,
      handleChange,
      handleSubmit,
      setFieldValue
    } = this.props;
    const { selectSubject, inputSubject } = this.state;

    return (
      <FormLayout>
        { Object.keys(errors).length > 0 && (
          <FormStatus title="Ошибка" state="error">
            Проверьте заполненные поля: {JSON.stringify(errors)}
          </FormStatus>
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
            <Checkbox key={level.name} name={level.backendField} onChange={handleChange}>
              {level.name}
            </Checkbox>
          ))}
        </FormLayoutGroup>

        <FormLayoutGroup top="Выезд на дом">
          <Radio value="yes" name="home_schooling" onChange={handleChange}>
            Да
          </Radio>
          <Radio value="no" name="home_schooling" onChange={handleChange}>
            Нет
          </Radio>
        </FormLayoutGroup>

        <FormLayoutGroup top="Плата за час обучения">
          <Input name="price" type="number" onChange={handleChange} />
        </FormLayoutGroup>

        <Button size="xl" onClick={handleSubmit}>
          Разместить
        </Button>
      </FormLayout>
    );
  }
}

export default VacancyForm;