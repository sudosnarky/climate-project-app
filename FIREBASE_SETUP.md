# Firebase Setup Guide

## Quick Start

### Option 1: Automated Setup (Easiest)

```bash
cd /home/snarky404/GitHubRepos/ClimateProject/climate-project-app
bash setup-firebase.sh
```

The script will:
1. Guide you through creating a Firebase project
2. Prompt you to collect your credentials
3. Automatically create `.env.local` with your configuration
4. Verify everything is set up correctly

### Option 2: Manual Setup

Follow these detailed steps below.

---

## Manual Firebase Setup

### Step 1: Create Firebase Project

1. Go to **[Firebase Console](https://console.firebase.google.com)**
2. Click **"Create a project"** or **"Add project"**
3. Enter a name (example: `climate-bias-experiment`)
4. Accept the defaults
5. Click **"Create project"**
6. Wait for creation to complete (~1 minute)

### Step 2: Enable Realtime Database

1. In the left sidebar, find and click **"Realtime Database"** (under "Build" section)
2. Click **"Create Database"**
3. Select your region (choose the one closest to your users)
4. **IMPORTANT**: Select **"Start in Test Mode"** (allows read/write for development)
5. Click **"Enable"**

**Test Mode Rules** (for development):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### Step 3: Get Firebase Config Credentials

1. Click the **gear icon** (⚙️) in the top-left corner
2. Select **"Project Settings"**
3. Find the **"Web"** tab (you may need to click "Add app" if no apps exist)
4. Look for the config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "climate-bias-experiment.firebaseapp.com",
  databaseURL: "https://climate-bias-experiment-default-rtdb.firebaseio.com",
  projectId: "climate-bias-experiment",
  storageBucket: "climate-bias-experiment.appspot.com",
  messagingSenderId: "123456789012345",
  appId: "1:123456789012345:web:abc123def456ghi789"
};
```

**Copy all 7 values** (you'll need them in the next step)

### Step 4: Create `.env.local` File

In the `climate-project-app` directory, create a file called `.env.local`:

**Important**: Never commit this file to git!

```bash
# Copy the template
cp .env.example .env.local

# Then edit .env.local with your credentials:
```

Or manually create `.env.local` with these 7 variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Replace all `your_*` values with your actual Firebase credentials**

### Step 5: Test Firebase Connection

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

1. Complete the experiment
2. Open [Firebase Console](https://console.firebase.google.com)
3. Navigate to **Realtime Database**
4. You should see your response under `/responses`

### Step 6: Test Real-Time Sync (Optional but Recommended)

1. Open the experiment in **two browser tabs** (or use Incognito + Normal mode)
2. On **Tab A**: Answer all three phases
3. On **Tab B**: Watch the results screen - it should update live as Tab A submits
4. No page refresh needed!

---

## Troubleshooting

### "Firebase is not initialized" Error

**Problem**: App crashes on startup  
**Solution**: 
- Verify `.env.local` exists in the correct directory
- Ensure all 7 `NEXT_PUBLIC_*` variables are filled in
- Restart dev server: `npm run dev`

### No Responses Showing Up

**Problem**: See 0% on results screen  
**Solution**:
- Check Firebase console → **Realtime Database** → **Data** tab
- Should see `/responses` with your submissions
- If empty:
  1. Verify database is in "Test Mode"
  2. Check browser console (F12) for errors
  3. Verify `.env.local` credentials are correct

### Real-Time Updates Not Working

**Problem**: Results don't update across tabs  
**Solution**:
- Verify both devices/tabs are on the same Firebase project
- Check browser console for WebSocket errors
- Check network tab (F12) for Firebase connections
- Ensure database is enabled and in Test Mode

### Vercel Deployment Error: "Firebase is undefined"

**Problem**: Build fails on Vercel  
**Solution**:
- Add all 7 `NEXT_PUBLIC_*` variables to **Vercel Project Settings** → **Environment Variables**
- Variable names must match exactly (case-sensitive)
- Redeploy after adding vars

---

## Security: Transition to Production

**⚠️ Warning**: Test Mode allows anyone to read/write data. Before going live:

### Update Firebase Security Rules

1. Go to Firebase Console → **Realtime Database** → **Rules** tab
2. Replace with production rules:

```json
{
  "rules": {
    "responses": {
      ".read": true,
      ".write": true,
      "$uid": {
        ".validate": "newData.hasChildren(['phaseId', 'selectedOptionIndex', 'selectedOptionLabel', 'timestamp', 'sessionId'])"
      }
    },
    ".read": false,
    ".write": false
  }
}
```

This allows:
- ✅ Anyone to read responses
- ✅ Anyone to write responses with required fields
- ✅ Prevents empty or malformed submissions

3. Click **"Publish"**

---

## What Each Environment Variable Does

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Authenticates your app with Firebase | `AIzaSyD...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase authentication domain | `climate-bias.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | Realtime Database URL (where data lives) | `https://climate-bias...firebaseio.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Unique project identifier | `climate-bias-experiment` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Cloud storage (not used in this app) | `climate-bias.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | For push notifications (not used in this app) | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app identifier | `1:123456789:web:abc...` |

**Note**: These are *public* Firebase keys (marked `NEXT_PUBLIC_`). They're safe to expose in the frontend. Never expose your *private* keys.

---

## Next Steps

After Firebase setup:

1. ✅ Test locally: `npm run build && npm run start`
2. ✅ Verify real-time sync works
3. ✅ Deploy to Vercel (add env vars)
4. ✅ Update security rules for production
5. ✅ Share the live URL!

---

## Support

- **Firebase Docs**: https://firebase.google.com/docs/database
- **Next.js Docs**: https://nextjs.org/docs
- **Project README**: See README.md in this directory
