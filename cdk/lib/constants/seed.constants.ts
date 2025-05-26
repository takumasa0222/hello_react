export const SEED_DATA = {
	PARTITION_KEY_NAME: 'lang',
	SORT_KEY_NAME: 'type',
	MESSAGE_KEY: 'message',
	PARTITION_KEY_VALUE: 'jp',
	SORT_KEY_VALUE: 'default',
	MESSAGE_VALUE: 'Hello World!!',
};

export const SEED_LAMBDA = {
	BASE_NAME: 'SeedFunction',
	HANDLER: 'index.handler',
	TIMEOUT_SECONDS: 5,
	MEMORY_MB: 128,
	CODE_ASSET_PATH:'../seed'
};