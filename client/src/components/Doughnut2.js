import React, { Component } from "react";
import DonutChart from "react-donut-chart";

class MyDonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          value: 40,
          label: this.props.title1,
        },
        {
          value: 30,
          label: this.props.title2,
        },
      
       
      ],
    };

  }

  render() {
    return (
        <div style={{'height':'200px','padding-bottom':'300px'}}>
      <DonutChart

        data={this.state.data}
     innerRadius={0.4}
       outerRadius={0.6}
       height={250}
       width={420}
       
     
        colors={["#1140C7", "#46CB96"]}
      />
      </div>
    );
  }
}

export default MyDonutChart;
