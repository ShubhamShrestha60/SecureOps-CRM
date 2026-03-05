# 📔 The SecureOps DevOps Master Handbook
### A-Z Guide for Local AlmaLinux 9.6 Deployment

This handbook is your definitive guide to setting up, securing, and orchestrating the SecureOps-CRM on your local hardware.

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
```bash
# Build images for the cluster
docker build -t secureops-backend:latest ./backend
docker build -t secureops-frontend:latest ./frontend

# Import into K3s (Crucial Step)
sudo k3s ctr images import <(docker save secureops-backend:latest)
sudo k3s ctr images import <(docker save secureops-frontend:latest)

# Install Chart
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
