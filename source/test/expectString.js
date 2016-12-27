function expectString(value) {
	if (typeof value === 'string') return value
	throw new TypeError(`Expected a string but got ${value}.`)
}

export default expectString
