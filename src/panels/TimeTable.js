import React from 'react';
import PropTypes from 'prop-types';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text'

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';


const TimeTable = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			who??????????
		</PanelHeader>
		<Text>aoidjwopihfpoweh</Text>

		

	</Panel>
);





TimeTable.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default TimeTable;
