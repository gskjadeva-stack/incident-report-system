# 💸 Completely Free Stack Discussion
## IR Monitoring System — Zero Cost Deployment

---

## ⚠️ IMPORTANT HONEST FINDINGS

Bago tayo mag-proceed, kailangan mong malaman ang **totoo** tungkol sa mga services na nasa original Option B plan:

---

### ❌ RAILWAY — HINDI FULLY FREE

Railway does **not** have a permanent free tier — the free tier is a **30-day trial only**.

The trial gives access to basic features for up to 30 days and includes a one-time grant of $5. After 30 days passes or $5 is spent, the free trial reverts to the Free plan, which provides only **$1 of free credit per month**.

The $1/month budget is the main constraint: it's enough to run occasional one-off tasks or test a deploy, **but not enough to keep a service online around the clock.**

> **Bottom line: Railway = ❌ NOT suitable for always-on, fully free system.**

---

### ⚠️ VERCEL — FREE PERO MAY MALAKING CAVEAT

The Hobby plan is for **personal, non-commercial use** only.

The Hobby plan gives you 100GB bandwidth, 1 million edge requests, 1 million function invocations, and 4 CPU-hours per month — all free. When you hit any limit, **your project pauses** rather than billing you.

> **Bottom line: Vercel = ✅ Free for frontend (React), pero restricted to non-commercial use. Okay pa rin for internal tools.**

---

### ⚠️ RENDER — FREE PERO MAY DATABASE EXPIRY ISSUE

Free PostgreSQL databases have a fixed storage capacity of **1 GB** and **expire 30 days after creation** — after which you have a 14-day grace period to upgrade before the database and its data are deleted. Free web services **spin down after 15 minutes of inactivity** and restart on the next request, with spin-up taking about one minute.

Render's free Postgres database is **hard-deleted after 30 days**. There is no automatic migration or warning before deletion. Teams building MVPs on the free tier have **lost data** because they did not notice the expiry date.

> **Bottom line: Render = ⚠️ Backend hosting is free but spins down; Database expires every 30 days. MALAKING RISK para sa IR data.**

---

## ✅ REAL SOLUTION: 100% FREE STACK (Revised)

Palitan natin ang Railway ng dalawang mas magandang libreng alternatives:

---

### 🔄 REVISED FREE STACK

| Layer | Dati (Option B) | Bagong FREE Alternative | Free Ba Talaga? |
|---|---|---|---|
| **Frontend** | Vercel | ✅ **Vercel** (Hobby) | ✅ Free forever |
| **Backend** | Railway | ✅ **Render** (Free Web Service) | ⚠️ Free, spins down after 15min inactivity |
| **Database** | Railway PostgreSQL | ✅ **Supabase** (Free PostgreSQL) | ✅ Free forever, no expiry |
| **File Attachments** | Cloudinary | ✅ **Supabase Storage** | ✅ 1GB free, kasama na |
| **Auth** | JWT custom | ✅ **Supabase Auth** | ✅ Free, 50K users/month |
| **Emails** | SendGrid | ✅ **Resend** (free tier) | ✅ 3,000 emails/month free |
| **Version Control** | GitHub | ✅ **GitHub** | ✅ Free |

---

## 🔍 DEEP DIVE: SUPABASE (Pinaka-importante)

Ito ang **best free PostgreSQL solution** para sa ating system:

Supabase provides a free tier with 500 MB database — **no credit card required, never expires, commercial use allowed.**

Supabase offers a free tier with **500 MB database storage, 1 GB file storage, 50,000 MAUs, and unlimited API requests.** Free projects pause after one week of inactivity, and you're limited to two active projects.

The platform bundles together everything you'd typically need: **database storage, user authentication, file storage, real-time subscriptions, edge functions for serverless logic, and automatically generated APIs.**

### ⚠️ Supabase Free Tier Caveat:
Projects on the free tier **pause after 7 days of inactivity.** Key limitation: Projects on the free plan that are inactive for 7 days will be paused.

> **Solusyon:** Regular na gagamitin ang system para hindi mag-pause. Kung mag-pause man, mag-re-resume siya sa susunod na access — hindi mawawala ang data.

---

## 🔍 DEEP DIVE: RENDER (Backend Hosting)

Render provides free web services, static sites, and PostgreSQL databases you can deploy directly from Git repositories. Connect a GitHub, GitLab, or Bitbucket repository, and Render detects the runtime and gives you a **live URL with HTTPS.**

### ⚠️ Render Free Tier Caveat:
Free web services **spin down after 15 minutes of inactivity.** This is not a minor inconvenience — if you are demoing to a client or a user hits your app at an odd hour, they see a **30 to 60 second blank screen** before anything loads.

> **Solusyon:** Mag-set up ng **cron job pinger** (e.g., UptimeRobot — libre) na mag-ping sa backend bawat 10 minutes para hindi mag-spin down.

---

## 📊 COMPLETE FREE TIER COMPARISON TABLE

| Service | Ano ang Libre | Limitasyon | Acceptable? |
|---|---|---|---|
| **Vercel** (Frontend) | 100GB bandwidth, forever free | Non-commercial only | ✅ Yes — internal tool lang naman |
| **Render** (Backend) | Free web service hosting | Spins down after 15min inactivity | ⚠️ Fixable with UptimeRobot pinger |
| **Supabase** (DB + Auth + Storage) | 500MB DB, 1GB storage, 50K users | Pauses after 7 days inactivity | ✅ Yes — regular use lang kailangan |
| **GitHub** | Unlimited public/private repos | None | ✅ Yes |
| **UptimeRobot** | 50 monitors, ping every 5 min | None for basic use | ✅ Yes — libre |
| **Resend** | 3,000 emails/month | 100 emails/day on free | ✅ Yes — IR system lang naman |

---

## 🔄 UPDATED ARCHITECTURE (100% Free)

```
┌─────────────────────────────────────────────────────┐
│              YOUR LAPTOP (Dev Only)                 │
│         Code → Push to GitHub → Auto Deploy         │
└──────────────────────┬──────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│     VERCEL      │         │     RENDER      │
│   (Frontend)    │◄───────►│    (Backend)    │
│   React App     │  REST   │  Node.js + API  │
│   ✅ FREE       │         │   ⚠️ FREE*      │
└─────────────────┘         └───────┬─────────┘
                                    │
                           ┌────────▼────────┐
                           │    SUPABASE     │
                           │  PostgreSQL DB  │
                           │  + Auth         │
                           │  + File Storage │
                           │   ✅ FREE       │
                           └─────────────────┘
                                    ▲
                           ┌────────┴────────┐
                           │  UPTIMEROBOT    │
                           │ Pings Render    │
                           │ every 10 min   │
                           │ (prevents      │
                           │  spin-down)    │
                           │   ✅ FREE       │
                           └─────────────────┘
```

---

## ⚡ UPDATED TECH STACK (Fully Free)

| Layer | Technology | Bayad? |
|---|---|---|
| Frontend | React.js + Tailwind CSS + shadcn/ui | ✅ Free (open source) |
| Frontend Hosting | Vercel Hobby | ✅ Free forever |
| Backend | Node.js + Express.js | ✅ Free (open source) |
| Backend Hosting | Render Free Web Service | ✅ Free (may spin-down) |
| Database | Supabase (PostgreSQL) | ✅ Free forever (500MB) |
| Auth | Supabase Auth | ✅ Free (50K users) |
| File Storage | Supabase Storage | ✅ Free (1GB) |
| ORM | Prisma | ✅ Free (open source) |
| Email | Resend Free Tier | ✅ Free (3K emails/mo) |
| Keep-Alive | UptimeRobot | ✅ Free |
| Version Control | GitHub | ✅ Free |

---

## ✅ FINAL VERDICT

```
┌──────────────────────────────────────────────────────┐
│                  TOTAL MONTHLY COST                  │
│                                                      │
│                      ₱ 0.00                         │
│                   $ 0.00 / month                     │
│                                                      │
│  Basta:                                              │
│  ✅ Gamitin ang system regularly (para hindi pause)  │
│  ✅ I-setup ang UptimeRobot (para hindi spin-down)   │
│  ✅ Monitor ang Supabase DB size (500MB limit)        │
└──────────────────────────────────────────────────────┘
```