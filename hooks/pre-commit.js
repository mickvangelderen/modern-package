#!node_modules/.bin/babel-node

import results from '../scripts/sort'

const changes = results
.map(result => result.absoluteOutputFilePaths.length)
.reduce((a, b) => a + b, 0)

if (changes) {
	console.error('Some files were automatically sorted, please review your commit.')
	process.exit(1)
}
