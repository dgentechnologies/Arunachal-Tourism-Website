import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

/**
 * Returns the Firebase app singleton.
 * Lazy — only calls initializeApp on first use, which happens exclusively
 * from client-side code (useEffect / event handlers), so SSR / static
 * generation never tries to initialize with missing env vars.
 */
function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig)
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp())
}

// ── DB1 — Enterprise (hotels, vehicles, bookings, tour operators) ─────────────
// Uses the default Firestore database for the project.
export function getFirebaseDbEnterprise() {
  const dbId = process.env.NEXT_PUBLIC_FIRESTORE_DB_ENTERPRISE ?? "default"
  if (dbId === "default" || dbId === "(default)") {
    return getFirestore(getFirebaseApp())
  }
  return getFirestore(getFirebaseApp(), dbId)
}

// ── DB2 — Users (user profiles, saved trips, permit applications) ─────────────
export function getFirebaseDbUsers() {
  const dbId = process.env.NEXT_PUBLIC_FIRESTORE_DB_USERS ?? "arunachal-explore-users"
  return getFirestore(getFirebaseApp(), dbId)
}

// ── DB3 — CMS (circuits, activities, festivals, notices, permit info) ─────────
export function getFirebaseDbCms() {
  const dbId = process.env.NEXT_PUBLIC_FIRESTORE_DB_CMS ?? "arunachal-explore-cms"
  return getFirestore(getFirebaseApp(), dbId)
}

/**
 * @deprecated Prefer getFirebaseDbEnterprise(), getFirebaseDbUsers(), or
 * getFirebaseDbCms() to route data to the correct database.
 */
export function getFirebaseDb() {
  return getFirebaseDbEnterprise()
}

export function getFirebaseStorage() {
  return getStorage(getFirebaseApp())
}

export const googleProvider = new GoogleAuthProvider()
