import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Panel, PanelHeader, HeaderButton, Cell, Avatar, Button, Input, FormLayout, FormLayoutGroup, Group, FixedLayout,
  Radio, Checkbox, SelectMimicry, Div, CellButton, Select, Textarea
} from '@vkontakte/vkui';
import Icon24Add from '@vkontakte/icons/dist/24/add';

import BackIcon from '../customComponents/BackIcon';

class CreateVacancy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			study_level: '',
      subjects: new Set(),
      activePanel: 'create_vacancy'
		};

		this.subjectSelect = React.createRef();

		this.addSubjectClick = this.addSubjectClick.bind(this);
  }

	addSubjectClick() {
		let { subjects } = this.state;
		const { title } = this.subjectSelect.current.state;
		if (title !== 'Выберите предмет')
			subjects.add(title);
		this.setState({
			subjects: subjects
		});
	}

	render() {
		return (
			<View id={this.props.id} activePanel={this.state.activePanel}>
				<Panel id="create_vacancy" theme="white">
					<PanelHeader
						left={
							<HeaderButton onClick={this.props.go} data-to="home">
								<BackIcon />
							</HeaderButton>
						}
					>
						Регистрация
					</PanelHeader>
					<FormLayout>
						<Cell
							size="l"
							description="Школьный учитель, Возраст: 20"
							before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
						>
							Артур Стамбульцян
						</Cell>
						<Select ref={this.subjectSelect} top="Предмет" placeholder="Выберите предмет" defaultValue="">
							<option value="rus">Русский язык</option>
							<option value="eng">Английский</option>
							<option value="math">Математика</option>
							<option value="phys">Физика</option>
						</Select>
						<div style={{padding: 0, margin: 0}}>
							{Array.from(this.state.subjects).map((subject, index) => 
								<Cell size="l" key={index}>{subject}</Cell>
							)}
						</div>

						<CellButton onClick={this.addSubjectClick} before={<Icon24Add />}>
							Добавить предмет
						</CellButton>
            <SelectMimicry
							top="Уровень подготовки"
							placeholder="Любой"
							onClick={() => this.setState({ activePanel: 'study_level'})}
						>
						{this.state.study_level}
						</SelectMimicry>
            <Input top="Оплата за час" defaultValue=""/>
						<Input top="Стаж преподавания" defaultValue=""/>
						<Input top="Образование" defaultValue=""/>
						<Input top="Адрес" defaultValue=""/>
            <div top="Выезд на дом">
              <Radio name="type">Да</Radio>
              <Radio name="type">Нет</Radio>
           </div>
           <Input top="Электронная почта" defaultValue=""/>
					 <Textarea top="О себе" placeholder="" />
						<Button size="xl" onClick={this.props.go} data-to="profile">
							Сохранить
						</Button>
					</FormLayout>
				</Panel>

        <Panel id="study_level">
          <PanelHeader noShadow
              left={
                <HeaderButton onClick={() => this.setState({ activePanel: 'create_vacancy'})}>
                  <BackIcon />
                </HeaderButton>
              }
            >
              Уровень подготовки
          </PanelHeader>
          <FormLayout>
            <Group>
              <Checkbox>Начальная школа</Checkbox>
              <Checkbox>Средняя школа</Checkbox>
              <Checkbox>Олимпиады</Checkbox>
              <Checkbox>Подготовка к ОГЭ</Checkbox>
              <Checkbox>Подготовка к ЕГЭ</Checkbox>
              <Checkbox>Курс высшего образования</Checkbox>
            </Group>
          </FormLayout>
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

CreateVacancy.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default CreateVacancy;
