"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function NavigationIndicatorPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/navigation-indicator/home');
  }, [router]);

  return null;
}