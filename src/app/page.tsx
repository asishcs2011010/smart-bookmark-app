"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function HomePage() {

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from("bookmarks")   // your real table
        .select("*")

      console.log("DATA:", data)
      console.log("ERROR:", error)
    }

    testConnection()
  }, [])

  return (
    <div>
      <h1>Check browser console</h1>
    </div>
  )
}
