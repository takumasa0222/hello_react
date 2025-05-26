import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Duration } from 'aws-cdk-lib';
import { createResourceName } from '../utils/naming';
import { StageStackProps } from '../types/stack-props';
import { SEED_LAMBDA } from '../constants/seed.constants';

interface SeedLambdaStackProps extends StageStackProps {
  table: dynamodb.Table;
}

export class SeedLambdaStack extends Construct {
	constructor(scope: Construct, id: string, props: SeedLambdaStackProps) {
		super(scope, id);

		const functionName = createResourceName(SEED_LAMBDA.BASE_NAME, props.stage);
		const seedFn = new lambda.Function(this, 'SeedFunction', {
			functionName,
			runtime: lambda.Runtime.NODEJS_22_X,
			code: lambda.Code.fromAsset(SEED_LAMBDA.CODE_ASSET_PATH),
			handler: SEED_LAMBDA.HANDLER,
			timeout: Duration.seconds(SEED_LAMBDA.TIMEOUT_SECONDS),
			environment: {
				TABLE_NAME: props.table.tableName,
			},
		});
		props.table.grantReadWriteData(seedFn);
		new cdk.CustomResource(this, 'SeedData', {
			serviceToken: seedFn.functionArn,
		});
	}
}