import React from "react";
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
import { REPORT_COLORS } from "../constants/api_tags";
const option = ["Grade 1", "Grade 2", "Grade 3"];

const data1 = [
  { label: "Sem. I(2014)", maths: 21, english: 41, physics: 12, chemistry: 27 },
  {
    label: "Sem. II(2014)",
    maths: 78,
    english: 25,
    physics: 36,
    chemistry: 50,
  },
  {
    label: "Sem. III(2014)",
    maths: 58,
    english: 45,
    physics: 54,
    chemistry: 27,
  },
  { label: "Sem. I(2015)", maths: 78, english: 89, physics: 85, chemistry: 27 },
  {
    label: "Sem. II(2015)",
    maths: 21,
    english: 65,
    physics: 41,
    chemistry: 65,
  },
  {
    label: "Sem. III(2015)",
    maths: 89,
    english: 25,
    physics: 12,
    chemistry: 47,
  },
];

export default function Recharts({ data }) {
  return (
    <div style={{ width: "90%" }}>
      <div className="section col-md-6">
        <div className="section-content" style={{ "padding-top": "0px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey={"Average"} fill={REPORT_COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
