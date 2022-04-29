import Table from '../../components/Table';
function Extension() {




  function createData(first, sec, thir, forth) {
    return { first, sec, thir, forth };
  }
  
  const rows = [
    createData("121c340", "e92334", "0000", "02334244552"),
    createData("222v341", "272334", "0000", "02334244552"),
    createData("23d3342", "532334", "0000", "02334244552"),
    createData("22d4943", "32334", "0000", "02334244552"),
    createData("223d444", "2334", "0000", "02334244552"),
    createData("223545", "23234", "0000", "02334244552"),
    createData("22d343e3", "12334", "0000", "02334244552"),
    createData("22d343e3", "2334", "0000", "02334244552"),
    createData("23d23f40", "2334", "0000", "02334244552"),
    createData("24d3d40", "2334", "0000", "02334244552"),
    createData("22drd340", "2334", "0000", "02334244552"),
    createData("42d44d0", "2334", "0000", "02334244552"),
    createData("323d40", "2334", "0000", "02334244552"),
    createData("113d240", "2334", "0000", "02334244552"),
  ];
  
  console.log("ROW", rows);
const header =['ID','Name' , 'Code' , 'Primary Number' , 'Action']

  return (
    <div>
      
  <Table search={true} rows={rows}  header ={header} />
    </div>
  );
}

export default Extension;
