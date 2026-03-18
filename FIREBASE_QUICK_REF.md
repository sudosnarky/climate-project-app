# 🚀 QUICK FIREBASE SETUP REFERENCE

## 30-Second Overview

```
1. Go to https://console.firebase.google.com
2. Create project → Enable Realtime Database (Test Mode)
3. Copy 7 config values from Project Settings → Web
4. Run: bash setup-firebase.sh (and paste those values)
5. Test: npm run dev → http://localhost:3000
6. Done! ✓
```

---

## Step-by-Step (5 minutes)

### 1️⃣ Create Firebase Project
- [ ] Go to https://console.firebase.google.com
- [ ] Click "Create a new project"
- [ ] Name it (e.g., `climate-bias-experiment`)
- [ ] Wait for creation to complete

### 2️⃣ Enable Realtime Database
- [ ] Click "Realtime Database" (left sidebar)
- [ ] Click "Create Database"
- [ ] Pick your region (closest to you)
- [ ] Select "Start in **Test Mode**"
- [ ] Click "Enable"

### 3️⃣ Get Credentials
- [ ] Click gear icon (⚙️) → "Project Settings"
- [ ] Go to "Web" tab
- [ ] Copy the config object with 7 values:
  - `apiKey`
  - `authDomain`
  - `databaseURL`
  - `projectId`
  - `storageBucket`
  - `messagingSenderId`
  - `appId`

### 4️⃣ Configure App
**Option A (Easiest):**
```bash
bash setup-firebase.sh
# Then paste your 7 values when prompted
```

**Option B (Manual):**
```bash
cp .env.example .env.local
# Edit .env.local with your 7 values
```

### 5️⃣ Test It
```bash
npm run dev
# Open http://localhost:3000
# Complete the experiment
# Check Firebase console for your response
```

---

## Environment Variables Reference

| Variable | Value | Example |
|----------|-------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | From Firebase config | `AIzaSyD...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | From Firebase config | `climate.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | From Firebase config | `https://climate...rtdb.firebaseio.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | From Firebase config | `climate-bias` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | From Firebase config | `climate.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | From Firebase config | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | From Firebase config | `1:123456789:web:abc...` |

---

## Test Real-Time Sync

1. Open experiment in **two browser tabs** simultaneously
2. In Tab A: Complete Phase 1 (select an option)
3. In Tab B: Watch the results screen update **live** (no refresh!)
4. ✓ Real-time sync works!

---

## Common Issues

| Problem | Solution |
|---------|----------|
| "Firebase not initialized" | Check `.env.local` exists with all 7 vars |
| No responses showing | Check Firebase Realtime DB > Data tab |
| Results not updating live | Verify both tabs use same Firebase project |
| Vercel deploy fails | Add all 7 env vars in Vercel dashboard |

---

## Security Upgrade (Before Going Live)

**Update Firebase Security Rules** to prevent abuse:

Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "responses": {
      ".read": true,
      ".write": true,
      "$uid": {
        ".validate": "newData.hasChildren(['phaseId', 'selectedOptionIndex', 'selectedOptionLabel', 'timestamp', 'sessionId'])"
      }
    }
  }
}
```

---

## Next Steps

- [ ] Create Firebase project
- [ ] Run `bash setup-firebase.sh` or configure manually
- [ ] Test locally: `npm run dev`
- [ ] Test real-time sync (two tabs)
- [ ] Deploy to Vercel
- [ ] Update Firebase security rules
- [ ] Share the live URL!

---

## Full Docs

See **FIREBASE_SETUP.md** for detailed walkthrough.

**Happy experimenting!** 🧪🌍
