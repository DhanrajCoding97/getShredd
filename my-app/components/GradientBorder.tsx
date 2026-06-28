'use client';

import { useEffect, type ReactNode } from 'react';
import {
    animate,
    motion,
    useMotionTemplate,
    useMotionValue,
} from 'motion/react';
import { twMerge } from 'tailwind-merge';

type GradientBorderProps = {
    children: ReactNode;
    className?: string;
    duration?: number;
};

export default function GradientBorder({
    children,
    className,
    duration = 4,
}: GradientBorderProps) {
    const turn = useMotionValue(0);

    useEffect(() => {
        const controls = animate(turn, 1, {
            ease: 'linear',
            duration,
            repeat: Infinity,
        });

        return () => controls.stop();
    }, [turn, duration]);

    const gradient = useMotionTemplate`
    conic-gradient(
      from ${turn}turn,
      transparent 0%,
      #f472b600 5%,
      #f472b6 10%,
      #c084fc 18%,
      #818cf8 26%,
      #38bdf8 34%,
      #2dd4bf 42%,
      #fbbf24 46%,
      #fbbf2400 52%,
      transparent 56%
    )
  `;

    return (
        <div className={twMerge('relative p-px', className)}>
            <motion.div
                style={{ backgroundImage: gradient }}
                className='absolute inset-0 rounded-[inherit]'
            />

            <div className='relative overflow-hidden rounded-[inherit]'>
                {children}

                <motion.div
                    style={{ backgroundImage: gradient }}
                    className='ai-glow-spill-mask pointer-events-none absolute inset-[-40%] z-10 opacity-70 blur-2xl'
                />
            </div>
        </div>
    );
}
