import React, { useState } from "react";
import { Checkbox, FormControlLabel, Button } from "@mui/material";

type DepartmentData = {
  department: string;
  sub_departments: string[];
};

const departmentsData: DepartmentData[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const Departments: React.FC = () => {
  const [visibleSubDepts, setVisibleSubDepts] = useState<
    Record<string, boolean>
  >({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleDepartmentChange = (department: string, isChecked: boolean) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [department]: isChecked,
    };

    const { sub_departments = [] } =
      departmentsData.find((dept) => dept.department === department) || {};

    sub_departments.forEach((subDept) => {
      updatedCheckedItems[subDept] = isChecked;
    });

    setCheckedItems(updatedCheckedItems);

    if (isChecked) {
      setVisibleSubDepts((prevState) => ({
        ...prevState,
        [department]: true,
      }));
    }
  };

  const handleSubDepartmentChange = (
    subDepartment: string,
    isChecked: boolean
  ) => {
    const updatedCheckedItems = { ...checkedItems, [subDepartment]: isChecked };

    const parentDept = departmentsData.find((dept) =>
      dept.sub_departments.includes(subDepartment)
    )?.department;

    if (parentDept) {
      const allChecked = departmentsData
        .find((dept) => dept.department === parentDept)
        ?.sub_departments.every((subDept) => updatedCheckedItems[subDept]);

      updatedCheckedItems[parentDept] = !!allChecked;
    }

    setCheckedItems(updatedCheckedItems);
  };

  const toggleSubDeptVisibility = (department: string) => {
    setVisibleSubDepts((prevState) => ({
      ...prevState,
      [department]: !prevState[department],
    }));
  };

  return (
    <div className="department">
      {departmentsData.map(({ department, sub_departments }) => (
        <div key={department} className="sub-departments">
          <div className="department-header">
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!checkedItems[department]}
                  onChange={(e) =>
                    handleDepartmentChange(department, e.target.checked)
                  }
                />
              }
              label={department}
            />
            <Button
              className="department-hide-button"
              onClick={() => toggleSubDeptVisibility(department)}
              style={{
                fontSize: "1.5rem",
                width: "10px",
                height: "10px",
                color: "white",
                padding: "10px",
                border: "1px solid black",
              }}
            >
              {visibleSubDepts[department] ? "-" : "+"}
            </Button>
          </div>
          <div className="sub-departments">
            {visibleSubDepts[department] &&
              sub_departments.map((subDept) => (
                <FormControlLabel
                  key={subDept}
                  control={
                    <Checkbox
                      checked={!!checkedItems[subDept]}
                      onChange={(e) =>
                        handleSubDepartmentChange(subDept, e.target.checked)
                      }
                    />
                  }
                  label={subDept}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Departments;
