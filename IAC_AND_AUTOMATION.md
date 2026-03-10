# 🛠️ Infrastructure as Code (IaC) & Automation Guide

This document outlines the professional automation strategy used in **SecureOps-CRM**. We use **Terraform** for infrastructure provisioning and **Ansible** for configuration management, specifically tailored for a local/on-prem environment.

---

## 🏗️ 1. Terraform: The Infrastructure Blueprint
Terraform is used as the "Autopilot" for your Kubernetes cluster. Instead of manual `kubectl` commands, we define our desired state in code.

### 📍 Location: `infrastructure/terraform-local/`
- **`providers.tf`**: Connects Terraform to your local `/~.kube/config`.
- **`main.tf`**: Defines namespaces and system-level ConfigMaps.

### 🚀 Usage Commands:
```bash
cd infrastructure/terraform-local
terraform init    # Initialize plugins
terraform plan    # Preview changes
terraform apply   # Execute automation
```

### 💡 Why this is used:
- **Reproducibility**: You can rebuild your entire K8s structure from scratch in seconds.
- **State Management**: Terraform keeps track of exactly what is running, preventing "Configuration Drift."

---

## 🛡️ 2. Ansible: The Configuration Guard
Ansible is used for "Day Zero" setup—automating the security and software installation of the AlmaLinux operating system.

### 📍 Location: `infrastructure/ansible/`
- **`inventory`**: Lists the target servers (currently `localhost`).
- **`hardening.yml`**: Automates OS security (Fail2Ban, Firewalld, SSH Hardening).
- **`setup_env.yml`**: Automates software installation (Docker, K3s, Git, JQ).

### 🚀 Usage Commands:
```bash
# Install Ansible (if not present)
sudo dnf install -y epel-release
sudo dnf install -y ansible

# Run Security Hardening
ansible-playbook -i inventory hardening.yml --ask-become-pass

# Run Environment Setup
ansible-playbook -i inventory setup_env.yml --ask-become-pass
```

### 💡 Why this is used:
- **Scalability**: The same scripts can secure 1 server or 1,000 servers.
- **Compliance**: Ensures every server in your environment follows the same security standard (DevSecOps best practice).

---

## 🏆 Summary of the Automation Cycle

| Tool | Focus | Role | Analogy |
|------|-------|------|---------|
| **Ansible** | **Operating System** | Configuration & Security | The Security Guard & Electrician |
| **Terraform** | **Cluster/Orchestration** | Provisioning & Scaling | The Digital Blueprint & Architect |
| **Helm** | **Application** | Deployment & Packaging | The Package Delivery Service |

**Together, these tools ensure that SecureOps-CRM is "Code-First," automated, and production-ready from Day One.** 🛡️🏁✅
