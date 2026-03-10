# Implementation Plan: Production Hardening (Docker & K8s)

The current `backend/Dockerfile` is excellent for development/staging, but "Production-Ready" requires switching from the single-threaded PHP built-in server to a multi-process architecture.

## Proposed Changes

### 1. Backend Transformation (Dockerfile)
We will transition the backend to run on `php-fpm` and add performance optimizations.

#### [MODIFY] [backend/Dockerfile](file:///c:/Users/A%20C%20E%20R/Desktop/hello0/Project-Swatantrata/project/backend/Dockerfile)
- **Switch CMD**: Replace `php artisan serve` with `php-fpm`.
- **OpCache**: Enable and tune PHP OpCache for maximum performance.
- **Boot Optimization**: Add steps to pre-cache Laravel configurations and routes.
- **Security**: Remove `.env` creation (secrets should come from Kubernetes).

### 2. Infrastructure Evolution (Kubernetes)
To support `php-fpm`, we need a web server (Nginx) to talk to it.

#### [MODIFY] [k8s/helm/secureops-crm/templates/backend-deployment.yaml](file:///c:/Users/A%20C%20E%20R/Desktop/hello0/Project-Swatantrata/project/k8s/helm/secureops-crm/templates/backend-deployment.yaml)
- **Sidecar Pattern**: Add an `nginx` container to the backend pod.
- **Shared Volume**: Use an `emptyDir` volume to share the PHP socket/files between Nginx and PHP-FPM.
- **Readiness/Liveness Probes**: Add health checks to ensure the app is actually alive.

## Verification Plan

### Automated Tests
- **Linting**: Run `hadolint` via GitHub Actions to ensure no new violations.
- **Deployment**: Deploy to K3s and verify Nginx successfully proxies to PHP-FPM.

### Manual Verification
- Check Grafana for the new "PHP-FPM Process" metrics.
- Verify that `php artisan serve` is no longer running in the container process list.
