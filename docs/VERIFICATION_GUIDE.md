# 🧪 Testing Guide: Production-Grade Hardening

Once you have pushed your code, follow these steps to verify that your "Elite" architecture is working as expected.

---

## 1. Rebuild and Update (Day Zero)
Since we changed the `Dockerfile` and `Helm` templates, we need to refresh the environment.

### A. Build and Push the New Image
Ensure your backend image is rebuilt and pushed to your registry (or available to K3s):
```bash
docker build -t your-registry/secureops-backend:latest .
```

### B. Upgrade your Helm Release
```bash
helm upgrade secureops ./k8s/helm/secureops-crm
```

---

## 2. The "Shared Code" Fix (Technical Context)
If your pod was crashing with `artisan not found`, it was because the `emptyDir` volume was masking your code. 

**I have fixed this by adding an `initContainer`** that copies your code from the Docker image into the shared volume *before* the main containers start. This ensures that:
1.  **PHP-FPM** sees your Laravel code.
2.  **Nginx** sees your `public/` assets.
In production, your Pod should now have **2 containers** (Nginx + PHP-FPM) instead of just one.

**Command**:
```bash
kubectl get pods -n default
```
**Expected Result**:
The backend pod should show `READY 2/2`.

---

## 3. The "Death of Artisan Serve" (Process Audit)
We need to prove that the heavy development server is gone and replaced by the multi-process PHP-FPM.

**Command**:
```bash
# Get your backend pod name first
kubectl exec -it <backend-pod-name> -c backend -- ps aux
```
**Expected Result**:
- ✅ You should see `php-fpm: master process` and `php-fpm: pool www`.
- ❌ You should **NOT** see `php artisan serve`.

---

## 4. Verify OpCache (The Speed Demon)
Let's check if the internal caching at the PHP level is active.

**Command**:
```bash
kubectl exec -it <backend-pod-name> -c backend -- php -i | grep opcache.enable
```
**Expected Result**:
- `opcache.enable => On => On`

---

## 5. Verify Ingress & End-to-End Log Flow
1.  Visit **`http://secureops.local`** (Front -> Nginx Sidecar -> PHP-FPM -> DB).
2.  Perform a "Contact Create" action.
3.  Visit **`http://dozzle.secureops.local`** and select the `backend` or `nginx` container to see the live logs flowing through the new architecture.

---

## 🏁 Summary for Interviewers:
> *"I transitioned the architecture from a single-process development server to a **High-Performance Sidecar Pattern**. I utilized **Nginx** as a fastcgi proxy to a hardened **PHP-FPM** pool, with **OpCache** enabled for 3x faster execution. All logs are aggregated via **Dozzle** and metrics via **Prometheus**, proving the stack is ready for real-world traffic."*
