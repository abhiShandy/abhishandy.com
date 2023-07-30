import { App, CfnOutput, RemovalPolicy, Stack } from "aws-cdk-lib";
import { CloudFrontWebDistribution } from "aws-cdk-lib/aws-cloudfront";
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { join } from "path";

const app = new App();

class MyStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    const bucket = new Bucket(this, "bucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    const cloudfrontDistribution = new CloudFrontWebDistribution(
      this,
      "Cloudfront",
      {
        errorConfigurations: [
          {
            errorCode: 403,
            errorCachingMinTtl: 10,
            responsePagePath: "/index.html",
            responseCode: 200,
          },
        ],
        defaultRootObject: "/index.html",
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
      }
    );

    new BucketDeployment(this, "ClientBucketDeployment", {
      destinationBucket: bucket,
      sources: [Source.asset(join(__dirname, "../dist"))],
      distribution: cloudfrontDistribution,
      distributionPaths: ["/index.html"],
    });

    new CfnOutput(this, "CloudFrontEndpoint", {
      value: cloudfrontDistribution.distributionDomainName,
    });
  }
}

new MyStack(app, "abhishandydotcom");
