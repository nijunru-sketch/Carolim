# Deploy Notes

This project is a plain static site.

## Structure

- Entry: `index.html`
- Static pages:
  - `career-moody.html`
  - `career-zuijiao.html`
  - `career-exory.html`
  - `whyme.html`
  - `whyme-detail.html`
  - `why-cork.html`
  - `contact.html`
- Shared assets: `assets/`

No build step is required.

## Recommended Production Path

Use:

1. GitHub as source control
2. Tencent Cloud CVM as static host
3. Nginx to serve the files

## What You Need Before Going Live

Prepare these values:

- GitHub repo URL
- Tencent Cloud server IP
- SSH user
- SSH private key path
- Domain name, if any

## Server Directory

Recommended deploy target:

`/var/www/junru-portfolio`

## First-Time Server Setup

Install Nginx:

```bash
sudo apt update
sudo apt install -y nginx
```

Create site directory:

```bash
sudo mkdir -p /var/www/junru-portfolio
sudo chown -R $USER:$USER /var/www/junru-portfolio
```

Copy the Nginx config template:

```bash
sudo cp deploy/nginx-portfolio.conf /etc/nginx/sites-available/junru-portfolio
sudo ln -s /etc/nginx/sites-available/junru-portfolio /etc/nginx/sites-enabled/junru-portfolio
sudo nginx -t
sudo systemctl reload nginx
```

## Publish From Local Machine

Edit environment variables inline, then run:

```bash
SERVER_HOST=your.server.ip \
SERVER_USER=ubuntu \
TARGET_DIR=/var/www/junru-portfolio \
bash deploy/publish-static.sh
```

Optional SSH key:

```bash
SERVER_HOST=your.server.ip \
SERVER_USER=ubuntu \
SSH_KEY=~/.ssh/your_key \
TARGET_DIR=/var/www/junru-portfolio \
bash deploy/publish-static.sh
```

## Domain Setup

If you use a domain:

1. Point the domain A record to the Tencent Cloud server IP
2. Update `server_name` in `deploy/nginx-portfolio.conf`
3. Reload Nginx

## HTTPS

Recommended:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Deployment Scope

The publish script uploads only runtime files:

- `index.html`
- `styles.css`
- `main.js`
- `career-exory.html`
- `career-exory.js`
- `career-moody.html`
- `career-zuijiao.html`
- `whyme.html`
- `whyme-detail.html`
- `why-cork.html`
- `why-cork-section.css`
- `why-cork-section.js`
- `contact.html`
- `assets/`

It intentionally does not upload local scratch files like screenshots or mockups.
