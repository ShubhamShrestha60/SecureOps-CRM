# Monitoring Operations Guide: Prometheus & Grafana

This document details the configuration for industry-standard monitoring access in the SecureOps-CRM architecture, moving away from temporary port-forwarding to a permanent, domain-driven Ingress solution.

---

## 🏗️ Architecture Overview

| Component | Internal Service | Internal Port | External Domain |
|-----------|-----------------|---------------|-----------------|
| **Prometheus** | `prometheus.monitoring` | 80 | `prom.secureops.local` |
| **Grafana** | `grafana.monitoring` | 80 | `grafana.secureops.local` |
| **Dozzle** | `dozzle.monitoring` | 80 | `dozzle.secureops.local` |

---

## 🚀 Monitoring Setup Protocol

### 1. Ingress Configuration
We use the Traefik Ingress controller (standard in K3s) to route traffic based on Host headers.

#### Apply the Ingress Manifest
Run this on your VM:
```bash
kubectl apply -f k8s/monitoring/ingress-monitoring.yaml
```

### 2. Host Resolution (Windows Host)
Since we are using local domains, your Windows machine needs to know where to find the cluster.

**File Path**: `C:\Windows\System32\drivers\etc\hosts`
**Action**: Add the following lines (replace `<VM_IP>` with your VM's IP address):
```text
<VM_IP> prom.secureops.local
<VM_IP> grafana.secureops.local
<VM_IP> dozzle.secureops.local
```

### 3. Grafana Data Source Connection (The Internal Bridge)
To connect Grafana to Prometheus *internally* without exposing Prometheus to the public:

1.  Open **`http://grafana.secureops.local`** (Login: `admin` / `admin123`).
2.  Click the **Menu (☰)** > **Connections** > **Data Sources**.
3.  Click **Add data source** > Select **Prometheus**.
4.  In the **Connection** field, enter: `http://prometheus:80`
5.  Scroll to the bottom and click **Save & test**. You should see a green checkmark! ✅

---

## 🎨 Phase 2: Building the "Superb" UI

### 1. Import Industry-Standard Dashboards
Don't build everything from scratch. Use these professional dashboard IDs:
- **`1860`** (Node Exporter Full - Hardware/VM Health)
- **`14518`** (Kubernetes Cluster - Pod/Namespace Health)

### 2. The "Mission Control" Queries (Zero-Code)
Create panels in Grafana using these PromQL strings:
- **Request Rate**: `sum(rate(traefik_service_requests_total[5m]))`
- **Error %**: `sum(rate(traefik_service_requests_total{code=~"5.."}[5m])) / sum(rate(traefik_service_requests_total[5m])) * 100`

---

## 🛡️ DevOps Professional Verification

| Goal | Verification URL / Command |
|------|----------------------------|
| **Verify Scrape Targets** | `http://prom.secureops.local/targets` |
| **Live Logs** | `http://dozzle.secureops.local` |
| **Monitor Health** | `http://grafana.secureops.local` |

**Congratulations! Your observability stack is now running at an enterprise level.** 🛡️🏁🔥✅
