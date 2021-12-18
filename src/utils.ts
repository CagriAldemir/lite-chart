import fs from 'fs';

export function normalizeArrayByMinMax(
  data: number[],
  minValue = 0,
  maxValue = 100
) {
  const minOfData = Math.min(...data);
  const maxOfData = Math.max(...data);

  const ratio = (maxValue - minValue) / (maxOfData - minOfData);

  return data.map((value) => (value - minOfData) * ratio + minValue);
}

function checkIsNodeProcess() {
  const isNodeProcess =
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;

  if (!isNodeProcess) {
    throw new Error(
      'In order to perform this operation, your environment must be NodeJS.'
    );
  }
}

function getFileDirectory(filePath: string) {
  if (filePath.indexOf('/') === -1) {
    return filePath.substring(0, filePath.lastIndexOf('\\'));
  } else {
    return filePath.substring(0, filePath.lastIndexOf('/'));
  }
}

export function writeFile(path: string, content: any) {
  checkIsNodeProcess();

  return new Promise<void>((resolve, reject) => {
    const fileDirectory = getFileDirectory(path);

    if (!fs.existsSync(fileDirectory)) {
      fs.mkdirSync(fileDirectory, { recursive: true });
    }

    fs.writeFile(path, content, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
