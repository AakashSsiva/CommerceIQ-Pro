/**
 * Detects duplicate orders based on Order_ID.
 * @param {Array} rawData - Array of parsed objects
 * @returns {Object} - { cleanData, duplicates, hasDuplicates }
 */
export const detectDuplicates = (rawData) => {
  const seenIds = new Set();
  const cleanData = [];
  const duplicates = [];

  rawData.forEach((row) => {
    // If Order_ID exists and we've seen it before
    if (row.Order_ID && seenIds.has(row.Order_ID)) {
      duplicates.push(row);
    } else {
      if (row.Order_ID) {
        seenIds.add(row.Order_ID);
      }
      cleanData.push(row);
    }
  });

  return {
    cleanData,
    duplicates,
    hasDuplicates: duplicates.length > 0,
    duplicateCount: duplicates.length
  };
};
