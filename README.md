# SecureOps-CRM: Red-Team Grade CRM Platform

A premium, high-security CRM application built with **Laravel 11**, **React + Vite**, and a full **DevSecOps** ecosystem. This project demonstrates end-to-end software delivery engineering with a focus on deep observability, automated security, and infrastructure as code.

## 🚀 Key Features

### 💎 Application Tier
- **Cinematic UI**: React + Tailwind CSS v4 with glassmorphism and micro-interactions.
- **Deep Observability**: Real-time **Security Intelligence Portal** with automated audit logging and metadata diffing.
- **Secure API**: Standardized Laravel 11 backend with strict validation and API resource encapsulation.

### 🛡️ DevSecOps Tier
- **Containerization**: Multi-stage **Docker** builds for optimized delivery.
- **Orchestration**: Ready for **K3s (Kubernetes)** deployment via custom **Helm Charts**.
- **Observability**: **Prometheus & Grafana** integration for system health and security event tracking.
- **IaC & Automation**: **Terraform** for cloud provisioning and **Ansible** for server hardening.
- **Secure CI/CD**: **GitHub Actions** pipeline with:
    - Secret Scanning (Gitleaks)
    - SAST (Larastan/ESLint)
    - SCA (NPM/Composer Audit)

## 📁 Repository Structure

```
├── .github/workflows/    # Secure CI/CD Engine
├── backend/              # Laravel 11 Secure Core
├── frontend/             # React Cinematic Frontend
├── infrastructure/       # IaC (Terraform & Ansible)
├── k8s/                  # Kubernetes Orchestration
│   ├── helm/             # CRM Helm Charts
│   └── monitoring/       # Prometheus & Grafana Manifests
└── docker-compose.yml    # Rapid Environment Setup
```

## 🎬 Rapid Setup

### 1. Local Development (Standard)
- **Backend**: `cd backend && php artisan serve`
- **Frontend**: `cd frontend && npm run dev`

### 2. Containerized (Production Parity)
```bash
docker-compose up --build
```

## ✅ DevSecOps Compliance
Every commit undergoes a rigorous security handshake:
- **Secret Scan**: Ensures no API keys or credentials ever leave the local environment.
- **Static Analysis**: Automated code audit for vulnerabilities.
- **Dependency Audit**: Continuous monitoring for vulnerable third-party libraries.

---
*Created as a "God-Level" Portfolio Piece for Associate DevOps Engineering.*
