'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type DatePickerProps = {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string;
};

export function DatePicker({
    value,
    onChange,
    placeholder = 'Pick a date',
    className,
}: DatePickerProps) {
    const [month, setMonth] = useState<Date>(value ?? new Date());

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !value && 'text-muted-foreground',
                        className,
                    )}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />

                    {value ? format(value, 'PPP') : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                    mode='single'
                    selected={value}
                    onSelect={onChange}
                    month={month}
                    onMonthChange={setMonth}
                    captionLayout='dropdown'
                    hideNavigation
                    components={{
                        MonthCaption: (props) => <>{props.children}</>,

                        DropdownNav: (props) => (
                            <div className='flex w-full gap-2'>
                                {props.children}
                            </div>
                        ),

                        Dropdown: (props) => (
                            <Select
                                value={String(props.value)}
                                onValueChange={(value) => {
                                    props.onChange?.({
                                        target: {
                                            value,
                                        },
                                    } as React.ChangeEvent<HTMLSelectElement>);
                                }}
                            >
                                <SelectTrigger className='first:flex-1 last:shrink-0'>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {props.options?.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={String(option.value)}
                                            disabled={option.disabled}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ),
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
