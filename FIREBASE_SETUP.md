# Firebase Setup Instructions for Wave Makers

## 🎯 What You've Got

Your Wave Makers swimming coaching website now has Firebase database integration! All booking form submissions and contact messages are automatically saved to a cloud database while still redirecting users to WhatsApp.

## 📋 What's Been Added

### Files Created:
- `firebase-config.js` - Firebase configuration and initialization

### Files Updated:
- `index.html` - Added Firebase SDK scripts
- `book.html` - Added Firebase SDK scripts
- `sessions.html` - Added Firebase SDK scripts
- `contact.html` - Added Firebase SDK scripts
- `script.js` - Added Firebase saving functionality

---

## 🔧 Step-by-Step Setup Guide

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `Wave Makers` (or any name you prefer)
4. Click **Continue**
5. (Optional) Enable Google Analytics
6. Click **Create project**

### Step 2: Register a Web App

1. In Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Register app name: `Wave Makers Website`
3. Check the box **"Also set up Firebase Hosting"** (optional)
4. Click **Register app**

### Step 3: Get Your Firebase Configuration

1. After registering, you'll see a code snippet with your config
2. Copy the `firebaseConfig` object values
3. You'll need these values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### Step 4: Update firebase-config.js

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",           // Your actual API key
  authDomain: "wave-makers-xxxx.firebaseapp.com",
  projectId: "wave-makers-xxxx",
  storageBucket: "wave-makers-xxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

3. Save the file

### Step 5: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **Create database**
3. Choose **Start in test mode** (for now)
4. Select a location closest to Gurgaon, India
5. Click **Enable**

### Step 6: Configure Security Rules (Important!)

For production, update your Firestore security rules:

1. In Firestore, click on **Rules** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create bookings
    match /bookings/{document=**} {
      allow create: if true;
      allow read, update, delete: if false; // Only you can read via console
    }
    
    // Allow anyone to create contacts
    match /contacts/{document=**} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

3. Click **Publish**

---

## 🎉 How It Works

### Booking Flow:
1. User fills out booking form on any page
2. Clicks "Send Booking via WhatsApp"
3. Data is saved to Firebase Firestore → `bookings` collection
4. User is redirected to WhatsApp with pre-filled message
5. You receive the WhatsApp message AND have data in database

### Contact Flow:
1. User fills out contact form
2. Clicks "Send Message via WhatsApp"
3. Data is saved to Firebase Firestore → `contacts` collection
4. User is redirected to WhatsApp
5. You have backup of all inquiries in database

---

## 📊 Viewing Your Data

### In Firebase Console:

1. Go to **Firestore Database**
2. You'll see two collections:
   - `bookings` - All booking submissions
   - `contacts` - All contact form submissions

3. Each document contains:
   - Name, email, phone
   - Package selected
   - Preferred date/time
   - Message
   - Source page URL
   - Timestamp
   - Status (pending/new)

---

## 🔍 Testing Your Integration

### Test 1: Submit a Booking

1. Open `index.html` in your browser
2. Click "Book Now" on any package
3. Fill out the form with test data
4. Submit
5. Check:
   - ✅ Form shows "Booking Sent!"
   - ✅ WhatsApp opens with pre-filled message
   - ✅ Data appears in Firebase Console → Firestore

### Test 2: Submit Contact Form

1. Open `contact.html`
2. Fill out contact form
3. Submit
4. Check:
   - ✅ Form shows "Message Sent!"
   - ✅ WhatsApp opens
   - ✅ Data appears in Firebase Console → contacts

---

## 🛠️ Troubleshooting

### "Firebase not initialized" error:
- Make sure `firebase-config.js` has your actual config values
- Check browser console for errors
- Verify Firebase SDK scripts load before your main script

### Data not appearing in Firestore:
- Check browser console for errors
- Verify Firestore is created in Firebase
- Check security rules allow writes

### Forms still work but don't save to database:
- Firebase config might be incorrect
- Check internet connection
- Look for CORS errors in console

---

## 📱 Optional: Export Data

You can export your data anytime:

1. Go to Firestore in Firebase Console
2. Click the `...` menu next to collection name
3. Select **Download data**
4. Choose JSON or CSV format

---

## 🔐 Security Best Practices

1. **Don't commit API keys to public repositories**
   - Add `firebase-config.js` to `.gitignore`
   - Use environment variables for production

2. **Update security rules** when ready for production
   - Don't leave in test mode indefinitely

3. **Monitor usage** in Firebase Console
   - Free tier: 50K reads/day, 20K writes/day
   - Usually plenty for small business

---

## 💡 Next Steps (Optional)

### Add Admin Dashboard:
- Create a private page to view all bookings
- Filter by date, package, status
- Mark bookings as confirmed/completed

### Email Notifications:
- Use Firebase Cloud Functions to send emails
- Trigger on new booking/Contact submission

### SMS Notifications:
- Integrate Twilio for SMS alerts
- Get instant notification for new bookings

---

## 📞 Support

If you need help:
1. Check Firebase Console documentation
2. Review browser console for errors
3. Test with sample data first

---

## ✅ Checklist

- [ ] Created Firebase project
- [ ] Registered web app
- [ ] Copied Firebase config
- [ ] Updated `firebase-config.js` with real values
- [ ] Created Firestore database
- [ ] Set up security rules
- [ ] Tested booking form
- [ ] Tested contact form
- [ ] Verified data appears in Firebase

---

**That's it! Your database is now ready to capture all bookings and contacts! 🎊**
