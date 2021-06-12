import React from 'react';
import PropTypes from 'prop-types';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import * as XLSX from "xlsx";


import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';


    let selectedFile;
	console.log(window.XLSX);

	const docy = document.getElementById('input')
	if (docy){
		docy.addEventListener("change", (event) => {
			selectedFile = event.target.files[0];
		})
	}
    

    let data=[{
        "name":"jayanth",
        "data":"scd",
        "abc":"sdef"
    }]

    console.log(data)

	const docy2 = document.getElementById('button')
	if (docy2){
		docy2.addEventListener("click", () => {
			XLSX.utils.json_to_sheet(data, 'out.xlsx');
			if(selectedFile){
				console.log('ALLL OKKKKK')
				let fileReader = new FileReader();
				fileReader.readAsBinaryString(selectedFile);
				fileReader.onload = (event)=>{
				let data = event.target.result;
				let workbook = XLSX.read(data,{type:"binary"});
				console.log(workbook);
				workbook.SheetNames.forEach(sheet => {
					let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
					console.log(rowObject);
					document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
					
				});
				}
			}
		});	
	}
    
  


console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA',data)
console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA','id(jsondata)')

const StartLoad = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			who??????????
		</PanelHeader>
		<Text>aoidjwopihfpoweh</Text>
		<FormLayoutGroup top="Конвертер">
			<Div className="col-md-3">
				<input className="form-control" type="file" id="input" accept=".xls,.xlsx"  />
				<button className="btn btn-primary" id="button">конвертировать</button>
				<pre id="jsondata"></pre>
			</Div>
		</FormLayoutGroup>
	</Panel>
);





StartLoad.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default StartLoad;