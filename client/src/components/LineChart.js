import { React, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Dropdown from "./dropdowns";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";
const option = ["Top", "Average", "Low"];
const Branchdata = [
  { label: "January", branch1: 21, branch2: 41, branch3: 12 },
  { label: "February", branch1: 35, branch2: 79, branch3: 12 },
  { label: "March", branch1: 75, branch2: 57, branch3: 12 },
  { label: "June", branch1: 51, branch2: 47, branch3: 12 },
  { label: "July ", branch1: 41, branch2: 63, branch3: 15 },
  { label: "August", branch1: 47, branch2: 71, branch3: 90 },
];
const BranchdataTop = [
  { label: "January", branch1: 0, branch2: 0, branch3: 12 },
  { label: "February", branch1: 35, branch2: 0, branch3: 12 },
  { label: "March", branch1: 75, branch2: 57, branch3: 12 },
  { label: "June", branch1: 51, branch2: 47, branch3: 12 },
  { label: "July ", branch1: 41, branch2: 63, branch3: 15 },
  { label: "August", branch1: 47, branch2: 71, branch3: 90 },
];
const BranchdataAvg = [
  { label: "January", branch1: 21, branch2: 41, branch3: 12 },
  { label: "February", branch1: 35, branch2: 79, branch3: 12 },
  { label: "March", branch1: 75, branch2: 57, branch3: 12 },
  { label: "June", branch1: 51, branch2: 47, branch3: 12 },
  { label: "July ", branch1: 41, branch2: 63, branch3: 15 },
  { label: "August", branch1: 47, branch2: 71, branch3: 90 },
];

export default function Recharts2({ title, data, vis }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [Branchdata, setGraph] = useState([
    { label: "January", branch1: 21, branch2: 41, branch3: 12 },
    { label: "February", branch1: 35, branch2: 79, branch3: 12 },
    { label: "March", branch1: 75, branch2: 57, branch3: 12 },
    { label: "June", branch1: 51, branch2: 47, branch3: 12 },
    { label: "July ", branch1: 41, branch2: 63, branch3: 15 },
    { label: "August", branch1: 47, branch2: 71, branch3: 90 },
  ]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    Branchdata = [
      { label: "January", branch1: 0, branch2: 0, branch3: 12 },
      { label: "February", branch1: 35, branch2: 0, branch3: 12 },
      { label: "March", branch1: 75, branch2: 57, branch3: 12 },
      { label: "June", branch1: 51, branch2: 47, branch3: 12 },
      { label: "July ", branch1: 41, branch2: 63, branch3: 15 },
      { label: "August", branch1: 47, branch2: 71, branch3: 90 },
    ];

    if (selectedOption == option[1]) {
      setGraph(BranchdataTop);
    }
    if (selectedOption == option[2]) {
      setGraph(BranchdataAvg);
    }
  };
  return (
    <Paper className="row">
      <div className="section col-md-6">
        <div className="container-row" style={{ justifyContent: "start" }}>
          <h3
            className="section-title"
            title={title}
            style={{ "padding-left": "200px", "padding-top": "60px" }}
          >
            {title}
          </h3>
          <div style={{ paddingLeft: "20px", paddingTop: "60px" }}>
            <div>
              {vis ? (
                <Dropdown
                  options={option}
                  handleOptionClick={handleOptionClick}
                  placeholder="Top"
                />
              ) : (
                <div></div>
              )}{" "}
            </div>
          </div>
        </div>
        <div
          className="section-content"
          style={{ "padding-left": "170px", "padding-top": "20px" }}
        >
          <ResponsiveContainer width="85%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
            >
              <Tooltip />
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5 5" />
              <Legend />
              <Line type="monotone" dataKey="branch1" stroke="#FB8833" />
              <Line type="monotone" dataKey="branch2" stroke="#FF0000" />

              {/* <Line type="monotone" dataKey="branch3" stroke="#17A8F5" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Paper>
  );
}
