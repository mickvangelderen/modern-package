import createFileTransformerSync from './lib/createFileTransformerSync'
import createJsonTransformer from './lib/createJsonTransformer'
import glob from 'glob'
import sortObject from 'sort-object-circular'
import { join } from 'path'

// function sortLines(string) {
// 	return string
// 	.split(EOL)
// 	.sort()
// 	.join(EOL)
// 	.trim(EOL) + EOL
// }

const workingDirectoryPath = join(__dirname, '..')

const jsonResults = glob.sync('**/{.babelrc,*.json}', {
	cwd: workingDirectoryPath,
	ignore: [
		'**/node_modules/**',
		'build/**'
	]
}).map(filePath => {
	return createFileTransformerSync(
		createJsonTransformer(sortObject)
	)({
		workingDirectoryPath,
		inputFilePath: filePath,
		outputFilePath: filePath
	})
})

export default jsonResults
