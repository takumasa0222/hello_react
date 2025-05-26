import { Construct } from "constructs";
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { StageStackProps } from "../types/stack-props";
import { API_GATEWAY } from "../constants/api-gateway.constants";
import * as cdk from 'aws-cdk-lib';
import { createResourceName } from "../utils/naming";

interface ApiGatwayStackProps extends StageStackProps {
	lambdaFunction: lambda.Function;
}

export class ApiGatewayStack extends Construct {
	public readonly httpApi: apigwv2.HttpApi;

	constructor (scope: Construct, id: string, props: ApiGatwayStackProps) {
		super(scope, id);

		const apiGatewayName = createResourceName(API_GATEWAY.BASE_NAME, props.stage);
		this.httpApi = new apigwv2.HttpApi(this, 'HttpApi', {
			apiName: apiGatewayName,
			description: API_GATEWAY.DESCRIPTION,
		});
		this.httpApi.addRoutes({
			path: API_GATEWAY.PATH,
			methods: [apigwv2.HttpMethod.GET],
			integration: new integrations.HttpLambdaIntegration('LambdaIntegration', props.lambdaFunction),
		});

	}
}
