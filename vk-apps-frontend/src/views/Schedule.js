import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Moment from 'react-moment';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';
import List from '@vkontakte/vkui/dist/components/List/List';

import Icon24Add from '@vkontakte/icons/dist/24/add';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { lessonsActions } from 'vk-apps-frontend/actions/api';
import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { fetching, lessons } = state.apiReducer.lessonsReducer;
  return {
    lessons, fetching,
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
      date: moment(),
    };
    this.getLessonsByDay = this.getLessonsByDay.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.getLessonsByDay();
  }

  getLessonsByDay() {
    const { date } = this.state;
    const beginning_time__gte = date.startOf('day').format("YYYY-MM-DD HH:mm:ss");
    const beginning_time__lte = date.endOf('day').format("YYYY-MM-DD HH:mm:ss");
    this.props.getLessonsList({
      beginning_time__gte,
      beginning_time__lte,
    });
  }

  async handleDateChange(date) {
    await this.setState({ date });
    await this.getLessonsByDay();
  }

	render() {
    const { fetching, lessons } = this.props;

		return (
		  <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Расписание
        </PanelHeader>

        <Group title="Календарь" style={{ paddingBottom: "10px" }}>
          <DayPickerSingleDateController
            numberOfMonths={1}
            date={this.state.date}
            onDateChange={this.handleDateChange}
            onFocusChange={() => true}
            hideKeyboardShortcutsPanel={true}
          />
        </Group>

        <Group title="Добавление занятия">
          <CellButton before={<Icon24Add />} onClick={() => this.props.history.push('/lesson_create')}>
            Добавить урок
          </CellButton>
        </Group>

        <Group title="Занятия в выбранный день">
          { fetching && (
            <DivSpinner />
          )}
          { lessons && (
            <List>
              { lessons.map(lesson => (
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
                  before={<Avatar src={ROOT_URL + lesson.student.avatar} size={64} />}
                  key={lesson.id}
                  onClick={() => this.props.history.push(`/lesson/${lesson.id}`)}
                >
                  {lesson.student.first_name} {lesson.student.last_name}
                </Cell>
              ))}
            </List>
          )}
        </Group>
      </div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);