# Deploying Maintenance Marshall to Cloudflare Workers.

A beginner-friendly, step-by-step guide to taking this project off Lovable and hosting it yourself on Cloudflare Workers at `maintenancemarshall.co.za`

> **Read this first.** Work through the sections in order. Don't skip ahead — later steps depend on values you collect earlier. Plan ~2 hours for the first deploy. Most of that is waiting for DNS

---

## Table of contents

1. [What you're building](#1-what-youre-building)
2. [Tools to install](#2-tools-to-install)
3. [Get the source code](#3-get-the-source-code)
4. [Set up your own Supabase project](#4-set-up-your-own-supabase-project)
5. [Set up Resend for email](#5-set-up-resend-for-email)
6. [Environment variables checklist](#6-environment-variables-checklist)
7. [Configure Cloudflare Workers](#7-configure-cloudflare-workers)
8. [First deploy (test URL)](#8-first-deploy-test-url)
9. [Connect your custom domain + DNS records](#9-connect-your-custom-domain--dns-records)
10. [Final verification](#10-final-verification)
11. [Common errors and fixes](#11-common-errors-and-fixes)
12. [Quick command reference](#12-quick-command-reference)

---

## 1. What you're building

```
Visitor → maintenancemarshall.co.za
            │
            ▼
   Cloudflare Workers (your site + server functions)
            │
            ├──► Supabase (database, storage, auth)
            └──► Resend (sends contact-form emails)
```

You will own three accounts: **Cloudflare** (hosting + DNS), **Supabase** (backend), **Resend** (email). All three have free tiers that are plenty for this site.

---

## 2. Tools to install

On your computer (Mac, Windows, or Linux):

| Tool | What it does | Install |
|---|---|---|
| **Node.js 20+** | Runs JavaScript | <https://nodejs.org> (pick the LTS version) |
| **Bun** | Package manager this project uses | `curl -fsSL https://bun.sh/install \| bash` (Mac/Linux) or see <https://bun.sh> |
| **Git** | Downloads your code | <https://git-scm.com/downloads> |
| **Wrangler** | Cloudflare's deploy tool | `npm install -g wrangler` |
| **Supabase CLI** | Pushes database changes | <https://supabase.com/docs/guides/local-development/cli/getting-started> |

After installing, open a terminal and check each works:

```bash
node --version       # should print v20 or higher
bun --version
git --version
wrangler --version
supabase --version
```

---

## 3. Get the source code

1. In Lovable, click the **GitHub** button (top right) → **Connect to GitHub** → create a new repo.
2. On your computer, clone it and install dependencies:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
bun install
```

You should now see folders like `src/`, `supabase/`, and a file called `wrangler.jsonc`.

---

## 4. Set up your own Supabase project

Lovable Cloud hides the service-role key, so for self-hosting you need your own Supabase project.

### 4.1 Create the project

1. Sign up at <https://supabase.com> → **New project**.
2. Pick a name (e.g. `maintenance-marshall`), set a strong **database password** (save it in a password manager — you'll need it once), pick the region closest to South Africa (`eu-west-1` is the closest available).
3. Wait ~2 minutes for it to finish provisioning.

### 4.2 Collect your Supabase keys

Go to **Project Settings → API**. Copy these four values into a temporary text file:

| Label in Supabase UI | What we'll call it later |
|---|---|
| Project URL | `SUPABASE_URL` |
| Project ID (the part before `.supabase.co`) | `SUPABASE_PROJECT_ID` |
| `anon` `public` API key | `SUPABASE_PUBLISHABLE_KEY` |
| `service_role` `secret` API key | `SUPABASE_SERVICE_ROLE_KEY` ⚠️ keep this secret |

### 4.3 Push the database schema

In your project folder, link your local code to your new Supabase project and push the migrations:

```bash
supabase login
supabase link --project-ref <your-project-id>
supabase db push
```

This runs every file in `supabase/migrations/` against your new database — creating the `contact_submissions` table, rate-limit table, RLS policies, and grants.

### 4.4 Create the storage bucket

In Supabase dashboard → **Storage** → **New bucket**:
- Name: `quote-attachments`
- Public: **OFF** (private)
- Click **Create**.

### 4.5 Deploy the email edge function

```bash
supabase functions deploy send-contact-email
supabase secrets set RESEND_API_KEY=<paste-from-step-5>
```

(You'll get the Resend key in step 5 — come back to this command after.)

### 4.6 Set the Site URL

Supabase dashboard → **Authentication → URL Configuration**:
- **Site URL**: `https://maintenancemarshall.co.za`
- **Redirect URLs**: add `https://maintenancemarshall.co.za/*` and `https://www.maintenancemarshall.co.za/*`

---

## 5. Set up Resend for email

1. Sign up at <https://resend.com>.
2. **Domains → Add Domain** → enter `maintenancemarshall.co.za`.
3. Resend shows you DNS records — **don't add them yet**, you'll add them in step 9 along with the Cloudflare records.
4. **API Keys → Create API Key** → name it `maintenance-marshall-prod`, permission `Sending access`. Copy the key (starts with `re_`). Save it — Resend won't show it again.
5. Go back to step 4.5 and run `supabase secrets set RESEND_API_KEY=re_...` with this key.

---

## 6. Environment variables checklist

Tick each one off as you collect it. You'll paste these into Cloudflare in step 7.

### Public variables (safe to commit, go in `wrangler.jsonc`)

- [ ] `VITE_SUPABASE_URL` — from §4.2 (e.g. `https://abcd1234.supabase.co`)
- [ ] `VITE_SUPABASE_PUBLISHABLE_KEY` — `anon public` key from §4.2
- [ ] `VITE_SUPABASE_PROJECT_ID` — project ref from §4.2
- [ ] `SUPABASE_URL` — same as `VITE_SUPABASE_URL` (server code reads this name)
- [ ] `SUPABASE_PUBLISHABLE_KEY` — same as the anon key

### Secret variables (NEVER commit, set via `wrangler secret put`)

- [ ] `SUPABASE_SERVICE_ROLE_KEY` — `service_role secret` key from §4.2
- [ ] `RESEND_API_KEY` — from §5.4

> **Why two copies of the same value?** Browser code reads `VITE_*` names; server code reads the un-prefixed names. This is a Vite convention.

---

## 7. Configure Cloudflare Workers

### 7.1 Create a Cloudflare account

Sign up at <https://cloudflare.com> (free). Verify your email.

### 7.2 Log Wrangler in

```bash
wrangler login
```

A browser tab opens — click **Allow**.

### 7.3 Edit `wrangler.jsonc`

Open `wrangler.jsonc` in your editor. Find (or add) a `"vars"` section and paste your **public** values:

```jsonc
{
  "name": "maintenance-marshall",
  "main": ".output/server/index.mjs",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "vars": {
    "VITE_SUPABASE_URL": "https://abcd1234.supabase.co",
    "VITE_SUPABASE_PUBLISHABLE_KEY": "eyJhbGc...",
    "VITE_SUPABASE_PROJECT_ID": "abcd1234",
    "SUPABASE_URL": "https://abcd1234.supabase.co",
    "SUPABASE_PUBLISHABLE_KEY": "eyJhbGc..."
  }
}
```

Keep the rest of the file as it is.

### 7.4 Set the secrets

Run these one at a time. Wrangler will prompt you to paste each value:

```bash
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put RESEND_API_KEY
```

---

## 8. First deploy (test URL)

```bash
bun run build
wrangler deploy
```

Wrangler prints a URL like `https://maintenance-marshall.<your-account>.workers.dev`. Open it in a browser — your site should load. Submit the contact form to check email delivery works before touching DNS.

If something fails, jump to [§11 Common errors](#11-common-errors-and-fixes).

---

## 9. Connect your custom domain + DNS records

### 9.1 Add the domain to Cloudflare

1. Cloudflare dashboard → **Add a site** → enter `maintenancemarshall.co.za` → **Free** plan.
2. Cloudflare scans your existing DNS records. Review them, then click **Continue**.
3. Cloudflare gives you **two nameservers** like `xxx.ns.cloudflare.com` and `yyy.ns.cloudflare.com`.
4. Go to your domain registrar (where you bought `maintenancemarshall.co.za` — e.g. domains.co.za, Afrihost, etc.) → find **Nameservers** for the domain → replace existing nameservers with the two Cloudflare ones.
5. Wait. Nameserver changes take 1–24 hours (usually under 2). Cloudflare emails you when ready.

### 9.2 Attach the worker to the domain

Once Cloudflare confirms the site is active:

1. Dashboard → **Workers & Pages** → click your `maintenance-marshall` worker.
2. **Settings → Domains & Routes → Add → Custom Domain** → enter `maintenancemarshall.co.za` → **Add**.
3. Repeat for `www.maintenancemarshall.co.za`.

Cloudflare auto-creates the right CNAME records and issues a free SSL certificate (takes ~2 minutes).

### 9.3 Add Resend DNS records

In Cloudflare dashboard → **DNS → Records → Add record**. Add **exactly** what Resend shows you in their dashboard for your domain. They'll look like this:

| Type | Name | Content | Priority | Proxy |
|---|---|---|---|---|
| MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` | 10 | DNS only (grey) |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | — | DNS only (grey) |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSq...` (long DKIM string from Resend) | — | DNS only (grey) |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | — | DNS only (grey) |

> ⚠️ Email DNS records must be **DNS only** (grey cloud), not proxied (orange). Click the orange cloud to toggle it grey.

After adding, return to Resend → **Domains** → **Verify DNS Records**. Status should turn green within a few minutes.

### 9.4 Final DNS summary for `maintenancemarshall.co.za`

After everything, your Cloudflare DNS tab should look roughly like this:

| Type | Name | Content | Proxy | Purpose |
|---|---|---|---|---|
| CNAME | `maintenancemarshall.co.za` | (auto-managed by Workers) | Proxied 🟠 | Website root |
| CNAME | `www` | (auto-managed by Workers) | Proxied 🟠 | www subdomain |
| MX | `send` | `feedback-smtp.<region>.amazonses.com` | DNS only ⚪ | Resend |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | DNS only ⚪ | SPF |
| TXT | `resend._domainkey` | (DKIM from Resend) | DNS only ⚪ | DKIM |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | DNS only ⚪ | DMARC |

---

## 10. Final verification

- [ ] `https://maintenancemarshall.co.za` loads with a padlock (HTTPS)
- [ ] `https://www.maintenancemarshall.co.za` also loads (or redirects to root)
- [ ] Submit the contact form → confirmation email arrives in your inbox
- [ ] In another browser/incognito, fill the form too fast (under 3 seconds) → it's silently rejected (bot protection working)
- [ ] Run `wrangler tail` and reload the site → no red error lines

If all six pass, you're live. 🎉

---

## 11. Common errors and fixes

### "Failed to resolve module" during `bun run build`
You skipped `bun install`. Run it.

### `wrangler deploy` says **Authentication error**
Run `wrangler login` again.

### Site loads but contact form returns **500 Internal Server Error**
Run `wrangler tail` in one terminal, submit the form again, and read the error. Most likely:
- `SUPABASE_SERVICE_ROLE_KEY` missing → re-run `wrangler secret put SUPABASE_SERVICE_ROLE_KEY`
- `Expected 3 parts in JWT` → you pasted the wrong key. The service role key is a long JWT with two dots.

### Contact form works but **no email arrives**
- Check Resend dashboard → **Logs**. If you see the send: check spam folder.
- If Resend shows nothing: the edge function isn't reaching Resend. Run `supabase functions logs send-contact-email` and look for the error.
- DKIM/SPF not yet verified in Resend → emails get rejected by Gmail. Wait for DNS to propagate, then re-verify in Resend.

### Custom domain shows **"This site can't be reached"** for more than 24h
Your nameservers haven't switched. Check at <https://dnschecker.org> by entering `maintenancemarshall.co.za` and selecting **NS**. If it's not showing Cloudflare's nameservers, fix this at your registrar.

### Browser shows **"Your connection is not private"** (SSL error)
Cloudflare hasn't issued the cert yet. Wait 5 minutes and reload. If it persists after 1 hour, in Cloudflare go to **SSL/TLS → Overview** and set encryption mode to **Full**.

### Form submissions return **"Too many requests"**
You hit the rate limit (3 per 10 minutes per IP). Wait 10 minutes or test from a different network.

### `bun run build` fails with **"VITE_SUPABASE_URL is not defined"**
The `VITE_*` vars need to exist at build time too. Create a `.env` file locally with the same five public values from §6 — the build reads them from there.

### After changing `wrangler.jsonc`, the new vars don't take effect
You must run `wrangler deploy` again. Secrets and vars only update on deploy.

---

## 12. Quick command reference

Save this section — these are the commands you'll re-run whenever you make changes.

```bash
# Pull latest code
git pull

# Install dependencies (after pulling)
bun install

# Apply new database migrations
supabase db push

# Redeploy email edge function (only if you changed it)
supabase functions deploy send-contact-email

# Rotate the Resend key
wrangler secret put RESEND_API_KEY
supabase secrets set RESEND_API_KEY=re_new_key

# Build + deploy site to Cloudflare
bun run build && wrangler deploy

# Watch live logs from Cloudflare
wrangler tail

# Watch live logs from Supabase edge function
supabase functions logs send-contact-email --tail
```

---

**You're done.** Bookmark this file. The only step you ever need to repeat for new code changes is the last one: `bun run build && wrangler deploy`.
