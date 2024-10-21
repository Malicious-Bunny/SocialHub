'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';

import { Button, Icons } from '@/components';

export const HomeHeader = () => {
  const { setTheme, theme } = useTheme();

  return (
    <header className="my-5 flex w-full items-center justify-between px-4 md:hidden">
      <Icons.logo />
      <div className="-mr-2 space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Icons.sun className="dark:hidden" />
          <Icons.moon className="hidden dark:block" />
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/chat">
            <Icons.send />
          </Link>
        </Button>
      </div>
    </header>
  );
};
