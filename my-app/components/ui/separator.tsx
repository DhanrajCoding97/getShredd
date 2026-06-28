// 'use client';

// import * as React from 'react';
// import { Separator as SeparatorPrimitive } from 'radix-ui';

// import { cn } from '@/lib/utils';

// function Separator({
//     className,
//     orientation = 'horizontal',
//     decorative = true,
//     ...props
// }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
//     return (
//         <SeparatorPrimitive.Root
//             data-slot='separator'
//             decorative={decorative}
//             orientation={orientation}
//             className={cn(
//                 'bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
//                 className,
//             )}
//             {...props}
//         />
//     );
// }

// export { Separator };

'use client';

import * as React from 'react';
import { Separator as SeparatorPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

interface SeparatorProps extends React.ComponentProps<
    typeof SeparatorPrimitive.Root
> {
    label?: React.ReactNode;
}

function Separator({
    className,
    orientation = 'horizontal',
    decorative = true,
    label,
    ...props
}: SeparatorProps) {
    // If there's a label and it's horizontal, render with label in the middle
    if (label && orientation === 'horizontal') {
        return (
            <div className='flex items-center gap-4'>
                <SeparatorPrimitive.Root
                    data-slot='separator'
                    decorative={decorative}
                    orientation={orientation}
                    className={cn(
                        'bg-border flex-1 shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
                        className,
                    )}
                    {...props}
                />
                <span className='text-muted-foreground text-sm whitespace-nowrap'>
                    {label}
                </span>
                <SeparatorPrimitive.Root
                    data-slot='separator'
                    decorative={decorative}
                    orientation={orientation}
                    className={cn(
                        'bg-border flex-1 shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
                        className,
                    )}
                    {...props}
                />
            </div>
        );
    }

    // Default separator without label
    return (
        <SeparatorPrimitive.Root
            data-slot='separator'
            decorative={decorative}
            orientation={orientation}
            className={cn(
                'bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
                className,
            )}
            {...props}
        />
    );
}

export { Separator };
