export function stringIn(str: string, ar: any[]) {
	// returns true if string is an element of array
	// false otherwise
	for (var i = 0; i < ar.length; i++) {
		if (ar[i] === str) {
			return true
		}
	}
	return false
}

export function bothStringsIn(str1: string, str2: string, ar: any[]) {
	return (stringIn(str1, ar) && stringIn(str2, ar))
}

export function switchVarIntoList(variable: any, list: any[], index: number) {
	// variable is set to list[index]
	// puts variable into list at index (replacing what's there)
	// ex. variable = GF.SwitchVarIntoList(variable, list, index);
	var temp = list[index]
	list[index] = variable
	
	return temp
}

export function wrap<T>(func: (...args: any[]) => T, ...args: any[]) {
	var wrapped: () => T = function () {
		return func(...args)
	}
	
	return wrapped
}

export function arrayEqual(arr1: any[], arr2: any[]) {
	if (arr1.length === arr2.length) {
		for(var i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false
			}
		}
		return true
	} else {
		return false
	}
}

export function range(start: number, stop: number) {
	// returns list of integers from start (inclusive) to stop (exclusive)
	var out = []
	for (var i = start; i < stop; i++) {
		out.push(i)
	}
	return out
}