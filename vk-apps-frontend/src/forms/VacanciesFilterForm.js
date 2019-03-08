import React from 'react';
import styled from 'styled-components';

import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import RangeSlider from '@vkontakte/vkui/dist/components/RangeSlider/RangeSlider';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';

import { subjectsList, educationLevelList } from 'vk-apps-frontend/constants';

const DangerButton = styled(Button)`
  background: #dc3545 !important;
`;

class VacanciesFilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSubject: '',
      inputSubject: '',
    };
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectSubject: '',
      inputSubject: this.props.values.subject,
    });
  }

  resetState() {
    this.setState({
      selectSubject: '',
      inputSubject: '',
    });
  }

  render() {
    const {
      values,
      handleChange,
      handleSubmit,
      handleReset,
      setFieldValue,
      setValues,
    } = this.props;

    return (
      <FormLayout>
        <FormLayoutGroup top="Предмет">
          <Select
            name="select_subject"
            top="Предмет"
            placeholder="Любой"
            value={this.state.selectSubject}
            onChange={event => {
              setFieldValue("subject", event.currentTarget.value);
              this.setState({
                selectSubject: event.currentTarget.value,
                inputSubject: ''
              });
            }}
          >
            {subjectsList.map(subject => (
              <option value={subject} key={subject}>{subject}</option>
            ))}
          </Select>
        </FormLayoutGroup>

        <FormLayoutGroup top="Если вашего предмета не оказалось в списке, введите его название вручную">
          <Input
            name="input_subject"
            maxLength={64}
            placeholder="Введите название предмета"
            value={this.state.inputSubject}
            onChange={event => {
              setFieldValue("subject", event.currentTarget.value);
              this.setState({
                selectSubject: '',
                inputSubject: event.currentTarget.value,
              });
            }}
          />
        </FormLayoutGroup>

        <FormLayoutGroup top={`Цена - (от ${values.price__gte} до ${values.price__lte} рублей/час)`}>
          <RangeSlider
            min={0}
            max={10000}
            step={100}
            value={[values.price__gte, values.price__lte]}
            onChange={([price_min, price_max]) => {
              setFieldValue('price__gte', price_min);
              setFieldValue('price__lte', price_max);
            }}
          />
        </FormLayoutGroup>

        <FormLayoutGroup top="Город">
          <Input
            name="city"
            placeholder="Любой"
            maxLength={64}
            onChange={handleChange}
            value={values.city}
          />
        </FormLayoutGroup>

        <FormLayoutGroup top="Район">
          <Input
            name="district"
            placeholder="Любой"
            maxLength={64}
            onChange={handleChange}
            value={values.district}
          />
        </FormLayoutGroup>

        <FormLayoutGroup top="Станция метро">
          <Input
            name="metro_station"
            placeholder="Любая"
            maxLength={64}
            onChange={handleChange}
            value={values.metro_station}
          />
        </FormLayoutGroup>

        <FormLayoutGroup top="Уровень обучения">
          {educationLevelList.map(level => (
            <Checkbox
              key={level.backendField}
              name={level.backendField}
              onChange={handleChange}
              checked={values[level.backendField] || false}
            >
              {level.name}
            </Checkbox>
          ))}
        </FormLayoutGroup>

        <FormLayoutGroup>
          <Button size="xl" onClick={handleSubmit}>
            Применить
          </Button>
          <DangerButton size="xl" onClick={() => {
            handleReset(values, { setValues });
            this.resetState();
          }}>
            Очистить
          </DangerButton>
        </FormLayoutGroup>
      </FormLayout>
    );
  }
}

export default VacanciesFilterForm;