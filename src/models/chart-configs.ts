export interface LineChartConfig {
  height?: number;
  width?: number;
  padding?: number;
  strokeThickness?: number;
  strokeColor?: string;
  gradient?:
    | {
        offset: string;
        stopOpacity: string;
        stopColor: string;
      }[]
    | false;
  savePath?: string;
}
