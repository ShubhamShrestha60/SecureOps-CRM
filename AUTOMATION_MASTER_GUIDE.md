# 🏗️ Master Automation Guide: SecureOps-CRM

This document is your **Zero-To-Hero** guide for managing your DevSecOps project using Industry-Standard tools: **Ansible** and **Terraform**.

---

## 🛡️ 1. Ansible: The "Server Guard" (Day Zero)
Ansible is used to configure your OS (AlmaLinux) and install all the "heavy" software like Docker and K3s.

### 📍 Files:
- **`inventory.ini`**: Tells Ansible to work on your local machine.
- **`playbook.yml`**: The master script that locks down your firewall and installs K3s.

### 🚀 How to use it:
1.  **Install Ansible**:
    ```bash
    sudo dnf install -y epel-release
    sudo dnf install -y ansible
    ```
2.  **Run the Master Playbook**:
    ```bash
    cd infrastructure/ansible
    ansible-playbook -i inventory.ini playbook.yml --ask-become-pass
    ```

---

## 🏗️ 2. Terraform: The "Cluster Architect" (Application Lifecycle)
Terraform is used to manage **Kubernetes** and **Helm**. Instead of typing `kubectl` or `helm install` commands, you just describe what you want in code.

### 📍 Files:
- **`providers.tf`**: The connection bridge to your K3s cluster.
- **`main.tf`**: Manages Namespaces and labels.
- **`apps.tf`**: Automatically deploys your CRM via the Helm Chart.

### 🚀 How to use it:
1.  **Install Terraform**:
    ```bash
    sudo yum install -y yum-utils
    sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
    sudo yum -y install terraform
    ```
2.  **Automate your Deployment**:
    ```bash
    cd infrastructure/terraform
    terraform init    # Initialize the "Construction Crew"
    terraform apply   # Build the entire platform
    ```

---

## 🏆 Why is this "Industry Level"?

| Practice | Benefit |
| :--- | :--- |
| **Idempotency** | You can run the same script 100 times. If nothing changed, it does nothing. If a file is missing, it fixes it. |
| **State Tracking** | Terraform keeps a "Brain" (state file) of exactly what is running. |
| **Modular Design** | Separation of Infrastructure (Terraform) from Configuration (Ansible). |
| **Shift-Left Security** | Firewall and OS hardening are built into the *first* script you run. |

**You are no longer just "Running a project"—you are managing a secure, automated platform.** 🛡️🏁🔥✅
