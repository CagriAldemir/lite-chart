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

debugger;

const xx = LineChart.getImageSource(RANDOM_DATA, lineChartConfig);

const yy = LineChart.getSvgString(RANDOM_DATA, lineChartConfig);

console.log(xx);
console.log('===');
console.log('===');
console.log('===');
console.log(yy);

LineChart.saveAsFile(RANDOM_DATA, './charts/xxx.svg', lineChartConfig);
