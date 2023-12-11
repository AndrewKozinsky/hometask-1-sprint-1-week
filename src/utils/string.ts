export function isString(arg: unknown, minLength?: number) {
	if (!arg || typeof arg !== 'string' || !arg.trim()) {
		return false
	}

	if (minLength && arg.trim().length >= minLength) {
		return false
	}

	return true
}
