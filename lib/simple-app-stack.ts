import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class SimpleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const bucket = new Bucket(this,'MySimpleAppBucket',{
      encryption: BucketEncryption.S3_MANAGED      
    });
    
    // const getPhotos= new lambda.Function(this, 'MySimpleAppLambda', {
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   code: lambda.Code.fromAsset('api/get-photos'),
    //   handler: 'index.handler',
    // });    

    const getPhotos = new lambda.NodejsFunction(this, 'MySimpleAppLambda', {
      runtime: Runtime.NODEJS_12_X,
      entry: path.join(__dirname, '..', 'api', 'get-photos', 'index.ts'),
      handler: 'getPhotos',
    });

    new cdk.CfnOutput(this, 'MySimpleBucketNameExport', {
      value: bucket.bucketName,
      exportName: 'MySimpleBucketName'
    });
  }
}
