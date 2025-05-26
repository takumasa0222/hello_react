import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { StageStackProps } from "../types/stack-props";
import { API_GATEWAY } from "../constants/api-gateway.constants";
import { createResourceName } from "../utils/naming";

interface ApiGatwayStackProps extends StageStackProps {
	lambdaFunction: lambda.Function;
}

export class ApiGatewayStack extends Construct {
	public readonly restApi: apigw.RestApi;

	constructor (scope: Construct, id: string, props: ApiGatwayStackProps) {
		super(scope, id);

		const apiGatewayName = createResourceName(API_GATEWAY.BASE_NAME, props.stage);
		this.restApi = new apigw.RestApi(this, 'RestApi', {
			restApiName: apiGatewayName,
			description: API_GATEWAY.DESCRIPTION,
			defaultCorsPreflightOptions: {
			  allowOrigins: apigw.Cors.ALL_ORIGINS,
			  allowMethods: apigw.Cors.ALL_METHODS,
			},
		});
		const message = this.restApi.root.addResource(API_GATEWAY.PATH);
		if (!message.node.tryFindChild('OPTIONS')) {
			message.addCorsPreflight({
			  allowOrigins: API_GATEWAY.CORS_ORIGINS,
			  allowMethods: API_GATEWAY.CORS_METHODS,
			  allowHeaders: API_GATEWAY.CORS_HEADERS,
			  allowCredentials: true,
			});
		}
		message.addMethod(
			API_GATEWAY.METHOD,
			new apigw.LambdaIntegration(props.lambdaFunction, {
			  proxy: true,
			})
		);
	}
}
