# Resend email setup

Resend sends verification and password-reset emails for Cain. Follow these steps to enable it.

## 1. Create a Resend account

1. Go to [resend.com](https://resend.com) and sign up (free tier is enough to start).
2. Confirm your email if prompted.

## 2. Get your API key

1. In the Resend dashboard, go to **API Keys** (or **Integrations** → **API Keys**).
2. Click **Create API Key**.
3. Name it (e.g. `cain-production`) and choose **Sending access**.
4. Copy the key (it starts with `re_`). You won’t see it again.

## 3. Add the key to your app

**Local (`.env`):**

```env
RESEND_API_KEY="re_your_actual_key_here"
```

**Vercel (production):**

1. Open your project on [vercel.com](https://vercel.com).
2. **Settings** → **Environment Variables**.
3. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** your key (e.g. `re_...`)
   - **Environment:** Production (and Preview if you want).
4. Save and redeploy so the new variable is used.

## 4. Test it

- Sign up with a real email on your site. You should get a “Verify your Cain account” email.
- If you don’t, check Resend’s **Logs** for errors and that `RESEND_API_KEY` is set in the environment you’re using.

## Optional: use your own domain (e.g. cainsat.org)

By default, emails are sent from `onboarding@resend.dev`. To send from something like `noreply@cainsat.org`:

1. In Resend: **Domains** → **Add Domain** → enter `cainsat.org`.
2. Add the DNS records Resend shows (MX, TXT, etc.) at your domain registrar (e.g. GoDaddy). Wait until the domain shows as verified.
3. In your app, set:

   ```env
   EMAIL_FROM="Cain <noreply@cainsat.org>"
   ```

4. Add `EMAIL_FROM` to Vercel env vars too, then redeploy.

Until the domain is verified, keep using the default (no `EMAIL_FROM`) or Resend will reject sends.

## Summary

| Step | What to do |
|------|------------|
| 1 | Sign up at resend.com |
| 2 | Create an API key, copy it |
| 3 | Put `RESEND_API_KEY` in `.env` (local) and Vercel (production) |
| 4 | (Optional) Add and verify your domain, then set `EMAIL_FROM` |

After that, verification and password-reset emails will send automatically.
