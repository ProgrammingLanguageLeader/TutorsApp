import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import moment from 'moment';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';

import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import DeleteConfirmationAlert from 'vk-apps-frontend/components/DeleteConfirmationAlert';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import BackIcon from 'vk-apps-frontend/components/BackIcon';

import { lessonsActions } from 'vk-apps-frontend/actions/api';

import { ROOT_URL } from 'vk-apps-frontend/constants';

import durationHumanizer from 'vk-apps-frontend/helpers/durationHumanizer';

const mapStateToProps = state => {
  const { lesson, fetching } = state.apiReducer.lessonsReducer;
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
    deleteLesson: bindActionCreators(lessonsActions.deleteLesson, dispatch),
  };
};

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.deleteLessonButtonClick = this.deleteLessonButtonClick.bind(this);
    this.state = {
      popout: null,
    };
  }

  componentDidMount() {
    if (this.props.currentUserReducer.user) {
      const { id } = this.props.match.params;
      this.props.getLesson(id);
    }
  }

  deleteLessonButtonClick(id) {
    const popout = (
      <DeleteConfirmationAlert
        label="Вы уверены, что хотите удалить урок?"
        onConfirm={async () => {
          await this.props.deleteLesson(id);
          this.props.history.goBack();
        }}
        onClose={() => this.setState({
          popout: null
        })}
      />
    );
    this.setState({
      popout: popout
    });
  }

  render() {
    const {
      fetching,
      lesson,
      currentUserReducer
    } = this.props;

    return (
      <View activePanel="panel" popout={this.state.popout}>
        <Panel id="panel">
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
                  <CellButton
                    level="danger"
                    before={<Icon24Cancel/>}
                    onClick={() => this.deleteLessonButtonClick(lesson.id)}
                  >
                    Удаление урока
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
                  {durationHumanizer(moment.duration(lesson.duration))}
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
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);