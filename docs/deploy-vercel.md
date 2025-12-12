# Deploy to Vercel (step-by-step)

This document describes deploying the site to Vercel and configuring a custom domain registered at `registro.br`.

## Option A — Deploy from Git (recommended)
1. Push your repository to GitHub / GitLab / Bitbucket:

```bash
git add .
git commit -m "initial"
git push origin main
```

2. In Vercel (https://vercel.com), click **New Project** → Import your repo.
3. Vercel usually detects Vite. Confirm build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy — Vercel will give you a preview URL (`*.vercel.app`).

## Option B — Deploy from your machine (Vercel CLI)
1. Install and login:

```bash
npm i -g vercel
vercel login
```

2. From the project root run:

```bash
vercel    # follow interactive prompts
vercel --prod   # to create a production deployment
```

When asked for project directory, answer `.` if you're already in the project root.

## Configure custom domain (registro.br)
### Recommended: keep DNS at registro.br and add records
1. In Vercel Project → Domains → Add domain (yourdomain.com.br).
2. Vercel will show DNS records to add. In registro.br, open your domain and go to **Configurar endereçamento** / **Editar Zona**.
3. Add (exactly) these records:

- A record (apex/root)
  - Tipo: A
  - Nome/Host: (leave blank or `@` as the UI requires)
  - Valor: `76.76.21.21`

- CNAME for `www`
  - Tipo: CNAME
  - Nome/Host: `www`
  - Valor: `cname.vercel-dns.com.`

4. Save changes and wait for propagation (minutes → hours). In Vercel click Verify.
5. Once verified, Vercel will provision TLS automatically. Choose `www` or apex as primary and enable redirects.

### Alternative: delegate DNS to Vercel
1. In Vercel, choose “Let Vercel manage DNS” for your domain — it will show nameservers.
2. In registro.br → **Alterar Servidores DNS**, paste the Vercel nameservers (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`, etc.) into the server fields.
3. Save. After propagation, manage all DNS records in Vercel.

**Warning:** switching nameservers requires migrating any existing records (MX, TXT) into Vercel DNS to avoid service interruption.

## Verify with dig
```bash
```markdown
# Deploy to Vercel (step-by-step)

This document describes deploying the site to Vercel and configuring a custom domain registered at `registro.br`.

## Option A — Deploy from Git (recommended)
1. Push your repository to GitHub / GitLab / Bitbucket:

```bash
git add .
git commit -m "initial"
git push origin main
```

2. In Vercel (https://vercel.com), click **New Project** → Import your repo.
3. Vercel usually detects Vite. Confirm build settings:
   - Build command: `npm run build` (this runs `tsc -b && vite build` in this project)
   - Output directory: `dist`
4. Deploy — Vercel will give you a preview URL (`*.vercel.app`).

## Option B — Deploy from your machine (Vercel CLI)
1. Install and login:

```bash
npm i -g vercel
vercel login
```

2. From the project root run:

```bash
vercel    # follow interactive prompts
vercel --prod   # to create a production deployment
```

When asked for project directory, answer `.` if you're already in the project root.

## Configure custom domain (registro.br)
### Recommended: keep DNS at registro.br and add records
1. In Vercel Project → Domains → Add domain (yourdomain.com.br).
2. Vercel will show DNS records to add. In registro.br, open your domain and go to **Configurar endereçamento** / **Editar Zona**.
3. Add (exactly) these records:

- A record (apex/root)
  - Tipo: A
  - Nome/Host: (leave blank or `@` as the UI requires)
  - Valor: `76.76.21.21`

- CNAME for `www`
  - Tipo: CNAME
  - Nome/Host: `www`
  - Valor: `cname.vercel-dns.com.`

4. Save changes and wait for propagation (minutes → hours). In Vercel click Verify.
5. Once verified, Vercel will provision TLS automatically. Choose `www` or apex as primary and enable redirects.

### Alternative: delegate DNS to Vercel
1. In Vercel, choose “Let Vercel manage DNS” for your domain — it will show nameservers.
2. In registro.br → **Alterar Servidores DNS**, paste the Vercel nameservers (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`, etc.) into the server fields.
3. Save. After propagation, manage all DNS records in Vercel.

**Warning:** switching nameservers requires migrating any existing records (MX, TXT) into Vercel DNS to avoid service interruption.

## Verify with dig
```bash
dig +short A yourdomain.com.br
# should return 76.76.21.21

dig +short CNAME www.yourdomain.com.br
# should return cname.vercel-dns.com.
```

## Troubleshooting
- If verification fails, re-check records for typos and ensure only the required records exist for the same host.
- If you have email (MX) records, ensure they remain configured after any nameserver changes.

```