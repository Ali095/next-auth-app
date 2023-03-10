export const toCamelCase = (str: string): string => str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace("-", "").replace("_", ""));

export const toSnakeCase = (str: string): string => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const isObject = (obj: unknown): boolean => obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function';

export const keysToCamel = (obj: object | Array<any> | Record<string, any>): object | Array<any> | Record<string, any> => {
	if (isObject(obj)) {
		const updated: Record<string, any> = {};
		Object.keys(obj).forEach((k) => { updated[toCamelCase(k)] = keysToCamel(obj[k as keyof typeof obj]); });
		return updated;
	}
	if (Array.isArray(obj)) return obj.map((i) => keysToCamel(i));
	return obj;
};

export const keysToSnake = (obj: object | Array<any> | Record<string, any>): object | Array<any> | Record<string, any> => {
	if (isObject(obj)) {
		const updated: Record<string, any> = {};
		Object.keys(obj).forEach((k) => { updated[toSnakeCase(k)] = keysToSnake(obj[k as keyof typeof obj]); });
		return updated;
	}
	if (Array.isArray(obj)) {
		return obj.map((i) => keysToSnake(i));
	}
	return obj;
};

export const convertToTitleCase = (str: string, seperator = ' '): string => {
	const words = str.split(seperator);
	const titleCasedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
	const titleCasedStr = titleCasedWords.join(" ");
	return titleCasedStr;
}
