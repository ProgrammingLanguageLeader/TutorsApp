import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
	Epic, View, Panel, PanelHeader, HeaderButton, Cell, Avatar, List, InfoRow, Tabbar, TabbarItem, Group, Div, Button
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Document from '@vkontakte/icons/dist/28/document';
import Icon28User from '@vkontakte/icons/dist/28/user';

class MainTutor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      activeStory: 'user',
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }
  
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
            selected={this.state.activeStory === 'document'}
            data-story="document"
          ><Icon28Document /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'user'}
            data-story="user"
          ><Icon28User /></TabbarItem>
        </Tabbar>
      }>
        <View id="user" activePanel="user">                {/* View of Tutor profile */}
          <Panel id="user">
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
            </List>
          </Panel>
        </View>

        <View id="search" activePanel="search">                    {/* View of Search */}
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
      </Epic>
		);
	}
};

export default withRouter(MainTutor);
