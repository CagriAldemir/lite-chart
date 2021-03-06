import { normalizeArrayByMinMax, writeFile } from './utils';
import { LineChartConfig } from './models/chart-configs';
import xml from 'xml';

export default class LineChart {
  private readonly _config: LineChartConfig = {
    height: 110,
    width: 300,
    padding: 5,
    strokeThickness: 2,
    strokeColor: '#2196F3',
    gradient: false,
  };

  private tempConfig: LineChartConfig = {};

  private static lineChartInstance = new LineChart();

  public get config(): LineChartConfig {
    const mConfig = {
      ...this._config,
      ...this.tempConfig,
    };
    this.tempConfig = {};
    return mConfig;
  }

  constructor(config: LineChartConfig = {}) {
    console.log('LineChart constructor');

    this._config = {
      ...this.config,
      ...config,
    };
  }

  private getPolylinePoints(data: number[], xAxisGap: number) {
    const { height, strokeThickness, gradient } = this.config;

    let points = data.map((value, index) => {
      const xPoint = index * xAxisGap;
      const yPoint = height! - value;

      return [xPoint, yPoint];
    });

    if (gradient) {
      const lastIndex = points.length - 1;

      points[0][0] = points[0][0] - strokeThickness! / 2;

      points[lastIndex][0] = points[lastIndex][0] + strokeThickness! / 2;

      const newFirstPoint = [points[0][0], height!];
      const newLastPoint = [points[lastIndex][0], height!];

      points = [newFirstPoint, ...points, newLastPoint];
    }

    return points.map((point) => point.join(',')).join(' ');
  }

  getSvgString(data: string[] | number[], config?: LineChartConfig) {
    if (!Array.isArray(data)) {
      throw new Error('"data" param must be a string array or a number array.');
    }

    this.tempConfig = config || {};
    const { height, width, padding, strokeThickness, strokeColor, gradient } =
      this.config;

    const numberOfPoints = data.length;

    const normalizedData = normalizeArrayByMinMax(
      data.map(Number),
      padding,
      height! - padding!
    );

    const xAxisGap = width! / (numberOfPoints - 1);

    const polylinePoints = this.getPolylinePoints(normalizedData, xAxisGap);

    const xmlSchema: any = {
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
                fill: gradient ? 'url(#g)' : 'none',
                stroke: strokeColor,
                'stroke-width': strokeThickness,
                points: polylinePoints,
              },
            },
          ],
        },
      ],
    };

    if (gradient) {
      if (!Array.isArray(gradient)) {
        throw new Error('"gradient" must be an array.');
      }
      const stopObjects = gradient.map(
        ({ offset, stopOpacity, stopColor }) => ({
          stop: [
            {
              _attr: {
                offset,
                'stop-opacity': stopOpacity,
                'stop-color': stopColor,
              },
            },
          ],
        })
      );

      const gradientObject = {
        defs: [
          {
            linearGradient: [
              {
                _attr: {
                  id: 'g',
                  gradientTransform: 'rotate(90)',
                },
              },
              ...stopObjects,
            ],
          },
        ],
      };

      xmlSchema.svg.push(gradientObject);
    }

    return xml(xmlSchema, { declaration: true });
  }

  getImageSource(data: string[] | number[], config?: LineChartConfig) {
    const svgString = this.getSvgString(data, config).replace(/#/g, '%23');
    const svgObjectUrl = `data:image/svg+xml;charset=utf-8,${svgString}`;
    return svgObjectUrl;
  }

  saveAsFile(
    data: string[] | number[],
    savePath: string,
    config?: LineChartConfig
  ) {
    const svgString = this.getSvgString(data, config);
    return writeFile(savePath, svgString);
  }

  static getSvgString(data: string[] | number[], config?: LineChartConfig) {
    return this.lineChartInstance.getSvgString(data, config);
  }

  static getImageSource(data: string[] | number[], config?: LineChartConfig) {
    return this.lineChartInstance.getImageSource(data, config);
  }

  static saveAsFile(
    data: string[] | number[],
    savePath: string,
    config?: LineChartConfig
  ) {
    return this.lineChartInstance.saveAsFile(data, savePath, config);
  }
}
