import { initializeApp, cert } from 'firebase-admin/app'

import info from '../../../quick-cart-adminsdk.json' assert { type: 'json' }

export const admin = initializeApp({
  credential: cert({
    projectId: info.project_id,
    clientEmail: info.client_email,
    privateKey: info.private_key,
  }),
}, 'app-admin')
