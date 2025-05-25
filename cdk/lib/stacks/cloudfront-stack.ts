import { Construct } from "constructs";
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { StageStackProps } from "../types/stack-props";
import { CLOUDFRONT } from "../constants/cloudfront.constants";
import { createResourceName } from "../utils/naming";
import * as s3 from 'aws-cdk-lib/aws-s3'

interface CloudFrontStackProps extends StageStackProps {
	bucket: s3.Bucket;
}

export class CloudFrontStack extends Construct {
	public readonly distribution: cloudfront.Distribution;

	constructor (scope: Construct, id: string, props: CloudFrontStackProps) {
		super(scope, id);

		// const distName = createResourceName(CLOUDFRONT.BASE_NAME, props.stage);
		this.distribution = new cloudfront.Distribution(this, 'Distribution', {
			comment: CLOUDFRONT.COMMENT,
			defaultBehavior: {
				origin: new origins.S3StaticWebsiteOrigin(props.bucket),
				viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
			}
		});
	}
}
