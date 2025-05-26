import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TABLE_NAME = "my-seed-table"; //

const seedItem = {
	lang: "jp",
	type: "default",
	message: "Hello World!!",
};

async function main() {
	try {
		await client.send(
			new PutCommand({
				TableName: TABLE_NAME,
				Item: seedItem,
				ConditionExpression: "attribute_not_exists(lang) AND attribute_not_exists(type)",
			})
		);
	} catch (err: any) {
		if (err.name === "ConditionalCheckFailedException") {
			console.log("ℹ️ Item already exists. Skipped.");
		} else {
			console.error("Error seeding data:", err);
			process.exit(1);
		}
	}
}

main();
