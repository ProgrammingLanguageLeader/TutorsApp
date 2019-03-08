import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ShortUserCard from 'vk-apps-frontend/components/ShortUserCard';

import { tutorsActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { tutors, fetching } = state.apiReducer.tutorsReducer;
  const { currentUserReducer } = state;
  return {
    tutors,
    fetching,
    currentUserReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTutorsList: bindActionCreators(tutorsActions.getTutorsList, dispatch),
  };
};

class Tutors extends React.Component {
  componentDidMount() {
    this.props.getTutorsList();
  }

  render() {
    const { tutors, fetching } = this.props;

    return (
      <View activePanel="panel">
        <Panel id="panel">
          <PanelHeader left={
            <HeaderButton onClick={this.props.history.goBack}>
              <BackIcon />
            </HeaderButton>
          }>
            Список учителей
          </PanelHeader>

          {fetching && (
            <DivSpinner />
          )}

          {tutors.map(tutor => (
            <ShortUserCard history={this.props.history} key={tutor.id} user={tutor} />
          ))}
          <Footer>
            Показано пользователей: {tutors.length}
          </Footer>
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutors);