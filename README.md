# ZBAZAAR SOLUTIONS PRIVATE LIMITED – OneReachAll Official Website

**Tagline**: Connected Conversations. One Reach.  
**Indian Helpline**: +91 77458 43216  
**Email**: None displayed on website (as per enterprise privacy policy)  
**Live Local Preview**: [http://localhost:8080/](http://localhost:8080/)

---

## 📁 Project Structure

```
Alfia/
├── index.html              # Flagship Homepage with Interactive RCS Smartphone Simulator & Solutions
├── about-us.html           # About Us (Heritage, Telecom Pillars, Footprint, Industries)
├── privacy-policy.html     # Privacy Policy (TRAI / DPDP compliant, zero email)
├── terms-conditions.html   # Terms & Conditions (AUP, Telecom SLA & Compliance)
├── contact-us.html         # Contact Us (Helpline + WhatsApp + Lead Form with DND Consent)
├── 404.html                # Not Found fallback page
├── assets/
│   ├── css/
│   │   └── style.css       # Complete responsive CSS, smartphone bezel, themes, animations
│   ├── js/
│   │   └── main.js         # Interactive RCS preview, 1-tap OTP copy, form handler
│   └── images/
│       ├── logo.jpg        # Official Brand Logo
│       └── banner.png      # Official Network Banner (High-Res)
└── README.md
```

---

## 🚀 1. Local Preview

The website is currently hosted and running live on your system:
👉 **[http://localhost:8080](http://localhost:8080)**

If you ever need to restart the local server, simply open terminal in the `Alfia` folder and run:
```bash
python -m http.server 8080
```

---

## 🐙 2. How to Upload to GitHub

Open terminal / PowerShell inside the `Alfia` folder:

```bash
cd "c:\Users\Immense\Downloads\Nexora-SMS-SMPP-Panel-Repaired\Alfia"

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "ZBAZAAR SOLUTIONS PRIVATE LIMITED - OneReachAll website"

# Rename branch to main
git branch -M main

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git

# Push to GitHub
git push -u origin main --force
```

---

## 🌐 3. Enable GitHub Pages & Connect Custom Domain

1. Open your repository on GitHub.
2. Click **Settings** ➔ **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
   - Click **Save**.
4. In ~1 minute, GitHub will give you a live URL (e.g. `https://<username>.github.io/<repo>/`).

### Connecting Your Custom Domain:
1. Under the same **Pages** settings, scroll to **Custom domain**.
2. Enter your domain (e.g. `onereachall.in`).
3. Click **Save** and check **Enforce HTTPS**.
4. In your DNS provider (Cloudflare, GoDaddy, Hostinger, Namecheap), add these DNS records:
   - **Apex A Records (@)**:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **www CNAME Record**:
     - `<YOUR-GITHUB-USERNAME>.github.io`
