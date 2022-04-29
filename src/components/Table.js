import * as React from "react";
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
  const { header, rows, search } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchInput, setSearchInput] = React.useState("");
  const Theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#b1d87c",
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

    e.target.value.length === 1 && setPage(0)
    // console.log('testt' ,)
  };
  const filteredData = rows.filter((el) => {
    //if no input the return the original
    console.log('EL--',el)
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

  return (
    <ThemeProvider theme={Theme}>
      <div style={{ margin: "10px 150px", marginTop: 30 }}>
        {search && (
          <div
            style={{
              display: "flex",
              marginBottom: 5,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <TextField
              id="outlined-basic"
              size="small"
              label="Search"
              variant="outlined"
              InputProps={{
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {header.map((val, index) =>
                  index === 0 ? (
                    <StyledTableCell>{val}</StyledTableCell>
                  ) : (
                    <StyledTableCell align="right">{val}</StyledTableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((row) => (
                // console.log("ROW--", row);
                <StyledTableRow>
                  {/* for (const [key, value] of Object.entries(row)) */}
                  {Object.keys(row).map(
                    (value) => (
                      console.log(`firt ${value}`),
                      value === "first" ? (
                        <StyledTableCell component="th" scope="row">
                          {row[value]}
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="right">
                          {row[value]}
                        </StyledTableCell>
                      )
                    )
                  )}
                  <StyledTableCell align="right">
                    <IconButton aria-label="delete">
                      <EditIcon
                        color={"primary"}
                        fontSize={"small"}
                        onClick={() => alert("Edit")}
                      />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon
                        color={"error"}
                        sx={{ color: "##8dc63" }}
                        onClick={() => alert("Delete")}
                        fontSize={"small"}
                      />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
      </div>
    </ThemeProvider>
  );
}
