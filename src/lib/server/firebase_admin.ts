import { env } from '$env/dynamic/private'
import { initializeApp, cert } from 'firebase-admin/app'

export const admin = initializeApp({
  credential: cert({
    projectId: env.PROJECT_ID,
    clientEmail: env.ADMIN_CLIENT_EMAIL,
    privateKey: env.ADMIN_PRIVATE_KEY,
  }),
}, 'app-admin')
