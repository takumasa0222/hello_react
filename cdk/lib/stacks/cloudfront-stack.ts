import { Construct } from "constructs";
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { StageStackProps } from "../types/stack-props";
import { CLOUDFRONT } from "../constants/cloudfront.constants";
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'

interface CloudFrontStackProps extends StageStackProps {
	bucket: s3.Bucket;
	apiDomainName: string;
}

export class CloudFrontStack extends Construct {
	public readonly distribution: cloudfront.Distribution;

	constructor (scope: Construct, id: string, props: CloudFrontStackProps) {
		super(scope, id);

		this.distribution = new cloudfront.Distribution(this, 'Distribution', {
			comment: CLOUDFRONT.COMMENT,
			defaultRootObject: CLOUDFRONT.DEFAULT_OBJ,
			defaultBehavior: {
				origin: origins.S3BucketOrigin.withOriginAccessControl(props.bucket),
				viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
			},
			additionalBehaviors: {
				"api/*": {
					origin: new origins.HttpOrigin(`${props.apiDomainName}/${props.stage}`
					, {
						protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY, 
					}),
					allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
					viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
					cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
					originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
				}
			}
		});
		
		new cdk.CfnOutput(this, 'DistributionUrl', {
			value: `https://${this.distribution.distributionDomainName}`,
		});
		new cdk.CfnOutput(this, 'apigatewayURLForCloudFront', {
			value: `${props.apiDomainName}/${props.stage}`,
		});
	}
}
