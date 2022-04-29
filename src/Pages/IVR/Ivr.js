import Table from '../../components/Table';
function IVR() {




  function createData(first, sec, thir, forth) {
    return { first, sec, thir, forth };
  }
  
  const rows = [
    createData("1240", "Mp3", "1", "testivr"),
    createData("2v41", "MP3", "11", "testing phase 2"),
    createData("2342", "MP4", "2", "optional test"),
    createData("2943", "Welcome", "3", "random"),
    createData("2444", "MP4", "4", "volume "),
    createData("245", "HEllo Test", "6", "setback"), 
  ];
  
//   console.log("ROW", rows);
const header =['ID','IVR Name' , 'Number of Options' , 'IVR Sound' , 'Action']

  return (
    <div>
      
  <Table search={true} rows={rows}  header ={header} />
    </div>
  );
}

export default IVR;
