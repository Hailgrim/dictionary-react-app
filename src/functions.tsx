export function innerSearch(haystack: any, needle: string): boolean {
	if (needle === undefined) return false;
	if (needle === '') return true;
	let find: boolean = false;
	for (let field in haystack) {
		if (!find) {
			if (typeof haystack[field] == 'object') {
				find = innerSearch(haystack[field], needle);
			} else {
				let tmpFind = haystack[field].toString().indexOf(needle);
				if (tmpFind > -1) find = true;
			}
		}
	}
	return find;
}

export function uniquePartsOfSpeech(dictionary: any): any {
	let result: any = {};
	for (let word in dictionary) {
		if (dictionary[word].fl) result[dictionary[word].fl] = dictionary[word].fl;
	}
	return result;
}