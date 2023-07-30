import { App, CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
  CloudFrontWebDistribution,
  ViewerCertificate,
} from "aws-cdk-lib/aws-cloudfront";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { join } from "path";

const app = new App();

class MyStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName: "abhishandy.com",
    });

    const SSLCert = new Certificate(this, "SSLCert", {
      domainName: "abhishandy.com",
      validation: CertificateValidation.fromDns(hostedZone),
    });

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
        viewerCertificate: ViewerCertificate.fromAcmCertificate(SSLCert, {
          aliases: ["abhishandy.com"],
        }),
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

new MyStack(app, "abhishandydotcom", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
