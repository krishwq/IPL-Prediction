import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function RadiusBar(props) {
  const data = [
    {
      name: props.bowlingTeam,
      uv: props.target,
      fill: '#82ca9d',
    },
    {
      name: props.battingTeam,
      uv: props.score,
      fill: '#8884d8',
    },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RadialBarChart
          innerRadius="30%"
          outerRadius="80%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="uv"
            label={{
              position: 'OutsideEnd',
              fill: '#000',
              formatter: (value) => `${value}`,
            }}
          />
          <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadiusBar;
