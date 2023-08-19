import "../../App.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { api_data, Column } from "../types";

function SecondPage() {
  const [data, set_data] = useState<api_data[]>([]);
  const [columns, set_columns] = useState<Column[]>([]);

  useEffect(() => {
    const get_data = async () => {
      const result = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result_data: api_data[] = await result.json();
      set_data(result_data);
      const derived_columns: Column[] = data[0]
        ? Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
          }))
        : [];
      set_columns(derived_columns);
    };
    get_data();
  }, [data]);

  return (
    <div className="container">
      <DataGrid className="data-table" columns={columns} rows={data}></DataGrid>
    </div>
  );
}

export default SecondPage;
