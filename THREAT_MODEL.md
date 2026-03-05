# Threat Model: SecureOps-CRM

This document identifies potential threat vectors for the SecureOps-CRM platform and documents the countermeasures implemented.

| Threat Category | Description | Countermeasure Implemented |
| :--- | :--- | :--- |
| **Credential Leakage** | Developers accidentally committing API keys or DB passwords. | **Gitleaks** integrated into GitHub Actions; `.env` listed in `.gitignore`. |
| **SQL Injection** | Malicious input bypassing data sanitization. | **Eloquent ORM** parameter binding; strict validation in `FormRequests`. |
| **Unauthorized Access** | Non-admin users viewing or modifying sensitive fragments. | **Laravel Policy Layers** and `SecurityLog` auditing for every transaction. |
| **Dependency Vulnerability** | Using outdated or compromised third-party libraries. | **SCA (NPM/Composer Audit)** running in the CI/CD pipeline. |
| **Unprotected Ingress** | External attacks targeting the application server. | **Nginx Reverse Proxy** and **UFW Hardening** via Ansible. |

## Risk Assessment Matrix

| Threat | Likelihood | Impact | Strategy |
| :--- | :--- | :--- | :--- |
| XSS / Injection | Medium | High | Mitigation (Validation + CSP) |
| DDOS | Low | High | Acceptance (Cloud Ingress Protection) |
| Insider Threat | Low | Medium | Detection (Detailed Audit Logs) |

---
*Authorized by SecureOps Architecture Team.*
