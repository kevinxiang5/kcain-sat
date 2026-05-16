import * as admin from "firebase-admin";

// Initialise once and reuse across hot-reloads (Next.js dev mode)
function getAdminApp(): admin.app.App {
  if (admin.apps.length) return admin.apps[0]!;

  // Service account can be provided as a JSON string in env (best for Vercel)
  // or falls back to the hardcoded kalshi-nono service account
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;

  let credential: admin.credential.Credential;
  if (raw && raw !== "{}") {
    try {
      const sa = JSON.parse(raw);
      credential = admin.credential.cert(sa);
    } catch {
      console.error("[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT JSON");
      credential = admin.credential.cert({
        projectId:   "kalshi-nono",
        clientEmail: "firebase-adminsdk-fbsvc@kalshi-nono.iam.gserviceaccount.com",
        privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") ?? "",
      });
    }
  } else {
    // Inline kalshi-nono service account (used when env var not set)
    credential = admin.credential.cert({
      projectId:   "kalshi-nono",
      clientEmail: "firebase-adminsdk-fbsvc@kalshi-nono.iam.gserviceaccount.com",
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") ?? KALSHI_PRIVATE_KEY,
    });
  }

  return admin.initializeApp({ credential });
}

// The private key stored as a constant so local dev works with zero env setup
const KALSHI_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClwx0fZkHnVWBQ
lK0j40SbdSjzxmram29+9Qh4l0KOajyouPLGa5uYwnwyE2l8KoMY62xgZJidqTRp
ylunWJY8WAHelVyb9lHMRU+HO1eaeWf6b6pcQDt3V5K3g4RkdjtwdSpF1h7Zm9+v
RAoBLdjjk4+SI5xbRgnozMxErddqMfjK39xqUX2MUvSVC8BBZksSaPUp1Gd+xYxZ
+S+TtQmYoLYB3/wu75iiekTAM/5Lu/VmNAVYVtwfWmAekeYJ/TBA1P2+aqIsvqty
RuSYwgHkjJWslYskaG4LuBJYkmksxZINn1zTOgaKC8QN/vfWs7aisp1cOzQ/D5wP
9ljOpaCzAgMBAAECggEACLMSQrUbrVfqO6Bp69HAJoaCFTUrI3j344pZnPaXTCEg
ONyoBSjdnClM2lXxec5DXhnw8Kgm6FNaiFjR8ZjxHY6i3nspRpgpV9alY1wGb3mC
rv6QStImLM/AR/hTiPA5k1/azZp8uP/4v9qKyeANm3gBl3JeAN5Oo9Snvcz/2rda
DkyGxbKsuivReEpeU0W/L4TbwqPn/t3GmuMIprhOcUXfWe+MOXOmUgyXBE1Kusac
8ocKbojF4LtB8azfYNFGcX+uUrNI5kM5Wf/jLZvZgxGZ4Y+E7/J94ixsujIODTc3
3D3Eou9HBlyZGpNYPEKk0ZZzMVcwJlmM2Cm9sDHBDQKBgQDSMVQFymE8tYQwSweD
5zccNN7Fe5B7CzNuDI73vKjB+xuUY4qjb5EDeshUsm4Q7tCHqGDKOFv7IRC5vNKA
suk+VD9nC18ozAD/hLUL+5oc3qvzuklq65/FDiR2HNlKniFcPBARKltqePK8Xs2f
nU76lFWJfqClCkXU1YHmENxuDQKBgQDJ4wCATqDXuBCgVOUwqAg47kh7Q47wOiDW
w3yi9llD0EHpjNmYiJlJhRxUZIjuEKQlWTKKdgrZvHHdsBknXQ7dSW0ALLqZYQeI
x9p53ZKLAbN1KkaUvlpLO//8pc0fWxQ4iczbl0+FpzZ4K+cwlSyI1NjLr0fB48tK
IkJLOWFZvwKBgGt9lHV9oKp2PUqhJA+9b356Py6I2UNDYCK4Q2jHzxmce+cv3Jdm
F6fK46YEtartJjEp142ysr9DkpUZziDI3eTlGqNsulZXtW72g8vD+HUpHpB+xMrs
AoG4kMbiS/EP2wmbIbBVk/hoL+JLLSaiQOB+eRveaPLdxQZpxYtNNh0FAoGAEW3x
qyIerMENXmo15z96hj+8Ljgk7QR3tVLnPcJ67mnaZulsF8kjQr+lNHwBflwdb8QF
owKR6T5lrjf30/gqwlwGdw9lhLxlxB9M81x3vFyHO8RMl6bfcMNbVFqUHPLmCgOL
liG4Edff0fwoV39pet61YNBfJ5QdBudyRcBMcU0CgYEA0bR0ST95egwzD3sWim0A
v9oqwHJq8SK2xQWopGX+94Gh2/pHHreiTlpFOzReSXoJnP1UUcEz7+J1ZsF654Xt
UbL+c2DXqdNtQLhzPjd63ck8U7/jABi/kr3W0IAjSF/1JVY9+9T4xmNLuOJWspso
LcXu7MpR/Ep6zcXnrmmh3lg=
-----END PRIVATE KEY-----`;

export const adminAuth = getAdminApp().auth();
