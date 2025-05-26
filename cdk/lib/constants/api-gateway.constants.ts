export const API_GATEWAY = {
	BASE_NAME: 'MessageApi',
	DESCRIPTION: 'API Gateway for greeting messages',
	PATH: 'message',
	METHOD: 'GET',
	CORS_ORIGINS: ['*'],
	CORS_METHODS: ['GET'],
	CORS_HEADERS: [
		'Content-Type',
		'Authorization',
		'X-Amz-Date',
		'X-Api-Key',
		'X-Amz-Security-Token',
		'X-Amz-User-Agent',
	],
}
