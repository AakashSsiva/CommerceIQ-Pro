import Papa from 'papaparse';

/**
 * Parses a CSV File into an array of JSON objects.
 * @param {File} file 
 * @returns {Promise<Array>}
 */
export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
