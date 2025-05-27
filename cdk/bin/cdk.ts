#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/app-stack';

const app = new cdk.App();
const stage = app.node.tryGetContext('stage');

new AppStack(app, `AppStack-${stage}`, {
  stage: stage,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, 
		region: process.env.CDK_DEFAULT_REGION || "ap-northeast-1"},

});