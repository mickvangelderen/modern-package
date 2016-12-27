function guardSpawnSync(spawn) {
	if (spawn.status !== 0) process.exit(spawn.status)
}

export default guardSpawnSync
