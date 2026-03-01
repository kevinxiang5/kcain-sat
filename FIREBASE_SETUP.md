# Firebase setup for kcain SAT

You can use Firebase for:
1. **Firestore** – store all practice questions in a database (easy to add/edit without redeploying).
2. **Firebase Auth** – sign up, login, and **email verification** (Firebase sends the verification email for you).

This guide walks you through both. You can do Firestore first and add Auth later.

---

## Step 1: Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or use an existing one).
3. Name it (e.g. `kcain-sat`) and follow the prompts. You can turn off Google Analytics if you don’t need it.
4. When the project is ready, you’ll see the project overview.

---

## Step 2: Register your app (get config)

1. In the project overview, click the **Web** icon (`</>`) to add a web app.
2. Enter an app nickname (e.g. `kcain-web`) and optionally set up Firebase Hosting (you can skip it).
3. Click **Register app**. Firebase will show you a config object like:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

4. Copy those values; you’ll put them in `.env.local` in Step 5.

---

## Step 3: Enable Firestore (for questions)

1. In the left sidebar, go to **Build → Firestore Database**.
2. Click **Create database**.
3. Choose **Start in test mode** for development (you can lock rules later). Pick a location and confirm.
4. When the database is ready, you’ll see an empty database. The app will use a collection named `questions` (the seed script creates it).

**Optional – secure rules later (production):**  
In Firestore → **Rules**, you can restrict reads to authenticated users only, e.g.:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{q} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

---

## Step 4: Enable Authentication (for email verification)

1. In the left sidebar, go to **Build → Authentication**.
2. Click **Get started**.
3. Open the **Sign-in method** tab.
4. Click **Email/Password**, turn **Enable** on, and save.  
   (No need to enable “Email link” unless you want passwordless login.)
5. (Optional) Under **Templates** you can customize the “Email address verification” email.

Firebase will now send verification emails when you use `createUserWithEmailAndPassword` and `sendEmailVerification()`. You can later switch your app from NextAuth to Firebase Auth (see “Using Firebase Auth instead of NextAuth” at the end).

---

## Step 5: Add environment variables

1. In the project root, copy `.env.example` to `.env.local` if you don’t have it yet:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and add your Firebase config (use the values from Step 2):

```env
# Firebase (from Firebase Console → Project settings → Your apps)
NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abc123"
```

Use the **NEXT_PUBLIC_** prefix so the client can connect. Do not commit `.env.local` (it’s in `.gitignore`).

**Optional – server-side (e.g. seed script):**  
For running the seed script or server-only Firestore access:

1. In Firebase Console go to **Project settings** (gear) → **Service accounts**.
2. Click **Generate new private key** and save the JSON file somewhere safe.
3. Put the path to that file in `.env.local`:
   ```env
   FIREBASE_SERVICE_ACCOUNT_PATH="./firebase-service-account.json"
   ```
   Or paste the key as JSON in one line and use `GOOGLE_APPLICATION_CREDENTIALS` if you prefer.

---

## Step 6: Install Firebase and run the app

From the project root:

```bash
npm install firebase
```

Then seed the questions (one time) so Firestore has your practice bank:

1. Export questions to JSON (requires [tsx](https://github.com/privatenumber/tsx)):  
   `npx tsx scripts/export-questions.ts`  
   This creates `scripts/questions-seed.json`.

2. Seed Firestore (requires a [Firebase service account key](https://firebase.google.com/docs/admin/setup#initialize-sdk) and [firebase-admin](https://www.npmjs.com/package/firebase-admin)):  
   `npm install firebase-admin`  
   Then run:  
   `node --env-file=.env.local scripts/seed-questions-firestore.js`  
   (Or set `FIREBASE_SERVICE_ACCOUNT_PATH` to your JSON key path and run `node scripts/seed-questions-firestore.js`.)

If you haven’t set up the service account yet, the app still works and uses the local question bank until you run the seed.

Start the app:

```bash
npm run dev
```

- **Questions:** The app reads from Firestore if Firebase is configured; otherwise it uses the local `PRACTICE_QUESTIONS` array.
- **Auth:** The app still uses NextAuth and your current email verification (e.g. Resend) until you switch to Firebase Auth (see below).

---

## Summary

| Step | What you did |
|------|----------------|
| 1 | Created a Firebase project |
| 2 | Registered web app and copied config |
| 3 | Enabled Firestore (test mode) |
| 4 | Enabled Email/Password auth (for future email verification) |
| 5 | Added Firebase env vars to `.env.local` |
| 6 | Installed `firebase` and ran the seed script |

---

## Using Firebase Auth instead of NextAuth (optional)

To have **email verification (and auth) go through Firebase**:

1. Keep Firebase Auth enabled (Step 4) and use the same `.env.local` config.
2. In the codebase you would:
   - Use `createUserWithEmailAndPassword` and `sendEmailVerification()` on sign up.
   - Use `signInWithEmailAndPassword` and check `user.emailVerified` before allowing access.
   - Replace NextAuth `useSession` / `signIn` / `signOut` with Firebase Auth’s `onAuthStateChanged` and sign-in/sign-out methods.
3. **User progress (XP, completed lessons):**  
   - Either keep Prisma and create/link users by Firebase UID, or  
   - Move progress into Firestore (e.g. `users/{uid}/progress`).

A practical order is: get Firestore questions working first, then add a Firebase Auth provider and migrate the login/signup/verify flows one screen at a time. If you want, we can do the Firebase Auth migration step-by-step in a follow-up.
