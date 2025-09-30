"use client"

import LoadingSpinner from "@/components/common/LoadingPage"
import { useSession } from "next-auth/react"
import type React from "react"

import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {

  const { status } = useSession()

  const isAuthenticated = status == "authenticated"
  const isLoading = status == "loading"


  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in"
        return
      }
    }

  }, [isAuthenticated, isLoading])

  if (status == "loading") return (<LoadingSpinner />)

  if (!isAuthenticated && !isLoading) {
    return null
  }

  return <>{children}</>
}
