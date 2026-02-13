'use client'

import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) console.log(error.message)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={signInWithGoogle}
        className="px-6 py-3 bg-black text-white rounded-xl"
      >
        Sign in with Google
      </button>
    </div>
  )
}

