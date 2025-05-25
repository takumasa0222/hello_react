import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StageStackProps } from './types/stack-props';
import { DynamoDBStack } from './stacks/dynamodb-stack';
// import { RESOURCE_NAMES, ENV_KEYS, OUTPUT_KEYS } from './constants';
// import * as s3 from 'aws-cdk-lib/aws-s3';
// import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
// import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as apigateway from 'aws-cdk-lib/aws-apigateway';
// import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StageStackProps) {
	super(scope, id);
	const dynamo = new DynamoDBStack(this, `DynamoDB-${props.stage}`, props);
	const lambda = new DynamoDBStack(this, `Lambda-${props.stage}`, {
		...props,
		table: dynamo.table,
	});

	const table = new dynamodb.Table(this, RESOURCE_NAMES.TABLE_NAME, {
		partitionKey: {name: 'lang', type:dynamodb.AttributeType.STRING },
		sortKey: {name: 'type', type: dynamodb.AttributeType.STRING },
		billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
		removalPolicy: cdk.RemovalPolicy.RETAIN,
	});

	const func = new lambda.Function(this, RESOURCE_NAMES.LAMBDA_NAME, {
		runtime: lambda.Runtime.NODEJS_22_X,
		code: lambda.Code.fromAsset('../backend'),
		handler: 'index.handler',
		environment: {
			TABLE_NAME: table.tableName,
		},
		timeout: cdk.Duration.seconds(5),
		memorySize: ,
		description: ,
	})
      }
}
