terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region                  = "us-east-1"
  shared_credentials_file = "~/.aws/creds"
}

module "amis" {
  source = "mamemomonga/linux-ami/aws"
}

resource "aws_instance" "web" {
  ami           = module.amis.debian.10.amd64
  instance_type = "t3a.nano"
  subnet_id     = data.aws_subnets.essence.ids[0]
  key_name      = "essence.ooo"

  tags = {
    Name = "Szoreny"
  }
}

resource "aws_route53_record" "www" {
  zone_id = "ZACWKJFZKGM17"
  name    = "www.szoreny.essence.ooo"
  type    = "A"
  ttl     = "300"
  records = [aws_instance.web.public_ip]
}

data "aws_vpc" "essence" {
  id = "vpc-0893c5cc56984e122"
}

data "aws_subnets" "essence" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.essence.id]
  }
}