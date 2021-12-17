import { normalizeArrayByMinMax } from './utils';
import { LineChartConfig } from './models/chart-configs';
import xml from 'xml';

export class LineChart {
  private readonly config: LineChartConfig = {
    height: 110,
    width: 310,
    padding: 5,
    strokeThickness: 2,
    strokeColor: '#2196F3',
  };

  constructor(config: LineChartConfig = {}) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  private getPolylinePoints(data: number[], xAxisGap: number) {
    const { height, padding } = this.config;

    const points = data.map((value, index) => {
      const xPoint = index * xAxisGap! + padding!;
      const yPoint = height! - value;

      return [xPoint, yPoint];
    });

    return points.map((point) => point.join(',')).join(' ');
  }

  getSvgString(data: string[] | number[]) {
    if (!Array.isArray(data)) {
      throw new Error('Data must be a string array or a number array.');
    }

    const { height, width, padding, strokeThickness, strokeColor } =
      this.config;

    const numberOfPoints = data.length;

    const normalizedData = normalizeArrayByMinMax(
      data.map(Number),
      padding!,
      height! - padding!
    );

    const actualWidth = width! - 2 * padding!;

    const xAxisGap = actualWidth! / (numberOfPoints - 1);

    const polylinePoints = this.getPolylinePoints(normalizedData, xAxisGap);

    const xmlSchema = {
      svg: [
        {
          _attr: {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: `0 0 ${width} ${height}`,
          },
        },
        {
          polyline: [
            {
              _attr: {
                fill: 'none',
                stroke: strokeColor,
                'stroke-width': strokeThickness,
                points: polylinePoints,
              },
            },
          ],
        },
      ],
    };

    return xml(xmlSchema, { declaration: true });
  }

  getImageSource(data: string[] | number[]) {
    const svgString = this.getSvgString(data).replace(/#/g, '%23');
    const svgObjectUrl = `data:image/svg+xml;charset=utf-8,${svgString}`;
    return svgObjectUrl;
  }
}
