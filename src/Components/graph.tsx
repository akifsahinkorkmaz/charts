import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import santrals, {santral} from '../Data/santral';
import {Bar} from 'react-chartjs-2';
import {ChartDataset} from 'chart.js';


import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);



interface Iprops {
  self: santral,
  cloud: number,
}
interface Idata {
  labels: string[],
  datasets: any,
}

function Graph(props: Iprops ) {

  const [data, setData] = useState<Idata>();

  useEffect(() => {
    var label =  ['00.00', '14.00', '18.00', '22.00'];
    var dataset = []
    dataset.push(
      {
        type: 'line' as const,
        label: 'Ortalama Güç',
        borderColor: 'rgb(34 211 238)',
        borderWidth: 2,
        fill: false,
        data: [0, props.self.power, (props.self.power * faker.datatype.number({ min: 60, max: 80 }) / 100), 0 ],
      },
    )

    for (let i = 0 ; i < santrals.length; i++){
      var dt1 = santrals[i].power * faker.datatype.number({ min: 70, max: 100 }) / 100;
      dt1 = santrals[i].name === props.self.name ? dt1 * (100-props.cloud) / 100 : dt1; 
      var dt2 = santrals[i].power * faker.datatype.number({ min: 60, max: 80 }) / 100; 
      dt2 = santrals[i].name === props.self.name ? dt2 * (100-props.cloud) / 100 : dt2;
      
      dataset.push({
        type: 'bar' as const,
        label: santrals[i].name,
        backgroundColor: santrals[i].name === props.self.name ? 'rgb(168, 85, 247)' : 'rgb(251 146 60)',
        data: [0, dt1, dt2, 0],
        borderColor: 'white',
        borderWidth: 2,
      })
      
    }
    
    setData({
      labels: label,
      datasets: dataset
    })
  }, [props])
  

  if (data) {
    return (
      <div>
        <Chart type='bar' data={data} />
      </div>
    );
  } else {
    return (
      <div>
        <span>Lütfen bekleyin.</span>
      </div>
    )
  }
}

export default Graph;

/*
[
  {
    id: 1,
    label: santrals[0],
    data: [5, 6, 7],
  },
  {
    id: 2,
    label: '',
    data: [3, 2, 1],
  },
],

*/