terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    # バックエンド設定は環境ごとに異なるため、terraform initの際に-backend-configで指定
    # bucket         = "your-terraform-state-bucket"
    # key            = "custom-dog-wear/terraform.tfstate"
    # region         = "ap-northeast-1"
    # encrypt        = true
    # dynamodb_table = "terraform-state-lock"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "custom-dog-wear"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# CloudFront用のプロバイダー（証明書はus-east-1リージョン必須）
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "custom-dog-wear"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
