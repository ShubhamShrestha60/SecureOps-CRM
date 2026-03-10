# Professional Namespace Management
resource "kubernetes_namespace" "secureops" {
  metadata {
    name = "default" # We use default for now per current setup, but could switch to 'secureops'
  }
}

resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
  }
}

# Industry Practice: Using locals to manage common metadata
locals {
  common_labels = {
    Project     = "SecureOps-CRM"
    ManagedBy   = "Terraform"
    Environment = "Local"
  }
}
