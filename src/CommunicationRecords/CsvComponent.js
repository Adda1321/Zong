import React from "react";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";

const headers = [
  { label: "AgentName", key: "first" },
  { label: "ClientName", key: "sec" },
  { label: "Date", key: "thir" },
  { label: "Time", key: "forth" },
  { label: "Duration", key: "fifth" },
  { label: "Status", key: "six" },
];

function CsvComponent({ data }) {
  const csvReport = {
    data: data,
    headers: headers,
    filename: "OutGoing_Report.csv",
  };

  return (
    <div>
      {data && (
        
          <CSVLink {...csvReport}>
              <Button variant="contained">
              Export to CSV
              </Button>
          </CSVLink>
        
      )}
    </div>
  );
}

export default CsvComponent;
