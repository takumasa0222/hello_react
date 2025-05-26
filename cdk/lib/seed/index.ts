import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SEED_DATA } from "../constants/seed.constants";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event: any) => {
	const tableName = process.env.TABLE_NAME!;
	const key = {
		[SEED_DATA.PARTITION_KEY_NAME]: SEED_DATA.PARTITION_KEY_VALUE,
		[SEED_DATA.SORT_KEY_NAME]: SEED_DATA.SORT_KEY_VALUE,
	};

	const existing = await client.send(new GetCommand({ TableName: tableName, Key: key }));

	if (!existing.Item) {
		await client.send(
		new PutCommand({
			TableName: tableName,
			Item: {
				...key,
				[SEED_DATA.MESSAGE_KEY]: SEED_DATA.MESSAGE_VALUE,
			},
		})
	);
	console.log("Seed inserted.");
	} else {
		console.log("Seed already exists. Skipped.");
	}

	return {
		PhysicalResourceId: `${SEED_DATA.PARTITION_KEY_VALUE}-${SEED_DATA.SORT_KEY_VALUE}`,
	};
};
