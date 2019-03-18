import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';

import SmartBackButton from 'vk-apps-frontend/components/SmartBackButton';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';
import ShortUserCard from 'vk-apps-frontend/components/ShortUserCard';

import { tutorsActions } from 'vk-apps-frontend/actions/api';

const mapDispatchToProps = dispatch => {
  return {
    getTutorsList: bindActionCreators(tutorsActions.getTutorsList, dispatch),
  };
};

class Tutors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [],
      fetching: false,
    };
  }

  async componentDidMount() {
    this.setState({
      fetching: true,
    });
    const tutorsListResponse = await this.props.getTutorsList();
    const tutors = tutorsListResponse.status === 200
      ? tutorsListResponse.data.results
      : [];
    this.setState({
      tutors,
      fetching: false,
    })
  }

  render() {
    const { tutors, fetching } = this.state;

    return (
      <View id={this.props.id} activePanel={this.props.id}>
        <Panel id={this.props.id}>
          <PanelHeader left={
            <SmartBackButton history={this.props.history} />
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

export default connect(null, mapDispatchToProps)(Tutors);