# Staging Deployment Walkthrough - Detailed Guide

Use this step-by-step guide to push your current work (Mock Flow + Email Integration) to the staging server.

## Phase 1: Local Machine (VS Code Terminal)

**Goal:** Save your changes and send them to the GitHub repository.

1.  **Open your Terminal** in VS Code.
2.  **Navigate to the Project Root** (if not already there):
    ```powershell
    cd C:\Users\Tai_Z790AeroG\Desktop\ahacws26
    ```
3.  **Stage and Commit your changes:**
    ```powershell
    git add .
    git commit -m "feat: implemented mock payment flow with gmail integration"
    ```
4.  **Push to GitHub:**
    ```powershell
    git push origin main
    ```
    *(Note: If your branch is not `main`, change `main` to your current branch name).*

---

## Phase 2: Connect to Staging Server

**Goal:** Log into the remote server to apply changes.

1.  **In your VS Code Terminal (or a new PowerShell window)**, run:
    ```powershell
    ssh user@162.240.72.87
    ```
2.  **Enter Password:** (Type your server password when prompted and press Enter. Characters won't show on screen).

---

## Phase 3: Update Environment Variables (Server Side)

**Goal:** Give the server your Gmail App Password so it can send emails.

1.  **Navigate to the API Directory:**
    *   (Assuming standard setup, adjust if your server path is different)
    ```bash
    cd /home/onjtfnmy/public_html/staging/apps/api
    ```
    *   *(We found the project via `ls`!)*

2.  **Open the `.env` file for editing:**
    ```bash
    nano .env
    ```

3.  **Add or Edit the SMTP Settings:**
    Scroll down using arrow keys. Paste or type these lines exactly.
    **IMPORTANT:** Replace `xxxx` with the 16-character App Password you generated from Google.

    ```ini
    SMTP_SERVER=smtp.gmail.com
    SMTP_PORT=465
    SMTP_USER=airperfection.itai@gmail.com
    SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
    ```

4.  **Save and Exit `nano`:**
    *   Press `Ctrl + O` (Control + Letter O) -> Then hit `Enter` to confirm filename.
    *   Press `Ctrl + X` (Control + Letter X) to exit editor.

---

## Phase 4: Download Code & Restart Services (Server Side)

**Goal:** Pull the new code from GitHub and restart the apps to see changes.

1.  **Navigate back to the Project Root:**
    ```bash
    cd /home/onjtfnmy/public_html/staging
    ```

2.  **Initialize Git (First Time Only):**
    *   Since the folder is empty (or has cgi-bin), we need to set it up. Run these 3 commands:
    ```bash
    git init
    git config --global --add safe.directory /home/onjtfnmy/public_html/staging
    git remote add origin https://github.com/TT-TechSoverign/ahacap26.git
    git pull origin main
    ```

    *(Note: We added `git config` first to prevent permission errors).*

3.  **Regular Updates (Future):**
    *   Next time, you only need to run:
    ```bash
    git pull origin main
    ```

4.  **Rebuild and Restart (Docker Method)**
    *   *System is likely running with Docker Compose.*
    ```bash
    # Rebuild the containers to apply changes (especially for Frontend/Web)
    docker-compose build

    # Restart the containers in the background
    docker-compose up -d
    ```

### Troubleshooting: Clearing Disk Space
*   **"Disk Space Full" (90%+ Usage)**
    *   **Cause:** Old Docker images and build caches are filling up the VPS.
    *   **Fix:** Run this surgical pruning command to free up several GBs:
        ```bash
        docker system prune -a --volumes -f
        ```
        *(Note: This removes unused images and caches but keeps your running database safe).*

    **OR** (If running manually without Docker):
    *   **Restart Backend:**
        ```bash
        cd apps/api
        # Assuming you use PM2
        pm2 restart api
        ```
    *   **Rebuild & Restart Frontend:**
        ```bash
        cd ../web
        pnpm install
        pnpm build
        pm2 restart web
        ```

---

## Phase 5: Verification

1.  Open your browser and go to: `https://staging.affordablehome-ac.com/shop`
2.  **Add an Item** to your cart.
3.  Proceed to **Checkout**.
4.  Click the **"Simulate Success"** button.
5.  **Check your Gmail** (`airperfection.itai@gmail.com`) for the receipt!

---

### ⚠️ Known Limitations (For Handoff)
*   **PDF Design**: The server will generate a **Basic PDF** (text only) because the "Premium" update wasn't applied successfully on local before handover.
*   **Email Format**: You will receive **3 emails** (Customer, Owner, Mock). We will clean this up to just "Owner Only" in the next session.
