import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, HeaderButton, Cell, Button, Input, FormLayout, Radio, List,
  Checkbox, SelectMimicry, Group, colors, FormLayoutGroup, Alert
} from '@vkontakte/vkui';

import Main from '../components/Main';
import BackIcon from '../components/BackIcon';

import Icon24Done from '@vkontakte/icons/dist/24/done';

import { locationActions } from '../actions/location';
import { apiActions } from '../actions/api';

class CreateVacancy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      studyLevel: '',
      primary_school: null,
      secondary_school: null,
      olympiads: null,
      ege: null,
      oge: null,
      university: null,
      home_schooling: null,
      price: null,

      activePanel: 'create_vacancy',
      popout: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.createVacancy = this.createVacancy.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createVacancy(event) {
    event.preventDefault();

    this.props.dispatch(
      apiActions.createVacancy(this.state)
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.vacancyCreated);
    if (nextProps.vacancyCreated) {
      this.setState({
        popout: (
          <Alert 
            actions={[{
              title: 'Close',
              autoclose: true,
              style: 'destructive'
            }]}
            onClose={() => this.props.dispatch(locationActions.changeLocation('active_tutor', 'requests'))}
          >
            <h2>Сообщение</h2>
            <p>Вакансия успешно создана</p>
          </Alert>
        ),
        fetching: false,
      });
    }
    else if (nextProps.vacancyCreated !== null) {
      this.setState({
        popout: (
          <Alert 
            actions={[{
              title: 'Close',
              autoclose: true,
              style: 'destructive'
            }]}
            onClose={() => this.setState({ popout: null })}
          >
            <h2>Ошибка</h2>
            <p>Проверьте правильность ввода</p>
          </Alert>
        ),
        fetching: false,
      });
    }
  }

  render() {
    return (
      <View popout={this.state.popout} id={this.props.id} activePanel={this.state.activePanel}>
        <Panel id="create_vacancy" theme="white">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Cоздание вакансии
          </PanelHeader>
          <Main>
            <FormLayout>
              <FormLayoutGroup top="Предмет">
                <SelectMimicry onClick={() => this.setState({ activePanel: 'subject' })}>
                  {this.state.subject}
                </SelectMimicry>
              </FormLayoutGroup>
              <FormLayoutGroup top="Уровень обучения">
                <Checkbox name="primary_school" onChange={this.handleChange}>Начальная школа</Checkbox>
                <Checkbox name="secondary_school" onChange={this.handleChange}>Средняя школа</Checkbox>
                <Checkbox name="olympiads" onChange={this.handleChange}>Олимпиады</Checkbox>
                <Checkbox name="ege" onChange={this.handleChange}>Подготовка к ОГЭ</Checkbox>
                <Checkbox name="oge" onChange={this.handleChange}>Подготовка к ЕГЭ</Checkbox>
                <Checkbox name="university" onChange={this.handleChange}>Курс высшего образования</Checkbox>
              </FormLayoutGroup>
              <FormLayoutGroup top="Выезд на дом">
                <Radio value={true} name="home_schooling" onChange={this.handleChange}>Да</Radio>
                <Radio value={false} name="home_schooling" onChange={this.handleChange}>Нет</Radio>
              </FormLayoutGroup>
              <FormLayoutGroup top="Плата за час обучения">
                <Input name="price" type="number" onChange={this.handleChange} />
              </FormLayoutGroup>
              <Button size="xl" onClick={this.createVacancy}>
                Разместить
              </Button>
            </FormLayout>
          </Main>
        </Panel>

        <Panel id="subject">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.setState({ activePanel: 'create_vacancy' })}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Предмет
          </PanelHeader>
          <Main>
            <Group>
              <List>
                <Cell
                  onClick={() => this.setState({ subject: 'Математика', activePanel: 'create_vacancy' })}
                  asideContent={this.state.subject === 'Математика' ? <Icon24Done fill={colors.blue_300} /> : null}
                >
                  Математика
                </Cell>
                <Cell
                  onClick={() => this.setState({ subject: 'Физика', activePanel: 'create_vacancy' })}
                  asideContent={this.state.subject === 'Физика' ? <Icon24Done fill={colors.blue_300} /> : null}
                >
                  Физика
                </Cell>
                <Cell
                  onClick={() => this.setState({ subject: 'Русский язык', activePanel: 'create_vacancy' })}
                  asideContent={this.state.subject === 'Русский язык' ? <Icon24Done fill={colors.blue_300} /> : null}
                  >
                  Русский язык
                </Cell>
                <Cell
                  onClick={() => this.setState({ subject: 'Английский язык', activePanel: 'create_vacancy' })}
                  asideContent={this.state.subject === 'Английский язык' ? <Icon24Done fill={colors.blue_300} /> : null}
                >
                  Английский язык
                </Cell>
              </List>
            </Group>
          </Main>
        </Panel>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { userInfo } = state.vkReducer;
  const { vacancyCreated } = state.apiReducer;
  return {
    userInfo, vacancyCreated, 
  };
}

export default connect(mapStateToProps)(CreateVacancy);
