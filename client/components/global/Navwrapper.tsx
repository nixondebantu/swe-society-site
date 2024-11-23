
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  useEffect(() => {
    const isDashboardRoute = pathname?.startsWith('/dashboard');
    setShowNavbar(!isDashboardRoute);
  }, [pathname]);

  if (!showNavbar) {
    return null;
  }

  return <Navbar />;
}