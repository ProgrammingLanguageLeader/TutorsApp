import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Datetime from 'react-datetime';
import Moment from 'react-moment';
import moment from 'moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';
import List from '@vkontakte/vkui/dist/components/List/List';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import Icon24Add from '@vkontakte/icons/dist/24/add';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { lessonsActions } from 'vk-apps-frontend/actions/api';
import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLesson: bindActionCreators(lessonsActions.createLesson, dispatch),
    getLessonsList: bindActionCreators(lessonsActions.getLessonsList, dispatch),
  };
};

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      fetching: false,
      date: moment(),
    };
    this.getLessonsByDay = this.getLessonsByDay.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  async componentDidMount() {
    await this.getLessonsByDay();
  }

  async getLessonsByDay() {
    this.setState({
      fetching: true,
    });
    const { date } = this.state;
    const beginning_time__gte = date
      .clone()
      .startOf('day')
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");
    const beginning_time__lte = date
      .clone()
      .endOf('day')
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");
    const lessonsListResponse = await this.props.getLessonsList({
      beginning_time__gte,
      beginning_time__lte,
    });
    const lessons = lessonsListResponse.status === 200
      ? lessonsListResponse.data.results
      : [];
    this.setState({
      lessons,
      fetching: false,
    })
  }

  async handleDateChange(date) {
    await this.setState({ date });
    await this.getLessonsByDay();
  }

	render() {
    const { currentUser } = this.props;
    const { fetching, lessons } = this.state;

		return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Расписание
          </PanelHeader>

          <Group title="Календарь">
            <Div>
              <Datetime
                input={false}
                value={this.state.date}
                timeFormat={null}
                onChange={this.handleDateChange}
                locale="ru"
              />
            </Div>
          </Group>

          <Group title="Добавление занятия">
            <CellButton before={<Icon24Add />} onClick={() => this.props.history.push('/lesson/create')}>
              Добавить урок
            </CellButton>
          </Group>

          <Group title="Занятия в выбранный день">
            { fetching && (
              <DivSpinner />
            )}
            { lessons && (
              <List>
                { lessons.map(lesson => {
                  const visibleUser = (currentUser.user.id === lesson.tutor.id) ? lesson.student : lesson.tutor;
                  return (
                    <Cell
                      size="l"
                      expandable
                      multiline
                      description={
                        <div>
                          <Moment format="HH:mm - " date={lesson.beginning_time}/>
                          <Moment format="HH:mm" date={lesson.ending_time}/>
                          <div>{lesson.price} рублей за занятие</div>
                        </div>
                      }
                      before={<Avatar src={ROOT_URL + visibleUser.avatar} size={64}/>}
                      key={lesson.id}
                      onClick={() => this.props.history.push(`/lesson/${lesson.id}`)}
                    >
                      {visibleUser.first_name} {visibleUser.last_name}
                    </Cell>
                  );
                })}
                {lessons.length === 0 && <Div>Нет занятий</Div>}
              </List>
            )}
          </Group>
        </Panel>
      </View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);