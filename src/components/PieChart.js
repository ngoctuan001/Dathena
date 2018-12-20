import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

function PieChart(props) {
  const { data } = props;
  // get data and labels for drawing chart
  const total_docs_list = data.map(each => each.total_docs);
  const name_list = data.map(each => each.name);

  const dataForDrawing = {
    labels: name_list,
    datasets: [{
      data: total_docs_list,
    }],
  };
  // for coloring ,however, this external plugin still have a disadvantage of coloring graph with many entries
  const chartOptions = {
    options: {
      plugins: {
        colorschemes: {
          scheme: 'tableau.Tableau20',
        },
      },
    },
  };
  return (
    <Pie data={dataForDrawing} options={chartOptions} />
  );
}

export default PieChart;
