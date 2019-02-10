import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24Write from '@vkontakte/icons/dist/24/write';

import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { lessonsActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

const mapStateToProps = state => {
  const { fetching } = state.apiReducer.lessonsReducer;
  const { lesson } = state.apiReducer.lessonsReducer;
  const { currentUserReducer } = state;
  return {
    lesson,
    fetching,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLesson: bindActionCreators(lessonsActions.getLesson, dispatch),
  };
};

class Lesson extends React.Component {
  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.match.params;
      this.props.getLesson(id);
    }
  }

  render() {
    const {
      fetching,
      lesson,
      currentUserReducer
    } = this.props;

    return (
      <div>
        <PanelHeader left={
          <HeaderButton onClick={this.props.history.goBack}>
            <BackIcon />
          </HeaderButton>
        }>
          Урок
        </PanelHeader>

        {fetching && (
          <DivSpinner />
        )}

        {lesson && (
          <div>
            {lesson.tutor.id === currentUserReducer.user.id && (
              <Group>
                <CellButton
                  before={<Icon24Write/>}
                  onClick={() => this.props.history.push(`/lesson_edit/${lesson.id}`)}
                >
                  Редактирование урока
                </CellButton>
              </Group>
            )}

            <Group title="Учитель">
              <Cell
                expandable
                before={<Avatar src={ROOT_URL + lesson.tutor.avatar} size={64} />}
                onClick={() => this.props.history.push(`/user/${lesson.tutor.id}`)}
              >
                <div>
                  {lesson.tutor.first_name} {lesson.tutor.last_name}
                </div>
              </Cell>
            </Group>

            <Group title="Ученик">
              <Cell
                expandable
                before={<Avatar src={ROOT_URL + lesson.student.avatar} size={64} />}
                onClick={() => this.props.history.push(`/user/${lesson.student.id}`)}
              >
                <div>
                  {lesson.student.first_name} {lesson.student.last_name}
                </div>
              </Cell>
            </Group>

            <Group title="Информация об уроке">
              <Cell multiline description="Дата">
                <Moment locale="ru" format="D MMMM YYYY">
                  {lesson.beginning_time}
                </Moment>
              </Cell>

              <Cell multiline description="Время начала">
                <Moment locale="ru" format="HH:mm">
                  {lesson.beginning_time}
                </Moment>
              </Cell>

              <Cell multiline description="Длительность">
                <Moment locale="ru" format="HH:mm" parse="HH:mm:ss">
                  {lesson.duration}
                </Moment>
              </Cell>

              <Cell multiline description="Стоимость">
                {lesson.price}
              </Cell>

              <Cell multiline description="Время создания">
                <Moment locale="ru" format="D MMMM YYYY - HH:mm">
                  {lesson.creation_time}
                </Moment>
              </Cell>

              <Cell multiline description="Время изменения">
                <Moment locale="ru" format="D MMMM YYYY - HH:mm">
                  {lesson.modification_time}
                </Moment>
              </Cell>
            </Group>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);