import { App, CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
  ViewerCertificate,
} from "aws-cdk-lib/aws-cloudfront";
import {
  ARecord,
  AaaaRecord,
  HostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  EventType,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { SnsDestination } from "aws-cdk-lib/aws-s3-notifications";
import { Topic } from "aws-cdk-lib/aws-sns";
import { CfnWebACL } from "aws-cdk-lib/aws-wafv2";
import { join } from "path";

const app = new App();

class MyStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const domainName = "abhishandy.com";

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName,
    });

    const SSLCert = new Certificate(this, "SSLCert", {
      domainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const logBucket = new Bucket(this, "serverAccessLogs", {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      accessControl: BucketAccessControl.LOG_DELIVERY_WRITE,
    });

    const bucket = new Bucket(this, "bucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      serverAccessLogsBucket: logBucket,
      serverAccessLogsPrefix: "s3/website/",
      enforceSSL: true,
    });

    const bucketTopic = new Topic(this, "S3-topic");

    bucket.addEventNotification(
      EventType.OBJECT_REMOVED,
      new SnsDestination(bucketTopic)
    );

    logBucket.addEventNotification(
      EventType.OBJECT_REMOVED,
      new SnsDestination(bucketTopic)
    );

    const oai = new OriginAccessIdentity(this, "OAI");
    bucket.grantRead(oai);

    const webAcl = new CfnWebACL(this, "WebACL", {
      defaultAction: {
        allow: {},
      },
      scope: "CLOUDFRONT",
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        sampledRequestsEnabled: true,
        metricName: "website-webacl",
      },
      rules: [
        {
          name: "AWS-AWSManagedRulesAmazonIpReputationList",
          priority: 0,
          statement: {
            managedRuleGroupStatement: {
              name: "AWSManagedRulesAmazonIpReputationList",
              vendorName: "AWS",
            },
          },
          overrideAction: {
            none: {},
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            sampledRequestsEnabled: true,
            metricName: "AWS-AWSManagedRulesAmazonIpReputationList",
          },
        },
      ],
    });

    const cloudfrontDistribution = new CloudFrontWebDistribution(
      this,
      "Cloudfront",
      {
        viewerCertificate: ViewerCertificate.fromAcmCertificate(SSLCert, {
          aliases: [domainName],
        }),
        webACLId: webAcl.attrArn,
        loggingConfig: {
          bucket: logBucket,
          prefix: "cloudfront",
        },
        defaultRootObject: "/index.html",
        errorConfigurations: [
          {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html",
            errorCachingMinTtl: 0,
          },
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html",
            errorCachingMinTtl: 0,
          },
        ],
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: oai,
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

    new ARecord(this, "ARecord", {
      recordName: domainName,
      target: RecordTarget.fromAlias(
        new CloudFrontTarget(cloudfrontDistribution)
      ),
      zone: hostedZone,
    });

    new AaaaRecord(this, "AaaaRecord", {
      recordName: domainName,
      target: RecordTarget.fromAlias(
        new CloudFrontTarget(cloudfrontDistribution)
      ),
      zone: hostedZone,
    });

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
