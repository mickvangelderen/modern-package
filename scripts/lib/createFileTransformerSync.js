import { resolve } from 'path'
import { readFileSync } from 'fs'
import { writeFileSync } from 'fs'

function createFileTransformerSync(transformation) {
	return function transformFileSync({
		workingDirectoryPath = process.cwd(),
		inputFilePath,
		outputFilePath
	}) {
		const absoluteInputFilePath = resolve(workingDirectoryPath, inputFilePath)
		const absoluteOutputFilePath = resolve(workingDirectoryPath, outputFilePath)
		const input = readFileSync(absoluteInputFilePath)
		const output = transformation(input)
		const absoluteOutputFilePaths = []
		if (absoluteInputFilePath !== absoluteOutputFilePath || input.toString() !== output.toString()) {
			writeFileSync(absoluteOutputFilePath, output)
			absoluteOutputFilePaths.push(absoluteOutputFilePath)
		}
		return {
			absoluteInputFilePath,
			absoluteOutputFilePaths
		}
	}
}

export default createFileTransformerSync
