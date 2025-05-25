import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StageStackProps } from './types/stack-props';
import { DynamoDBStack } from './stacks/dynamodb-stack';
import { LambdaStack } from './stacks/lambda-stack';
import { ApiGatewayStack } from './stacks/api-gateway-stack'; 
import { S3Stack } from './stacks/s3-stack';
import { CloudFrontStack } from './stacks/cloudfront-stack'; 

export class AppStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: StageStackProps) {
		super(scope, id, props);
		const dynamo = new DynamoDBStack(this, `DynamoDB-${props.stage}`, props);
		const lambda = new LambdaStack(this, `Lambda-${props.stage}`, {
			...props,
			table: dynamo.table,
		});
		new ApiGatewayStack(this, `ApiGateway-${props.stage}`, {
			...props,
			lambdaFunction: lambda.fn
		});
		const s3 = new S3Stack(this, `S3-${props.stage}`, props);
		 new CloudFrontStack(this, `cloudfront-${props.stage}`, {
			...props,
			bucket: s3.bucket
		});
	}
}
