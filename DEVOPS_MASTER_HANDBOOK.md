## �️ Chapter 0: The SecureOps Configuration Map
Before diving into commands, here is every configuration file in your project and exactly why it exists.

### 📁 Root Configuration
*   **`docker-compose.yml`**: The "Local Orchestrator." It allows you to run the entire stack (App, DB, Proxy) on your machine with one command.
*   **`Setup.txt`**: A quick-start note linking you to this Handbook.
*   **`DEVOPS_MASTER_HANDBOOK.md`**: This book! Your A-Z guide.

### 📁 GitHub Workflows (`.github/workflows/`)
*   **`devsecops.yml`**: The "Security Handshake." It scans your code for leaks, vulnerabilities, and building issues every time you push.

### 📁 Application Logic (`backend/` & `frontend/`)
*   **`backend/Dockerfile`**: The "Recipe" for the Laravel container. Optimized and secured.
*   **`frontend/Dockerfile`**: The "Recipe" for the React container.
*   **`frontend/nginx.conf`**: The "Traffic Warden" inside the frontend container that routes API calls to the backend.

### 📁 Kubernetes Orchestration (`k8s/`)
*   **`helm/secureops-crm/`**: The "Chart." This is a professional package that manages all Kubernetes deployments (Backend, Frontend, Services, Ingress) in one place.
*   **`monitoring/prometheus/`**: Scans your cluster for health and security metrics.
*   **`monitoring/grafana/`**: Visualizes those metrics in beautiful dashboards.

### 📁 Infrastructure as Code (`infrastructure/`)
*   **`terraform/main.tf`**: The "Simulation Template." It shows how you *would* build this on the AWS cloud (VPC, Security Groups).
*   **`ansible/hardening.yml`**: The "Drill Sergeant." It automatically hardens your AlmaLinux machine (Firewalls, SSH security, updates).

---

## 📖 Chapter 1: The Git Foundation
To use GitHub Actions, your code must be version-controlled and pushed to GitHub.

### 1.1 Local Initialization
```bash
# Initialize repo
git init

# Add all files
git add .

# Commit
git commit -m "feat: initial devsecops release"
```

### 1.2 GitHub Handshake
1. Create a **Private** repo on GitHub.
2. Link and push:
```bash
git remote add origin https://github.com/YOUR_USER/secureops-crm.git
git branch -M main
git push -u origin main
```

### 1.3 GitHub Actions Setup
The file `.github/workflows/devsecops.yml` is already configured. Every push will trigger:
- **Gitleaks**: Scans for leaked keys.
- **NPM/Composer Audit**: Scans for vulnerable dependencies.
- **SAST**: Scans your code for vulnerabilities.

---

## 🏗️ Chapter 2: Local Cluster Architecture (AlmaLinux 9.6)

### 2.1 Host Resolution
Since we aren't using a public domain, you must tell your machine that `secureops.local` points to itself.
```bash
# As root/sudo
echo "127.0.0.1 secureops.local" >> /etc/hosts
```

### 2.2 System Firewall
AlmaLinux uses `firewalld`. You must open these ports:
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=6443/tcp
sudo firewall-cmd --reload
```

---

## 🐳 Chapter 3: Containerization
We use Docker for standardized development.

### 3.1 Docker Setup
```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io
sudo systemctl enable --now docker
```

### 3.2 Running the Stack
```bash
docker compose up -d --build
```

---

## 🧠 Chapter 4: Orchestration (K3s)
K3s is a lightweight Kubernetes for your internal network.

### 4.1 Installation
```bash
curl -sfL https://get.k3s.io | sh -
# Permissions
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $USER:$USER ~/.kube/config
```

### 4.2 Deploying with Helm
Helm handles the orchestration logic. Since you used `docker compose` earlier, your images are already built!

```bash
# 1. Import existing images into K3s (Crucial Step)
# This moves them from Docker's cache into K3s's internal registry
sudo k3s ctr images import <(docker save secureops-crm-backend:latest)
sudo k3s ctr images import <(docker save secureops-crm-frontend:latest)

# 2. (Optional) Rebuild only if you changed code
# docker compose build

# 3. Install Chart
helm install secureops k8s/helm/secureops-crm
```

---

## 📊 Chapter 5: The Observability Stack
Metrics and Dashboards.

### 5.1 Deployment
```bash
kubectl create namespace monitoring
kubectl apply -f k8s/monitoring/prometheus/
kubectl apply -f k8s/monitoring/grafana/
```

### 5.2 Accessing UI
Use **Port Forwarding** since we are local:
```bash
kubectl port-forward svc/grafana 3000:80 -n monitoring
```
Visit `http://localhost:3000` (User: `admin`, Pass: `admin123`).

---

## 🛠️ Chapter 6: Infrastructure as Code (Simulation)

### 6.1 Terraform
Since you aren't on AWS, the `main.tf` is a **simulation** for your portfolio. It shows you understand VPCs, Subnets, and Security Groups.
To test locally:
```bash
terraform init
terraform plan # This will show you WHAT would be built on AWS
```

### 6.2 Ansible (Hardening)
This is **Live**. It will harden your AlmaLinux box.
```bash
cd infrastructure/ansible
ansible-playbook hardening.yml -c local -i "localhost,"
```

---
*Created for the SecureOps Portfolio.*
