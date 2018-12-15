import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, HeaderButton, Cell, Button, Input, FormLayout, Radio, List,
  Checkbox, SelectMimicry, Group, FormLayoutGroup, ScreenSpinner, PopoutWrapper, FormStatus
} from '@vkontakte/vkui';

import Icon36Done from "@vkontakte/icons/dist/36/done";
import Icon36Cancel from "@vkontakte/icons/dist/36/cancel";

import BackIcon from '../components/BackIcon';
import PopoutDiv from "../components/PopoutDiv";

import { subjectsList, educationLevelList } from '../constants';
import { locationActions, apiVacancyActions } from '../actions';
import SubjectCell from "../components/SubjectCell";

const mapStateToProps = (state) => {
  const { activePanel } = state.locationReducer;
  const { vkUserInfo } = state.vkAppsUserReducer;
  const apiVacancyErrors = state.apiVacancyReducer.errors;
  return {
    vkUserInfo, apiVacancyErrors, activePanel,
  };
};

class CreateVacancy extends React.Component {
  constructor(props) {
    super(props);
    const backendFieldsWithNulls = educationLevelList.reduce((object, level) => {
      return { ...object, [level.backendField]: null }
    }, {});
    this.state = {
      popout: null,
      home_schooling: null,
      price: null,
      ...backendFieldsWithNulls
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

    const { id, signed_user_id } = this.props.vkUserInfo;
    this.setState({
      popout: <ScreenSpinner/>
    });
    this.props.dispatch(
      apiVacancyActions.createVacancy({
        user_id: id,
        signed_user_id: signed_user_id,
        ...this.state
      })
    )
      .then(() => {
        const { apiVacancyErrors } = this.props;
        this.setState({
          popout: !apiVacancyErrors
            ? (
              <PopoutWrapper>
                <PopoutDiv>
                  <Icon36Done/>
                </PopoutDiv>
              </PopoutWrapper>
            )
            : (
              <PopoutWrapper>
                <PopoutDiv>
                  <Icon36Cancel/>
                </PopoutDiv>
              </PopoutWrapper>
            )
        })
      })
      .then(setTimeout(() => {
        this.setState({
          popout: null
        })
      },1500))
  }

  render() {
    const { activePanel, apiVacancyErrors } = this.props;

    return (
      <View id={this.props.id} activePanel={activePanel || "create_vacancy"} popout={this.state.popout}>
        <Panel id="create_vacancy">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Создание вакансии
          </PanelHeader>
          <Group title="Заполняемые поля">
            <FormLayout>
              {
                apiVacancyErrors
                ? (
                  <FormStatus title="Некорректные данные" state="error">
                    Проверьте заполненность всех полех и их содержимое
                  </FormStatus>
                )
                : null
              }
              <FormLayoutGroup top="Предмет">
                <SelectMimicry
                  onClick={() => this.props.dispatch(
                    locationActions.changeLocation(this.props.id, "select_subject")
                  )}
                >
                  {this.state.subject}
                </SelectMimicry>
              </FormLayoutGroup>
              <FormLayoutGroup top="Уровень обучения">
                {
                  educationLevelList.map(level => (
                    <Checkbox key={level.name} name={level.backendField} onChange={this.handleChange}>
                      {level.name}
                    </Checkbox>
                  ))
                }
              </FormLayoutGroup>
              <FormLayoutGroup top="Выезд на дом">
                <Radio value="yes" name="home_schooling" onChange={this.handleChange}>
                  Да
                </Radio>
                <Radio value="no" name="home_schooling" onChange={this.handleChange}>
                  Нет
                </Radio>
              </FormLayoutGroup>
              <FormLayoutGroup top="Плата за час обучения">
                <Input name="price" type="number" onChange={this.handleChange} />
              </FormLayoutGroup>
              <Button size="xl" onClick={this.createVacancy}>
                Разместить
              </Button>
            </FormLayout>
          </Group>
        </Panel>

        <Panel id="select_subject">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Предмет
          </PanelHeader>
          <Group title="Список предметов">
            <List>
              {
                subjectsList.map(subject => (
                  <SubjectCell
                    subject={subject}
                    selected={this.state.subject === subject}
                    key={subject}
                    onClick={() => {
                      this.setState({subject: subject});
                      this.props.dispatch(locationActions.goBack());
                    }}
                  />
                ))
              }
            </List>
          </Group>
          <Group title="Ручной ввод">
            <Cell
              multiline
              description="Если вашего предмета не оказалось в списке, введите его название вручную"
            >
              <Input name="subject" type="text" placeholder="Название предмета" onChange={this.handleChange} />
            </Cell>
            <Cell>
              <Button
                size="xl"
                onClick={() => this.props.dispatch(locationActions.goBack())}
              >
                Принять
              </Button>
            </Cell>
          </Group>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(CreateVacancy);
