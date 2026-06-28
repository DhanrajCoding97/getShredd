import { ReactNode } from 'react';
import {
    animate,
    motion,
    useMotionTemplate,
    useMotionValue,
} from 'motion/react';
import { useEffect } from 'react';
import { FiChevronDown, FiLoader } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

type GradientBorderProps = {
    children: ReactNode;
    className?: string;
    duration?: number;
};
type GradientAnimationCardProps = {
    children: ReactNode;
};

/**
    IMPORTANT!!
  
    This component requires the following CSS class to be present for the inner glow:
  
    .ai-glow-spill-mask {
      mask-image: radial-gradient(
        ellipse 100% 100% at 50% 50%,
        transparent 50%,
        black 100%
      );
    }
   */

// const Example = () => {
//   return (
//     <div className="px-4 py-24 bg-neutral-950">
//       <AIGradientAnimationCard />
//     </div>
//   );
// };

const AIGradientBorder = ({
    children,
    className,
    duration = 4,
}: GradientBorderProps) => {
    const turn = useMotionValue(0);

    useEffect(() => {
        animate(turn, 1, {
            ease: 'linear',
            duration,
            repeat: Infinity,
        });
    }, [duration, turn]);

    const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #f472b600 5%, #f472b6 10%, #c084fc 18%, #818cf8 26%, #38bdf8 34%, #2dd4bf 42%, #fbbf24 46%, #fbbf2400 52%, transparent 56%)`;

    return (
        <div className={twMerge('relative p-px', className)}>
            <motion.div
                style={{ backgroundImage: gradient }}
                className='absolute inset-0 rounded-[inherit]'
            />

            <div className='relative overflow-hidden rounded-[inherit]'>
                <div className='relative'>{children}</div>

                <motion.div
                    style={{ backgroundImage: gradient }}
                    className='ai-glow-spill-mask pointer-events-none absolute inset-[-40%] z-10 overflow-hidden opacity-70 blur-2xl'
                ></motion.div>
            </div>
        </div>
    );
};

const GradientAnimationCard = ({ children }: GradientAnimationCardProps) => {
    return (
        <AIGradientBorder className='mx-auto w-full max-w-sm rounded-3xl border border-neutral-800'>
            <div className='grid gap-6 bg-neutral-900'>{children}</div>
        </AIGradientBorder>
    );
};

// const Logo = () => {
//   // Temp logo from https://logoipsum.com/
//   return (
//     <svg
//       width="40"
//       height="auto"
//       viewBox="0 0 50 39"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="fill-neutral-50"
//     >
//       <path
//         d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
//         stopColor="#000000"
//       ></path>
//       <path
//         d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
//         stopColor="#000000"
//       ></path>
//     </svg>
//   );
// };

// const UserQuestion = () => {
//   return (
//     <div className="p-4 flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-900 transition-colors cursor-pointer">
//       <img
//         src="https://api.dicebear.com/8.x/lorelei/svg?seed=Tom&backgroundColor=10b981"
//         alt="avatar"
//         className="size-5 rounded-full"
//       />

//       <p className="text-xs text-neutral-500 flex-1 line-clamp-1">
//         What is the meaning of life?
//       </p>

//       <FiChevronDown className="text-neutral-500" />
//     </div>
//   );
// };

// const AITextOutput = () => {
//   return (
//     <p className="text-sm leading-relaxed text-neutral-300">
//       Hmm, that's a tough one... The traditional answer is 42, but I don't think
//       that's clever enough for this demo application. Let me search the internet
//       for some answers.
//     </p>
//   );
// };

// const LoadingSpinner = () => {
//   return (
//     <div className="flex gap-2 items-center">
//       <FiLoader className="text-neutral-500 animate-spin" />
//       <p className="text-xs text-neutral-500">Committing tomfoolery...</p>
//     </div>
//   );
// };

export default GradientAnimationCard;
