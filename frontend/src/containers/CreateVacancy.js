import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, HeaderButton, Cell, Avatar, Button, Input, FormLayout, Radio, FormLayoutGroup, FixedLayout,
  Checkbox, SelectMimicry, Div, CellButton, Select, File, Textarea
} from '@vkontakte/vkui';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Document from '@vkontakte/icons/dist/24/document';

import BackIcon from '../components/BackIcon';

import { locationActions } from '../actions/location';

class CreateVacancy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			study_level: '',
      subjects: new Set(),
      activePanel: 'create_vacancy'
		};

		this.subjectSelect = React.createRef();
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
						<Select ref={this.subjectSelect} top="Предмет" placeholder="Выберите предмет" defaultValue="">
							<option value="rus">Русский язык</option>
							<option value="eng">Английский</option>
							<option value="math">Математика</option>
							<option value="phys">Физика</option>
						</Select>

            <SelectMimicry
							top="Уровень подготовки"
							placeholder="Любой"
							onClick={() => this.setState({ activePanel: 'study_level'})}
						>
							{this.state.study_level}
						</SelectMimicry>
						<Cell top="Выезд на дом">
              <Radio name="type">Да</Radio>
              <Radio name="type">Нет</Radio>
          	</Cell>
            <Input top="Оплата за час" defaultValue="" />
						<Button size="xl" onClick={() => this.props.dispatch(locationActions.changeLocation('active_tutor'))}>
							Разместить
						</Button>
					</FormLayout>
				</Panel>

        <Panel id="study_level" theme="white">
          <PanelHeader noShadow
              left={
                <HeaderButton onClick={() => this.setState({ activePanel: 'create_vacancy' })}>
									<BackIcon />
								</HeaderButton>
              }
            >
              Уровень подготовки
          </PanelHeader>
          <FormLayoutGroup>
						<Checkbox>Начальная школа</Checkbox>
						<Checkbox>Средняя школа</Checkbox>
						<Checkbox>Олимпиады</Checkbox>
						<Checkbox>Подготовка к ОГЭ</Checkbox>
						<Checkbox>Подготовка к ЕГЭ</Checkbox>
						<Checkbox>Курс высшего образования</Checkbox>
          </FormLayoutGroup>
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
