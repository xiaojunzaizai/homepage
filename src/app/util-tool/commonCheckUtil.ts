

export function isString(value: any): boolean {
    return typeof value === "string";
}

export function isDate(value: any): boolean {
    return value instanceof Date;
}

export function isValidNumber(value: any): boolean {
    return typeof value === "number" && !isNaN(value);
}
  

