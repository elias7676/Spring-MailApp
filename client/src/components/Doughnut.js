import React, { Component, useEffect, useState } from "react";
import DonutChart from "react-donut-chart";
import { sortByNumber } from "../helpers/sortArrayOfObject";

export default function MyDonutChart({
  filteredData = [],
  sort = false,
  asc = true,
}) {
  const [finalGrouped, setFinalGrouped] = useState([]);

  function groupBy(arr, prop) {
    const map = new Map(Array?.from(arr, (obj) => [obj[prop], []]));
    arr.forEach((obj) => map?.get(obj[prop]).push(obj));
    return Array.from(map.values());
  }

  useEffect(() => {
    if (filteredData.length === 0) return;
    var grouped = [];
    grouped = groupBy(filteredData, "label");

    setFinalGrouped(
      sort
        ? sortByNumber(
            grouped.map((s) => {
              return {
                label:
                  s.length > 0
                    ? s[0]?.label !== ""
                      ? s[0]?.label
                      : "Empty"
                    : "Data Not Found",
                value: s.length,
              };
            }) || [],
            "value",
            asc
          )
        : grouped.map((s) => {
            return {
              label:
                s.length > 0
                  ? s[0]?.label !== ""
                    ? s[0]?.label
                    : "Empty"
                  : "Data Not Found",
              value: s.length,
            };
          })
    );
  }, [filteredData]);

  // const data = [
  //   {
  //     value: 40,
  //     label: props.title1,
  //   },
  //   {
  //     value: 30,
  //     label: props.title2,
  //   },
  //   {
  //     value: 30,
  //     label: props.title3,
  //   },
  // ];

  return (
    <div style={{ height: "200px", "padding-bottom": "300px" }}>
      {}
      <DonutChart
        data={filteredData.length > 0 ? finalGrouped : []}
        innerRadius={0.4}
        outerRadius={0.6}
        height={250}
        width={400}
        colors={["#1140C7", "#46CB96", "#13AA09"]}
      />
    </div>
  );
}
