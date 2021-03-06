import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Spinner from '@vkontakte/vkui/dist/components/Spinner/Spinner';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Link from '@vkontakte/vkui/dist/components/Link/Link';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text'
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';

import logo from '../img/logo.png';
import './stylesheets.css';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.changeDate = this.changeDate.bind(this);
		this.changeGroup = this.changeGroup.bind(this);
		this.changeCourse = this.changeCourse.bind(this);
		this.changeFaculty = this.changeFaculty.bind(this);
		this.loadGroups = this.loadGroups.bind(this);
		this.state = {
			groups: [{}],
			group: '',
			groupLoading: false,
			faculty: localStorage.getItem('faculty') || this.props.faculty[0].value,
			course: localStorage.getItem('course') || this.props.course[0].value,
			date: sessionStorage.getItem('date') || this.props.date,
			
		}
		
	}

	async loadGroups(faculty, potok) {
		let groups = [];
		const url = "https://vk-mini-apps-kksuip-tt.herokuapp.com/getgroups?faculty=" + faculty + "&potok=" + potok;
		console.log(groups);
		let response = await fetch(url);
		let json = await response.json();
		groups = await json['groups'];
		
		return groups;
		
	}
		
	componentDidMount() {
		try {
			this.setState({
				loadGroups: true,
			});
			this.loadGroups(this.state.faculty, this.state.course).then((groups) => {
				localStorage.setItem('groups', groups);
				this.setState({
					groups: groups,
					group: localStorage.getItem('group') || groups[0].value,
					loadGroups: false,
				});
			});
		} catch (error) {
			console.log('????????????! ' + error);
		}
	}

	changeCourse(e) {
		try {
			localStorage.setItem('course', e.target.value);
			this.setState({ 
				course: e.target.value,
				loadGroups: true,
			});
			this.loadGroups(this.state.faculty, e.target.value).then((groups) => {
				localStorage.setItem('group', groups[0].value);
				this.setState({
					groups: groups,
					group: groups[0].value,
					loadGroups: false,
					
				})
				console.log(groups);
			});
		} catch (error) {
			console.log('????????????! ' + error);
			
		}
	}

	changeFaculty(e) {
		try {
			localStorage.setItem('faculty', e.target.value);
			this.setState({ 
				faculty: e.target.value,
				loadGroups: true
			});
			this.loadGroups(e.target.value, this.state.course).then((groups) => {
				localStorage.setItem('group', groups[0].value);
				this.setState({
					groups: groups,
					group: groups[0].value,
					loadGroups: false,
				});
			});
		} catch (error) {
			console.log('????????????! ' + error);
		}
	}

	changeGroup(e) {
		try {
			localStorage.setItem('group', e.target.value);
			this.setState({group: e.target.value});
		} catch (error) {
			console.log('?????? ?????????? ????????????');
		}
	}

	changeDate(e) {
		try {
			sessionStorage.setItem('date', e.target.value);
			this.setState({date: e.target.value});
		} catch (error) {
			console.log('???????? ??????????????');
		}
	}
				//<img classNameName="Schedule" src={logo} alt="???????????????????????? ?????????????????????????????? ??????????????????????"/>
//<PanelHeader>???????????????????? ??????????????</PanelHeader>
	render() {
		return (
			<Panel id={this.props.id}>
				
				<FormLayout style={{backgroundImage: 'url(./back.png)' }}>

					<FormLayoutGroup>
						<Text weight="medium" style={{ marginBottom: 16, color: 'black' }}>???????????????????? ?? ????????????</Text>
						<Select onChange={this.changeFaculty} placeholder="????????????"
            			value={this.state.faculty}>
							{this.props.faculty.map((fac) => 
							<option value={fac.value}>{fac.label}</option>)}
						</Select>
						<Select onChange={this.changeCourse} placeholder="??????????"
						value={this.state.course}>
							{this.props.course.map((cour) => 
							<option value={cour.value}>{cour.label}</option>)}
						</Select>
						{this.state.loadGroups ? <Spinner size='medium'/> :
						<Select onChange={this.changeGroup} placeholder="????????????"
						value={this.state.group}>
							{this.state.groups.map((grop) => 
							<option value={grop.value}>{grop.label}</option>)}
						</Select>}
					</FormLayoutGroup>
					<FormLayoutGroup top="????????">
						<Input type="date"onChange={this.changeDate}
						value={this.state.date}/>
					</FormLayoutGroup>
					<Button size="xl" level="2" onClick={this.props.go} data-to="timeTable" data-group={this.state.group} data-date={this.state.date} style={{color: 'black'}}>
						Show me TimeTable
					</Button>
					<Button size="xl" level="2" onClick={this.props.go} data-to="schedule" data-group={this.state.group} data-date={this.state.date} style={{color: 'black'}}>
						????????????????
					</Button>
					<Button size="xl" level="2" onClick={this.props.go} data-to="startLoad" data-group={this.state.group} data-date={this.state.date} style={{color: 'white'}}>
						?????????????????? ????????????????????
					</Button>
					
				
				<Group title="Footer" id="footer">
				
					
					<Div id="link">
						<Link href="http://www.krascollege.ru/" target="_blank">????????????</Link>
					</Div>
				</Group>
				</FormLayout>
			</Panel>
		);
	}
}

export default Home;