import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
	Epic, View, Panel, PanelHeader, Cell, Avatar, List, HeaderButton, Tabbar, TabbarItem, Group, Div, Button
} from '@vkontakte/vkui';

import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Document from '@vkontakte/icons/dist/28/document';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Mention from '@vkontakte/icons/dist/24/mention';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon28Write from '@vkontakte/icons/dist/28/write';

class MainTutor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      activeStory: 'profile_tutor',
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }
  

  // isTab
  

  
  onStoryChange (e) {
    this.setState({ activeStory: e.currentTarget.dataset.story })
  }

	render() {
		return (
      <Epic activeStory={this.state.activeStory} tabbar={
        <Tabbar>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'search'}
            data-story="search"
          ><Icon28Search /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'active'}
            data-story="active"
          ><Icon28Document /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'profile_tutor'}
            data-story="profile_tutor"
          ><Icon28User /></TabbarItem>
        </Tabbar>
      }>
        <View id="search" activePanel="search">
          <Panel id="search">
            <PanelHeader noShadow
            >
              Поиск репетиторов
            </PanelHeader>
            <Group>
              <Div>
                <Button size="xl" onClick={() => this.props.history.push('/filter')}>
                  Фильтр
                </Button>
              </Div>
            </Group>
          </Panel>
        </View>
       
        <View id="active" activePanel="active">
          <Panel id="search">
            <PanelHeader noShadow
            >
              Поиск репетиторов
            </PanelHeader>
            <Group>
              <Div>
                <Button size="xl" onClick={() => this.props.history.push('/filter')}>
                  Фильтр
                </Button>
              </Div>
            </Group>
          </Panel>
        </View>

        <View id="profile_tutor" activePanel="profile_tutor">
          <Panel id="profile_tutor">
            <PanelHeader 
              noShadow
              left={<HeaderButton><Icon28Write /></HeaderButton>}
              right={<HeaderButton><Icon28Write /></HeaderButton>}
            >
              Профиль
            </PanelHeader>
            <List>
              <Cell
                size="l"
                description="20 лет"
                before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
              >
                Артур Стамбульцян
              </Cell>
              <Cell
                before={<Icon24Recent />}
              >
                Стаж
                {/* From EditProfile */}
              </Cell>
              <Cell
                before={<Icon24Education />}
              >
                Образование
                {/* From EditProfile */}
              </Cell>
              <Cell
                before={<Icon24Home />}
              >
                Адрес
                {/* From EditProfile */}
              </Cell>
              <Cell
                before={<Icon24Mention />}
              >
                e-mail
                {/* From EditProfile */}
              </Cell>
              <Cell
                before={<Icon24Info />}
              >
                О себе
                {/* From EditProfile */}
              </Cell>
            </List>
          </Panel>
        </View>
      </Epic>
		);
	}
};

export default withRouter(MainTutor);