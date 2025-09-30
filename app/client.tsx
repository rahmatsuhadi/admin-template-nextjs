"use client"
import LoadingSpinner from "@/components/common/LoadingPage";
import { DashboardLayout } from "@/layouts/dashboard";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthGuard } from "./auth-guard";
import { LayoutSection } from "@/layouts/core";
import { AuthLayout } from "@/layouts/auth";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname()

    const isLogin = pathname == "/sign-in";

    if (isLogin) {
        return (
            <AuthLayout>
                {children}
            </AuthLayout>
        )
    }


    return (
        <AuthGuard>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </AuthGuard>

    );
}
