import { LineChart, LineChartConfig } from '../index';

const lineChartConfig: LineChartConfig = {
  height: 110,
  width: 300,
  padding: 5,
  strokeThickness: 2,
  strokeColor: '#3AD09F',
  gradient: [
    {
      offset: '0%',
      stopOpacity: '0.25',
      stopColor: '#3AD09F',
    },
    {
      offset: '100%',
      stopOpacity: '0',
      stopColor: '#3AD09F',
    },
  ],
};

const RANDOM_DATA = Array.from({ length: 24 }, () =>
  Math.floor(Math.random() * 1000)
);

const lineChart = new LineChart(lineChartConfig);

const imageSource = lineChart.getImageSource(RANDOM_DATA);
console.log(imageSource);

const svgString = lineChart.getSvgString(RANDOM_DATA);
console.log(svgString);

lineChart.saveAsFile(RANDOM_DATA, './charts/example.svg');
