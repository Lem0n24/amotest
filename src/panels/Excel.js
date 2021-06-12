/*

function scrip(XLSX){
    let selectedFile;
    console.log(window.XLSX);
    const docc1 = document.getElementById('input')
    docc1.addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
    })

    let data=[{
        "name":"jayanth",
        "data":"scd",
        "abc":"sdef"
    }]

    console.log(data)

    document.getElementById('button').addEventListener("click", () => {
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
console.log('ПОЛУЧАЕТСЯ ТАК: ' + scrip.data)  
*/