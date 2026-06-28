'use client';
import { Button } from './ui/button';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme, type UseThemeProps } from 'next-themes';
import { cn } from '@/lib/utils';
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme() as UseThemeProps;

    return (
        <Button
            variant='default'
            size='icon'
            className={cn('group relative rounded-full bg-amber-900', {
                'bg-blue-300 duration-300 ease-in hover:bg-blue-900':
                    theme === 'dark',
                'bg-gray-900': theme === 'light',
            })}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <FaSun className='absolute h-4 w-4 scale-100 rotate-0 text-yellow-500 transition-all dark:scale-0 dark:-rotate-90' />
            <FaMoon className='absolute h-4 w-4 scale-0 rotate-90 text-blue-600 transition-all ease-in group-hover:text-blue-200 dark:scale-100 dark:rotate-0' />
        </Button>
    );
}
