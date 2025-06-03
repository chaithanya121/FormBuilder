
export class CalculationEngine {
  static evaluate(formula: string, formData: Record<string, any>): number {
    try {
      // Replace field references with actual values
      let processedFormula = formula;
      
      // Replace field names with values
      Object.keys(formData).forEach(field => {
        const value = parseFloat(formData[field]) || 0;
        processedFormula = processedFormula.replace(
          new RegExp(`\\b${field}\\b`, 'g'),
          value.toString()
        );
      });

      // Basic mathematical operations
      processedFormula = processedFormula
        .replace(/SUM\(([^)]+)\)/g, (match, fields) => {
          const fieldList = fields.split(',').map((f: string) => f.trim());
          const sum = fieldList.reduce((acc: number, field: string) => {
            return acc + (parseFloat(formData[field]) || 0);
          }, 0);
          return sum.toString();
        })
        .replace(/AVG\(([^)]+)\)/g, (match, fields) => {
          const fieldList = fields.split(',').map((f: string) => f.trim());
          const sum = fieldList.reduce((acc: number, field: string) => {
            return acc + (parseFloat(formData[field]) || 0);
          }, 0);
          return (sum / fieldList.length).toString();
        })
        .replace(/COUNT\(([^)]+)\)/g, (match, fields) => {
          const fieldList = fields.split(',').map((f: string) => f.trim());
          const count = fieldList.filter(field => formData[field]).length;
          return count.toString();
        });

      // Evaluate the final expression safely
      return new Function('return ' + processedFormula)();
    } catch (error) {
      console.error('Calculation error:', error);
      return 0;
    }
  }

  static validateFormula(formula: string, availableFields: string[]): boolean {
    try {
      // Check if all referenced fields exist
      const fieldReferences = formula.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
      const unknownFields = fieldReferences.filter(field => 
        !availableFields.includes(field) && 
        !['SUM', 'AVG', 'COUNT', 'Math', 'parseInt', 'parseFloat'].includes(field)
      );
      
      return unknownFields.length === 0;
    } catch {
      return false;
    }
  }
}
