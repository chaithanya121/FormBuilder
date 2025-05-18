
export const isValidJson = (json: string): boolean => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Formats JSON with proper indentation
 */
export const formatJson = (json: string): string => {
  try {
    const obj = JSON.parse(json);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return json;
  }
};

/**
 * Determines the type of a JSON value
 */
export const getJsonType = (value: any): string => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
};

/**
 * Searches JSON for keys or values matching the search term
 */
export interface SearchResult {
  path: string[];
  key: string;
  value: any;
  type: string;
}

export const searchJson = (
  obj: any,
  searchTerm: string,
  path: string[] = [],
  results: SearchResult[] = []
): SearchResult[] => {
  if (!searchTerm || searchTerm.trim() === "") return [];
  
  const term = searchTerm.toLowerCase();
  
  if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach((key) => {
      // Check if the key matches the search term
      if (key.toLowerCase().includes(term)) {
        results.push({
          path: [...path],
          key,
          value: obj[key],
          type: getJsonType(obj[key]),
        });
      }
      
      // If the value is a string, number, or boolean, check if it matches
      const value = obj[key];
      if (
        (typeof value === "string" && value.toLowerCase().includes(term)) ||
        (typeof value === "number" && value.toString().includes(term)) ||
        (typeof value === "boolean" && value.toString().toLowerCase() === term)
      ) {
        results.push({
          path: [...path, key],
          key,
          value,
          type: getJsonType(value),
        });
      }
      
      // If the value is an object or array, recursively search it
      if (typeof value === "object" && value !== null) {
        searchJson(value, searchTerm, [...path, key], results);
      }
    });
  }
  
  return results;
};

/**
 * Gets a nested path from an object
 */
export const getValueByPath = (obj: any, path: string[]): any => {
  return path.reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
};

/**
 * Generates a sample JSON object for demo purposes
 */
export const generateSampleJson = (): string => {
  const sampleData = {
    "id": "d4f91fda-5018-480e-95fc-13671c850bcf",
    "formId": "form-1747503198742",
    "timestamp": "2025-05-17T18:01:47.211Z",
    "data": {
      "New text": "testing",
      "New password": "123332",
      "New date": "2025-05-01T18:30:00.000Z"
    }
  };
  
  return JSON.stringify(sampleData, null, 2);
};