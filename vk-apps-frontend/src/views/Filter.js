import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, List, Group, FormLayout,
  Button, SelectMimicry, HeaderButton, RangeSlider, Input, FormLayoutGroup, Radio
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';
import FlexDiv from '../components/FlexDiv';

import { locationActions, filterActions } from '../actions';
import { educationLevelList, subjectsList } from "../constants";
import SubjectCell from "../components/SubjectCell";

const mapStateToProps = state => {
  const { filterReducer } = state;
  const { activePanel } = state.locationReducer;
  return {
    filterReducer, activePanel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLocation: bindActionCreators(locationActions.changeLocation, dispatch),
    goBack: bindActionCreators(locationActions.goBack, dispatch),
    deleteFilter: bindActionCreators(filterActions.deleteFilter, dispatch),
    updateFilter: bindActionCreators(filterActions.updateFilter, dispatch),
  }
};

class Filter extends React.Component {
  constructor(props) {
    super(props);
    const backendFieldsWithNulls = educationLevelList.reduce((object, level) => {
      return { ...object, [level.backendField]: null }
    }, {});
    this.state = {
      subject: null,
      price_min: 0,
      price_max: 10000,
      city: null,
      district: null,
      metro_station: null,
      ...backendFieldsWithNulls,
    };

    this.handleChange = this.handleChange.bind(this);
    this.applyButtonClick = this.applyButtonClick.bind(this);
    this.deleteButtonClick = this.deleteButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.filterReducer !== nextProps.filterReducer) {
      this.setState({...nextProps.filterReducer});
    }
  }

  componentDidMount() {
    this.setState({...this.props.filterReducer});
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;
    if (target.type === 'radio') {
      const backendFields = educationLevelList.reduce((object, level) => {
        return { ...object, [level.backendField]: null }
      }, {});
      backendFields[name] = true;
      this.setState({...backendFields});
      return;
    }

    this.setState({
      [name]: value
    });
  }

  applyButtonClick() {
    this.props.updateFilter(this.state);
    this.props.changeLocation('search_vacancies');
  }

  deleteButtonClick() {
    this.props.deleteFilter();
  }

  render() {
    return (
      <View id={this.props.id} activePanel={this.props.activePanel || "filter"}>
        <Panel id="filter">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.goBack()}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Фильтр
          </PanelHeader>
          <Group title="Поля фильтра">
            <FormLayout>
              <FormLayoutGroup top="Предмет">
                <SelectMimicry
                  top="Предмет"
                  placeholder="Любой"
                  onClick={() => this.props.changeLocation('filter', 'subjects')}
                >
                  {this.state.subject}
                </SelectMimicry>
              </FormLayoutGroup>

              <FormLayoutGroup top={`Цена - (от ${this.state.price_min} до ${this.state.price_max} рублей/час)`}>
                <RangeSlider
                  min={0}
                  max={10000}
                  step={100}
                  value={[this.state.price_min, this.state.price_max]}
                  onChange={([price_min, price_max]) => this.setState({
                    price_min: price_min, price_max: price_max
                  })}
                />
              </FormLayoutGroup>

              <FormLayoutGroup top="Город">
                <Input
                  name="city"
                  placeholder="Любой"
                  onChange={this.handleChange}
                  value={this.state.city || ''}
                />
              </FormLayoutGroup>

              <FormLayoutGroup top="Район">
                <Input
                  name="district"
                  placeholder="Любой"
                  onChange={this.handleChange}
                  value={this.state.district || ''}
                />
              </FormLayoutGroup>

              <FormLayoutGroup top="Станция метро">
                <Input
                  name="metro_station"
                  placeholder="Не имеет значения"
                  onChange={this.handleChange}
                  value={this.state.metro_station || ''}
                />
              </FormLayoutGroup>

              <FormLayoutGroup top="Уровень обучения">
                <div>
                {
                  educationLevelList.map(level => (
                    <Radio
                      key={level.backendField}
                      name={level.backendField}
                      checked={this.state[level.backendField] === true}
                      onChange={this.handleChange}
                    >
                      {level.name}
                    </Radio>
                  ))
                }
                </div>
              </FormLayoutGroup>

              <FlexDiv>
                <Button
                  size="xl"
                  style={{
                    marginLeft: 4,
                    marginRight: 4
                  }}
                  onClick={this.applyButtonClick}
                >
                  Применить
                </Button>
                <Button
                  size="xl"
                  style={{
                    marginLeft: 4,
                    marginRight: 4,
                    background: "#E64646"
                  }}
                  onClick={this.deleteButtonClick}
                >
                  Очистить
                </Button>
              </FlexDiv>
            </FormLayout>
          </Group>
        </Panel>

        <Panel id="subjects">
          <PanelHeader
            left={
              <HeaderButton onClick={() => this.props.goBack()}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Выбор предмета
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
                      this.props.goBack();
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
              <Input
                name="subject"
                type="text"
                placeholder="Название предмета"
                onChange={this.handleChange}
              />
            </Cell>
            <Cell>
              <Button
                size="xl"
                onClick={() => {
                  this.props.goBack();
                }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
