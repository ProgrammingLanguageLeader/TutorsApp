import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
	Epic, View, Panel, PanelHeader, Cell, Avatar, List, InfoRow, Tabbar, TabbarItem, Group, Div, Button
} from '@vkontakte/vkui';

import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Document from '@vkontakte/icons/dist/28/document';
import Icon28User from '@vkontakte/icons/dist/28/user';

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
        <div style={{width: "0px", height: "0px"}}></div>
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
       
        <View id="active" activePanel="search">
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
            <PanelHeader noShadow>
              Профиль
            </PanelHeader>
            <List>
              <Cell
                size="l"
                description="Школьный учитель, Возраст: 20"
                before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
              >
                Артур Стамбульцян
              </Cell>
              <Cell>
                <InfoRow title="Стаж">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="Образование">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="Адрес">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="e-mail">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="О себе">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell
                size="l"
                description="Школьный учитель, Возраст: 20"
                before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
              >
                Артур Стамбульцян
              </Cell>
              <Cell>
                <InfoRow title="Стаж">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="Образование">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="Адрес">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="e-mail">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="О себе">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell
                size="l"
                description="Школьный учитель, Возраст: 20"
                before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
              >
                Артур Стамбульцян
              </Cell>
              <Cell>
                <InfoRow title="Стаж">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="Образование">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="Адрес">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="e-mail">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="О себе">
                  {/* From EditProfile */}
                </InfoRow>
              </Cell>
            </List>
          </Panel>
        </View>
      </Epic>
		);
	}
};

export default withRouter(MainTutor);
