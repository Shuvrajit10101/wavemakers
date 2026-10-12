# Wave Makers

Static marketing and booking website for **Wave Makers**, a personal swimming coaching
service running sessions at pools in Gurgaon, Haryana (India). Five static HTML pages
cover the offer, the coach, session pricing, booking and contact. The booking and
contact forms save each submission to Firebase Firestore and then open a pre-filled
WhatsApp message to the business number, so an enquiry both reaches the coach's phone
and is recorded in the database.

## Stack

- Plain HTML, CSS and JavaScript — no framework, no build step, no `package.json`
- Firebase JS SDK 9.22.0 (compat build, loaded from the Google CDN) with Firestore for
  form submissions (`bookings` and `contacts` collections)
- SEO meta tags plus `LocalBusiness` JSON-LD schema markup in the page heads
- Deployed on Vercel — `vercel.json` rewrites `/` to `/index.html`, and the repo
  homepage points at https://wavemakers.vercel.app

## Running it

No tooling required. Clone the repo and open `index.html` in a browser, or serve the
folder over HTTP:

```
python -m http.server 8000
```

`firebase-config.js` holds the Firestore project settings and exposes `db`.
`FIREBASE_SETUP.md` documents how that project is created, how to enable Firestore and
how to set its security rules. If a Firestore write fails, the form still opens the
WhatsApp message as a fallback.

## Structure

```
index.html           home — packages, testimonial carousel, booking modal
about.html           coach and venue information
sessions.html        six session packages with pricing
book.html            booking form (name, email, phone, package, date, message)
contact.html         contact form and location
script.js            navbar, scroll animations, carousel, modal, form handling
styles.css           all styling
firebase-config.js   Firebase init, exposes `db` on window
images/              logo
```
