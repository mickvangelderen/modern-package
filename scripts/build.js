import createFileTransformerSync from './lib/createFileTransformerSync'
import createJsonTransformer from './lib/createJsonTransformer'
import guardSpawnSync from './lib/guardSpawnSync'
import { join } from 'path'
import { resolve } from 'path'
import { relative } from 'path'
import { spawnSync } from 'child_process'

const workingDirectoryPath = join(__dirname, '..')
const inputDirectoryPath = join(workingDirectoryPath, 'source')
const outputDirectoryPath = join(workingDirectoryPath, 'build')
const copyFileSync = createFileTransformerSync(input => input)

build({
	inputDirectoryPath,
	outputDirectoryPath,
	preset: 'es2015',
	engines: {
		node: '>=0.12.0'
	},
	packageName: 'package-name'
})

function build({
	inputDirectoryPath,
	outputDirectoryPath,
	preset,
	engines,
	packageName
}) {
	// Build source files.
	guardSpawnSync(spawnSync('babel', [
		relative(workingDirectoryPath, resolve(workingDirectoryPath, inputDirectoryPath)),
		'--out-dir', relative(workingDirectoryPath, resolve(workingDirectoryPath, outputDirectoryPath)),
		'--source-maps',
		'--presets', preset,
		'--ignore', 'node_modules/'
	], {
		cwd: workingDirectoryPath,
		stdio: 'inherit'
	}))

	// Build package.json.
	createFileTransformerSync(
		createJsonTransformer(
			createPackageTransformer({
				packageName,
				engines
			}),
			{ space: 2 }
		),
		{
			workingDirectoryPath,
			inputFilePath: join(inputDirectoryPath, 'package.json'),
			outputFilePath: join(outputDirectoryPath, 'package.json')
		}
	)

	// Build readme.md and .npmignore.
	;[ 'readme.md', '.npmignore' ].forEach(relativeFilePath =>
		copyFileSync({
			workingDirectoryPath,
			inputFilePath: join(inputDirectoryPath, relativeFilePath),
			outputFilePath: join(outputDirectoryPath, relativeFilePath)
		})
	)
}

function createPackageTransformer({ packageName, engines }) {
	return function transformPackage(pkg) {
		return Object.keys(pkg)
		.filter(key => !/^(private|scripts|name)$/.test(key))
		.reduce((map, key) => {
			map[key] = key === 'devDependencies'
				? transformDevDependencies(pkg[key])
				: pkg[key]
			return map
		}, {
			name: packageName,
			engines
		})
	}
}

function transformDevDependencies(devDependencies) {
	return Object.keys(devDependencies)
	.filter(dependency => !/^babel-|^eslint$/.test(dependency))
	.reduce((map, key) => {
		map[key] = devDependencies[key]
		return map
	}, {})
}
