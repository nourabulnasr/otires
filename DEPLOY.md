# Otires Landing Page – Run, Build & Deploy

## 1. Local run command

From the project root (use **npm** if you don’t have pnpm installed):

```bash
npm run dev
```

Or with pnpm:

```bash
pnpm run dev
```

Then open **http://localhost:5173** (or the URL shown in the terminal).

- The email form posts to `/send_notification.php`. That script does **not** run under Vite, so "Notify Me" will fail with a network error in local dev unless you run a PHP-capable server (see "Testing the form locally" below).

**If you see an error:**  
- `"pnpm" is not recognized` → use `npm run dev` and `npm run build` instead.  
- `"vite" is not recognized` → run `npm install` once in the project folder, then run the command again.

---

## 2. Build command

From the project root:

```bash
npm run build
```

Or with pnpm:

```bash
pnpm run build
```

Output goes to the **`dist`** folder. Upload the **contents** of `dist` to your host (e.g. `public_html` on Namecheap), plus `send_notification.php` in the same directory as `index.html`.

---

## 3. Environment variables

**None required** for the current setup.

The only configuration is the **target email address** in `send_notification.php` (see "Where to configure the notification email" below).

---

## 4. Files changed / added

| Action   | Path |
|----------|------|
| Modified | `index.html` – script entry point set to `/src/main.tsx` |
| Modified | `src/app/App.tsx` – logo, layout, animations, form wired to PHP |
| Added    | `src/assets/otires-logo.jpeg` – copy of brand logo for stable imports |
| Added    | `send_notification.php` – backend handler for email signups |
| Added    | `DEPLOY.md` – this file |

---

## 5. Package installations

**None.** No new dependencies were added.

---

## 6. Deploying on Namecheap (with your domain)

### Prerequisites

- Domain pointed to Namecheap (e.g. otires.com).
- Hosting that supports **PHP** (e.g. Namecheap Shared Hosting).

### Where to configure the notification email

1. Open **`send_notification.php`** in the project root.
2. At the top, find:
   ```php
   $TARGET_EMAIL = 'notify@otires.com';
   ```
3. Change `notify@otires.com` to the inbox that should receive signups (e.g. `notify@yourdomain.com`).
4. Create that email address in your Namecheap/hosting control panel (e.g. Forwarding or Email Accounts) so the server can send to it.

### Build and upload

1. **Build the frontend**
   ```bash
   pnpm run build
   ```
2. In your hosting **File Manager** (or FTP), go to the web root (often **`public_html`**).
3. Upload **all contents** of the **`dist`** folder into `public_html` (so `index.html` is in `public_html`, and `assets/` etc. are there too).
4. Upload **`send_notification.php`** into the **same** folder as `index.html` (i.e. into `public_html`).

Resulting structure example:

```
public_html/
  index.html
  send_notification.php
  assets/
    ...
```

### After deployment

- Visit **https://yourdomain.com** (or http). You should see the Otires landing page.
- Submit an email on "Notify Me". You should see the success message and receive an email at `$TARGET_EMAIL` with subject **"New Otires Launch Notification Signup"**.

### If the form doesn’t work

- Confirm **PHP** is enabled for your hosting.
- Confirm `send_notification.php` is in the same directory as `index.html` and that its first line is `<?php`.
- Check that `$TARGET_EMAIL` is a valid address on your domain (or an address your server is allowed to send to).
- On shared hosting, `mail()` can be restricted; if email never arrives, consider using the host’s recommended method (e.g. SMTP) and updating the PHP script accordingly.

---

## Testing the form locally (optional)

To test "Notify Me" on your machine:

1. Build: `pnpm run build`
2. Copy `send_notification.php` into the `dist` folder.
3. From the `dist` folder, start a PHP server:
   ```bash
   php -S localhost:8000
   ```
4. Open **http://localhost:8000**, then submit the form. Mail may still not be sent unless your PHP is configured to send email (e.g. sendmail or SMTP).
