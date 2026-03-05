# Main Terraform Configuration for SecureOps Node
provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "secure_ops_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "secureops-network"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id     = aws_vpc.secure_ops_vpc.id
  cidr_block = "10.0.1.0/24"
  tags = {
    Name = "secureops-public"
  }
}

resource "aws_security_group" "k3s_sg" {
  name        = "k3s-security-group"
  description = "Minimal ports for K3s and SSH"
  vpc_id      = aws_vpc.secure_ops_vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Should be restricted to IP in production
  }

  ingress {
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
