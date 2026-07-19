# Formspree contact form setup for DZ Auto Trade

Recommended setup: choose **Dashboard Project** for the contact page.

Why Dashboard Project:

- The site is plain HTML/CSS/JavaScript, not a framework app.
- You can manage the contact form, recipient email, notifications, spam protection, and integrations directly in Formspree.
- You do not need the Formspree CLI or a `formspree.json` deployment workflow for this repository.

## Form to create

Create one form inside the Formspree dashboard project named **DZ Auto Trade**:

- Suggested form name: `contact`
- Target email: `dzautotrade@gmail.com`
- Used by: `kontakt.html`

## Connect the contact page

After the form is created, open its **Integration** page and copy the endpoint that looks like:

```text
https://formspree.io/f/yourFormId
```

Then edit `formspree-config.js`:

```js
window.FORMSPREE_ENDPOINTS = {
  contact: 'https://formspree.io/f/YOUR_CONTACT_FORM_ID',
};
```

Until this endpoint is filled in, the contact form keeps the existing `mailto:dzautotrade@gmail.com` fallback so visitors can still contact support.

## Recommended Formspree settings

- Enable email notifications to `dzautotrade@gmail.com`.
- Enable spam protection.
- Add a clear subject template, for example `DZ Auto Trade - new contact request`.
- Optional later: connect Google Sheets or a CRM if you want to track inquiries outside email.
