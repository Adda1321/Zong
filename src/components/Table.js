import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
// import IconButton from '@mui/material/IconButton';
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { withStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteExtension from "../APICalls/ExtensionCall/DltExtension";
import { Button } from "@mui/material";
import NewExt from "../Pages/extension/NewExt";
import { Tooltip } from "@mui/material";
import EditExtension from "../APICalls/ExtensionCall/EditExtension";

import { Modal_OpenClose } from "../store/Modal";
import { addModule } from "../store/Module";

import { useDispatch, useSelector } from "react-redux";
import DeleteIVR from "../APICalls/IVRCall/DltIVR";
import DeleteQueue from "../APICalls/QueueCall/DLTQueue";
import { SecurityUpdate } from "@mui/icons-material";

// import NewExt from "./NewExt";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomizedTables(props) {
  console.log("props", props);
  const { header, rows, search, Error, mode } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchInput, setSearchInput] = React.useState("");
  const [DLT, setDLT] = useState("");
  const [Edit, setEdit] = useState("");
  const [EditData, setEditData] = useState("");
  const [EditMode, setEditMode] = useState("");
  const [DLTMode, setDLTMode] = useState("");
  const [update, setUpdate] = useState("");
  // const [open, setOpen] = React.useState(false);

  // ----------------------------------- REDUX -------------------------

  // Using useSelector hook we obtain the redux store value
  // const open = useSelector((state) => state.Modal.open);

  const dispatch = useDispatch();

  // Using the useDispatch hook to send payload back to redux
  const HandleModal = () => {
    dispatch(Modal_OpenClose(true));
    console.log("HANDLE_MODAL");
  };

  // ----------------------------------- REDUX -------------------------

  const Theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#b1d87c",
      },
      TextField: {
        fontSize: "200px",
      },
    },
  });
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    e.target.value.length === 1 && setPage(0);
    // console.log('testt' ,)
  };
  const filteredData = rows.filter((el) => {
    //if no input the return the original
    // console.log("EL--", el);
    if (searchInput === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      let ID =
        el.first.toLowerCase().substring(0, searchInput.length) === searchInput
          ? true
          : false;
      let Nam =
        el.sec.toLowerCase().substring(0, searchInput.length) === searchInput
          ? true
          : false;

      return ID || Nam;
    }
  });
  const DltHandle = (ChildData) => {
    ChildData
      ? alert("Data Deleted Successfully " + ChildData)
      : alert("Cannot Delete " + ChildData);
  };

  const EditHandle = (ChildData) => {
    setEditData(ChildData);
  };

  const handleOpen = () => {
    // setOpen(true);
    // console.log("in extension");
  };
  const handleClose = () => {
    console.log("Ajeeb func");
    // setOpen(false);
    setEditData("");
  };

  return (
    <ThemeProvider theme={Theme}>
      {DLTMode === "extDLT" && (
        <DeleteExtension body={DLT} parentDLT={DltHandle} />
      )}
      {DLTMode === "ivrDLT" && <DeleteIVR body={DLT} parentDLT={DltHandle} />}
      {DLTMode === "queueDLT" && (
        <DeleteQueue body={DLT} parentDLT={DltHandle} />
      )}

      {EditMode === "extEdit" && (
        <EditExtension body={Edit} parentEdit={EditHandle} />
      )}

      {EditData &&
        (HandleModal(),
        (
          // setEditData(''),
          <NewExt
            EditData={EditData}
            mode={mode}
            update_id={update}
            get_state={handleClose}
          />
        ))}

      <div style={{ margin: "10px 90px 10px 150px", marginTop: 30 }}>
        {search && (
          <div
            style={{
              marginBottom: 5,
            }}
          >
            <TextField
              id="outlined-basic"
              size="small"
              label="Search"
              variant="outlined"
              placeholder="search"
              InputProps={{
                style: { fontSize: "13px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchInput}
              onChange={handleChange}
            />
          </div>
        )}
        <div style={{ display: "flex" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              {Error ? (
                <TableBody>
                  <TableRow>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 300,
                        }}
                      >
                        <div style={{ fontSize: 30 }}>
                          'CHECK YOUR INTERNET '
                        </div>
                      </div>
                    </td>
                  </TableRow>
                </TableBody>
              ) : (
                <>
                  <TableHead>
                    <TableRow>
                      {header.map((val, index) => (
                        // console.log('Value',val)
                        <StyledTableCell
                          key={index}
                          align={index !== 0 ? "right" : ""}
                        >
                          {val}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(rowsPerPage > 0
                      ? filteredData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : filteredData
                    ).map((row, index) => (
                      // console.log("ROW---", filteredData),
                      <StyledTableRow key={index}>
                        {/* for (const [key, value] of Object.entries(row)) */}
                        {Object.keys(row).map((value, index) => (
                          // console.log('ROWS--' , value),
                          <>
                            <StyledTableCell
                              component={value === "first" ? "th" : ""}
                              scope={value === "first" ? "row" : ""}
                              align={value !== "first" ? "right" : ""}
                              key={index}
                            >
                              {value === "emp" ? (
                                <>
                                  <IconButton
                                    // aria-label="delete"
                                    onClick={() => {
                                      var bodyFormData = new FormData();
                                      bodyFormData.append("id", row[value]);
                                      setEdit(bodyFormData);
                                      setUpdate(row[value]);
                                      setEditMode(`${mode}Edit`);
                                    }}
                                  >
                                    <EditIcon
                                      color={"primary"}
                                      fontSize={"small"}
                                 
                                    />
                                  </IconButton>

                                  <IconButton
                                    onClick={() => {
                                      var bodyFormData = new FormData();
                                      bodyFormData.append("id", row[value]);
                                      setDLT(bodyFormData);
                                      setDLTMode(`${mode}DLT`);
                                    }}
                                  >
                                    <DeleteIcon
                                      color={"error"}
                                      sx={{ color: "##8dc63" }}
                                      // onClick={() => alert("Delete")}
                                      fontSize={"small"}
                                    />
                                  </IconButton>
                                </>
                              ) : (
                                row[value]
                              )}
                            </StyledTableCell>
                          </>
                        ))}
                      </StyledTableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </>
              )}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>

          <div
            style={{
              display: "flex",
              // flexDirection:'column',
              alignItems: "flex-end",
              justifyContent: "flex-end",

              marginBottom: 10,
              marginLeft: 50,
            }}
          >
            <Tooltip title="Add new Field">
              <Button
                variant="contained"
                onClick={HandleModal}
                style={{
                  display: "block",
                  height: 60,
                  width: 40,
                  borderRadius: "50%",
                }}
              >
                <span style={{ fontSize: 30, color: "#fff" }}>+</span>
              </Button>
            </Tooltip>
            {/* <Button>asd</Button> */}
          </div>
        </div>
        {!EditData & (mode === "ext") && (
          <NewExt
            mode={mode}
            // gate={open} get_state={handleClose}
          />
        )}
        {!EditData & (mode === "ivr") && <NewExt mode={mode} />}
      </div>
    </ThemeProvider>
  );
}
