# Deploying the SecureOps CRM using the Helm Provider
resource "helm_release" "secureops_crm" {
  name       = "secureops-crm"
  chart      = "../../k8s/helm/secureops-crm"
  namespace  = "default" # Aligned with current deployment
  
  # We can override values.yaml here if needed
  set {
    name  = "backend.replicaCount"
    value = "1"
  }

  values = [
    file("../../k8s/helm/secureops-crm/values.yaml")
  ]
}

# Industry Level: Managing the Monitoring stack as a Terraform-managed Release
# Note: This assumes the monitoring manifests are also Helm-ready or we use a public chart
# For now, we point to our existing local setup logic
resource "kubernetes_config_map" "terraform_anchor" {
  metadata {
    name      = "terraform-sync-anchor"
    namespace = "monitoring"
  }

  data = {
    "managed" = "true"
    "author"  = "Antigravity"
  }
}
