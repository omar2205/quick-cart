import { env } from '$env/dynamic/private'
import { initializeApp, cert } from 'firebase-admin/app'

export const init_admin_app = () => {
  initializeApp(
    {
      credential: cert({
        projectId: env.PROJECT_ID,
        clientEmail: env.ADMIN_CLIENT_EMAIL,
        privateKey: env.ADMIN_PRIVATE_KEY,
      }),
    },
    // 'app-admin',
  )
}

export const admin = init_admin_app()
