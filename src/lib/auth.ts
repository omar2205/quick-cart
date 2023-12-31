import { user } from '$lib/client/userstore'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './firebase'

export const googleProvider = new GoogleAuthProvider()

export async function createUser(type: 'google' | 'github' = 'google') {
  return signInWithPopup(auth, googleProvider)
    .then((res) => {
      console.log('res', res)
      const creds = GoogleAuthProvider.credentialFromResult(res)
      const token = creds?.accessToken
      if ('user' in res) user.set(res.user)

      return res.user.getIdToken().then((id_token) => {
        fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify({ id_token }),
        })
        return res.user
      })
    })
    .catch((err) => {
      const error_code = err.code
      const error_message = err.message

      const email = err.customData.email

      console.log('ERROR\n', { error_code, error_message, email })
    })
}
