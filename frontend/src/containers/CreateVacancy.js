import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, HeaderButton, Cell, Button, Input, FormLayout, Radio, List, FixedLayout, 
  Checkbox, SelectMimicry, Div, Group, colors
} from '@vkontakte/vkui';

import BackIcon from '../components/BackIcon';
import Icon24Done from '@vkontakte/icons/dist/24/done';

import { locationActions } from '../actions/location';

class CreateVacancy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			study_level: '',
      subject: '',
      activePanel: 'create_vacancy'
		};
  }

	render() {
		return (
			<View id={this.props.id} activePanel={this.state.activePanel}>
				<Panel id="create_vacancy" theme="white">
					<PanelHeader
						left={
							<HeaderButton onClick={() => this.props.dispatch(locationActions.goBack())}>
								<BackIcon />
							</HeaderButton>
						}
					>
						Cоздание вакансии
					</PanelHeader>
					<FormLayout>		
						<SelectMimicry
							top="Предмет"
							onClick={() => this.setState({ activePanel: 'subject'})}
						>
							{this.state.subject}
						</SelectMimicry>
            <SelectMimicry
							top="Уровень подготовки"
							onClick={() => this.setState({ activePanel: 'study_level'})}
						>
							{this.state.study_level}
						</SelectMimicry>
						<Cell top="Выезд на дом">
              <Radio name="type">Да</Radio>
              <Radio name="type">Нет</Radio>
          	</Cell>
            <Input top="Оплата за час" defaultValue="" />
						<FixedLayout vertical="bottom" style={{ marginBottom: 10 }}>
							<Button size="xl" onClick={() => this.props.dispatch(locationActions.changeLocation('active_tutor', 'requests'))}>
								Разместить
{/* Отклонить, если поля пустые */}
							</Button>
						</FixedLayout>
					</FormLayout>
				</Panel>

				<Panel id="subject">
          <PanelHeader
              left={
                <HeaderButton onClick={() => this.setState({ activePanel: 'create_vacancy' })}>
									<BackIcon />
								</HeaderButton>
              }
            >
              Предмет
          </PanelHeader>
					<Group>
						<List>
							<Cell
								onClick={() => this.setState({ subject: 'Математика', activePanel: 'create_vacancy' })}
								asideContent={this.state.subject === 'Математика' ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Математика
							</Cell>
							<Cell
								onClick={() => this.setState({ subject: 'Физика', activePanel: 'create_vacancy' })}
								asideContent={this.state.subject === 'Физика' ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Физика
							</Cell>
							<Cell
								onClick={() => this.setState({ subject: 'Русский язык', activePanel: 'create_vacancy' })}
								asideContent={this.state.subject === 'Русский язык' ? <Icon24Done fill={colors.blue_300} /> : null}
								>
								Русский язык
							</Cell>
							<Cell
								onClick={() => this.setState({ subject: 'Английский язык', activePanel: 'create_vacancy' })}
								asideContent={this.state.subject === 'Английский язык' ? <Icon24Done fill={colors.blue_300} /> : null}
							>
								Английский язык
							</Cell>
						</List>
					</Group>
				</Panel>
        <Panel id="study_level">
          <PanelHeader
              left={
                <HeaderButton onClick={() => this.setState({ activePanel: 'create_vacancy' })}>
									<BackIcon />
								</HeaderButton>
              }
            >
              Уровень подготовки
          </PanelHeader>
					<Group>
						<Checkbox>Начальная школа</Checkbox>
						<Checkbox>Средняя школа</Checkbox>
						<Checkbox>Олимпиады</Checkbox>
						<Checkbox>Подготовка к ОГЭ</Checkbox>
						<Checkbox>Подготовка к ЕГЭ</Checkbox>
						<Checkbox>Курс высшего образования</Checkbox>
					</Group>

          <FixedLayout vertical="bottom">
						<Div>
							<Button size="l" stretched onClick={() => this.setState({ activePanel: 'create_vacancy'})}>
								Применить
							</Button>
						</Div>	
					</FixedLayout>
        </Panel>
			</View>
		);
	}
};

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(CreateVacancy);
