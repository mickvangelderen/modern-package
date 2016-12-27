function createJsonTransformer(transformation, options = {}) {
	const {
		replacer = null,
		space = 2
	} = options
	return function transformJson(input) {
		return JSON.stringify(transformation(JSON.parse(input)), replacer, space) + '\n'
	}
}

export default createJsonTransformer
