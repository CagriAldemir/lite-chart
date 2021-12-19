import { LineChartConfig } from '../src/models/chart-configs';
import { LineChart } from './../src/line-chart';

const ETH_USDT_DATA = [
  '4404.14999999',
  '4401.90999999',
  '4372.63999999',
  '4388.61499999',
  '4376.74499999',
  '4405.82999999',
  '4408.77000000',
  '4396.77999999',
  '4434.47500000',
  '4428.10000000',
  '4408.19999999',
  '4388.46000000',
  '4364.74500000',
  '4388.60000000',
  '4364.62999999',
  '4374.08500000',
  '4375.95499999',
  '4338.47500000',
  '4311.32500000',
  '4314.70499999',
  '4300.10999999',
  '4309.05000000',
  '4298.61499999',
  '4235.68499999',
];

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

const lineChart = new LineChart(lineChartConfig);

const imageSource = lineChart.getImageSource(ETH_USDT_DATA);
console.log(imageSource);

const svgString = lineChart.getSvgString(ETH_USDT_DATA);
console.log(svgString);

lineChart.saveAsFile(ETH_USDT_DATA, './charts/example.svg');
