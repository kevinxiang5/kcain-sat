# Push to GitHub — Step by Step

## 1. Install Git (if you don't have it)
- Download: https://git-scm.com/download/win
- Run the installer (defaults are fine)
- **Restart your computer** or open a new Command Prompt after installing

---

## 2. Create a new repo on GitHub
- Go to https://github.com/new
- Repository name: `kcain-sat` (or whatever you like)
- Leave it empty (no README, no .gitignore)
- Click **Create repository**

---

## 3. Run these commands

Open **Command Prompt** or **PowerShell** in your project folder, or run:

```
cd "c:\Users\good\Desktop\sat project"
```

Then run these one at a time:

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/kcain-sat.git
git push -u origin main
```

**Replace `YOUR_GITHUB_USERNAME`** with your actual GitHub username (e.g. if your GitHub is github.com/johndoe, use `johndoe`).

---

## 4. When it asks for login
- GitHub may ask for your username and password
- For password, use a **Personal Access Token** instead of your regular password
- Create one: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Give it "repo" permission and copy it. Paste it when git asks for password.

---

Done! Your repo will be at `https://github.com/YOUR_USERNAME/kcain-sat`. You can now import it in Vercel.
