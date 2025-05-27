# Hello React Project

このリポジトリは、Reactで構築されたシンプルな「Hello World」ウェブサイトをホストしています。また、このプロジェクトは、AWSサービスを活用してホスティングおよびバックエンド機能を提供します。インフラとデプロイメントのワークフローは、CI/CDパイプラインとInfrastructure as Code (IaC) を通じて完全に自動化されています。

## Features

- **AWS Services**:
  - **S3**: 静的ウェブサイトのホスティング。
  - **CloudFront**: コンテンツ配信とキャッシング。
  - **API Gateway**: バックエンドAPIの公開。
  - **AWS Lambda**: サーバーレス関数を使用したバックエンドロジック。
  - **DynamoDB**: データストレージ用のNoSQLデータベース。
- **Infrastructure as Code (IaC)**: AWS CDK (Cloud Development Kit) を使用してリソースを定義およびプロビジョニング。

## CI/CD Pipeline

このプロジェクトは、GitHub Actionsを使用して継続的インテグレーションとデプロイメントを行います：

 - すべてのコミットに対して自動的にビルドがトリガーされます。
 - AWSへのインフラおよびアプリケーションのデプロイメントは、パイプラインを通じてシームレスに処理されます。