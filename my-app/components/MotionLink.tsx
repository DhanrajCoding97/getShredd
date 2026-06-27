"use client";

import Link, {type LinkProps} from 'next/link';
import { motion, type TargetAndTransition } from 'motion/react';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
const MotionNextLink = motion.create(Link);
type MotionLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
};


function MotionLink({
  children,
  className,
  whileHover,
  whileTap,
  ...props
}: MotionLinkProps) {
    return (
<MotionNextLink
      {...props}
      className={cn(className)}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </MotionNextLink>
    )
}

export default MotionLink