# Lite Chart

[![NPM](https://img.shields.io/npm/v/lite-chart.svg)](https://www.npmjs.com/package/lite-chart)

Lite Chart is an SVG generating library. When you provide the necessary configuration and data according to the chart types in it, it creates SVG charts suitable for the data.

## Installation

```bash
  npm install lite-chart

  #or

  yarn add lite-chart
```

## Usage

#### Lite Chart

```typescript
import { LineChart, LineChartConfig } from 'lite-chart';

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

// If it is a node project
lineChart.saveAsFile(RANDOM_DATA, './charts/example.svg');
```

## Screenshots

#### Lite Chart

![Lite Chart](https://i.ibb.co/4tYbK9m/line-chart.png)

## Changelog

#### v0.1.0-rc.1

- Release candidate 1 released.
