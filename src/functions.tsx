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
	let tmp: any = {};
	for (let word in dictionary) {
		if (dictionary[word].fl) tmp[dictionary[word].fl] = dictionary[word].fl;
	}
	Object.keys(tmp).sort().forEach(item => {
		result[item] = tmp[item];
	});
	return result;
}