import React from 'react';
import PropTypes from 'prop-types';
import {
	View, Panel, PanelHeader, HeaderButton, Cell, Avatar, List, Group
} from '@vkontakte/vkui';

import BackIcon from '../customComponents/BackIcon';

const Students = props => (
	<View id={props.id} activePanel="students">
		<Panel id="students">
			<PanelHeader
				left={
					<HeaderButton onClick={props.go} data-to="profile_tutor">
						<BackIcon />
					</HeaderButton>
				}
			>
				Поиск
			</PanelHeader>
			<Group title="Ученики">
				<List>
					<Cell
						size="l"
						description="89045678463. Москва, ул. Удальцова, д. 4"
						before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"/>}
					>
						Артурка 
					</Cell>
				</List>
			</Group>
		</Panel>
	</View>
);

Students.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Students;
