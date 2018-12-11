import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, Group, Div, HeaderButton, CellButton
} from '@vkontakte/vkui';

import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24Add from '@vkontakte/icons/dist/24/add';

import Calendar from 'rc-calendar';
import moment from 'moment';
import 'rc-calendar/assets/index.css';

import Moment from 'react-moment';
import russianLocale from 'rc-calendar/lib/locale/ru_RU';

import DivSpinner from '../components/DivSpinner';

import { apiLessonActions, vkApiActions, locationActions } from '../actions';

const mapStateToProps = state => {
  const apiLessonFetching = state.apiLessonReducer.fetching;
  const vkAppsFetching = state.vkAppsReducer.fetching;
  const vkApiFetching = state.vkApiReducer.fetching;
  const { lessons } = state.apiLessonReducer;
  const { vkUserInfo, accessToken } = state.vkAppsReducer;
  const { vkUsersInfo } = state.vkApiReducer;
  const { activePanel } = state.locationReducer;
  return {
    vkUserInfo, activePanel, vkUsersInfo, lessons,
    apiLessonFetching, vkAppsFetching, vkApiFetching, accessToken,
  };
};

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment()
    };

    this.onCalendarChange = this.onCalendarChange.bind(this);
    this.fetchLessons = this.fetchLessons.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      vkApiActions.stopFetching()
    );
    this.fetchLessons();
  }

  onCalendarChange(date) {
    this.setState({
      date
    });
  }

  fetchLessons() {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.dispatch(
      apiLessonActions.getLessons({
        user_id: id,
        signed_user_id: signed_user_id,
      })
    )
      .then(() => {
        const { accessToken, lessons } = this.props;
        const studentsId = lessons.map(lesson => {
          return lesson.student_id;
        });
        this.props.dispatch(
          vkApiActions.fetchUsersInfo(accessToken, studentsId)
        );
      })
  }

	render() {
    const { lessons, vkUsersInfo, apiLessonFetching, vkAppsFetching, vkApiFetching } = this.props;
    const fetching = apiLessonFetching || vkAppsFetching || vkApiFetching;

		return (
			<View id={this.props.id} activePanel="schedule">
				<Panel id="schedule">
					<PanelHeader
            left={
              <HeaderButton onClick={() => this.props.dispatch(
                locationActions.goBack()
              )}>
                <Icon24Back />
              </HeaderButton>
            }
          >
						Расписание
					</PanelHeader>
          <Group title="Календарь">
            <Div style={{ textAlign: "center" }}>
              <Calendar
                style={{ display: "inline-block" }}
                value={this.state.date}
                onChange={this.onCalendarChange}
                locale={russianLocale}
              />
            </Div>
          </Group>
          <Group title="Занятия в выбранный день">
            { fetching
              ? <DivSpinner />
              : (
                <div>
                  <CellButton before={<Icon24Add />}>
                    Добавить урок
                  </CellButton>
                  {
                    lessons
                      .filter(lesson => vkUsersInfo[lesson.student.profile_id])
                      .map(lesson => {
                        const studentVkInfo = vkUsersInfo[lesson.student.profile_id];
                        const { student, lesson_id } = lesson;
                        return (
                          <Cell
                            size="l"
                            multiline
                            description={`${lesson.price} рублей за занятие`}
                            before={<Avatar src={studentVkInfo.photo_200} />}
                            key={lesson_id}
                            asideContent={
                              <div>
                                <Moment format="HH:mm - " date={lesson.beginning_time}/>
                                <Moment format="HH:mm" date={lesson.ending_time}/>
                              </div>
                            }
                          >
                            {studentVkInfo.firstName} {studentVkInfo.lastName}
                          </Cell>
                        )
                      })
                  }
                </div>
              )
            }
          </Group>
        </Panel>
      </View>
		);
	}
}

export default connect(mapStateToProps)(Schedule);
