import React from 'react';
import { RadialBarChart,RadialBar,Legend,Tooltip } from 'recharts';

function RadiusBar(props) {
 const data = [
  {
    "name": props.bowlingTeam,
    "uv": props.target,
    "fill": "#82ca9d"
  },
  {
    "name": props.battingTeam,
    "uv": props.score,
    "fill": "#8884d8"
  }
]   
  return (
<RadialBarChart 
  width={350} 
  height={300} 
  innerRadius="40%" 
  outerRadius="110%" 
  data={data} 
  startAngle={180} 
  endAngle={0}
>
 <RadialBar
    minAngle={15}
    background
    clockWise={true}
    dataKey="uv"
    label={{ position: 'OutsideEnd', fill: '#000', formatter: (value) => `${value}` }}
  />
  <Legend/>
  <Tooltip />
</RadialBarChart>
  );
}

export default RadiusBar;
