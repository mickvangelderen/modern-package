import guardSpawnSync from './lib/guardSpawnSync'
import { join } from 'path'
import { spawnSync } from 'child_process'

const workingDirectoryPath = join(__dirname, '..')
const outputDirectoryPath = join(workingDirectoryPath, 'build')

// Build packages.
require('./build')

// Test packages.
test({
	outputDirectoryPath
})

function test({
	outputDirectoryPath
}) {
	const spawnOptions = {
		cwd: outputDirectoryPath,
		stdio: 'inherit'
	}

	guardSpawnSync(spawnSync('npm', [ 'prune' ], spawnOptions))
	guardSpawnSync(spawnSync('npm', [ 'update' ], spawnOptions))
	guardSpawnSync(spawnSync('node', [ 'lib/index.test' ], spawnOptions))
}
