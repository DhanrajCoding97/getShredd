import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button } from './ui/button';
import Image from 'next/image';
import { ProteinFood, CarbFood, FatFood } from './svgs';
// import { CarbFood } from './svgs';
export type MealCardProps = {
    name: string;
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    eatenAt: Date;
    mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
};

export default function MealCard({
    name,
    calories,
    proteinG,
    carbsG,
    fatG,
    eatenAt,
    mealType,
}: MealCardProps) {
    return (
        <div className='flex max-w-fit transform flex-col rounded-xl border border-gray-100 p-2 text-[#efe1e0] shadow-md transition-all duration-300 ease-linear hover:-translate-y-2 hover:shadow-2xl dark:bg-[#091516]'>
            <div className='flex items-start justify-between gap-4'>
                <div className='flex flex-col'>
                    <span className='text-lg leading-normal font-bold'>
                        {name}
                    </span>
                    <span className='text-sm font-normal'>
                        {eatenAt.toLocaleDateString()}
                    </span>
                </div>
                <span className='text-2xl font-bold'>{calories} Kcal</span>
                <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 rounded-full p-0'
                >
                    <BsThreeDotsVertical />
                </Button>
            </div>
            <div className='flex flex-col justify-center gap-2'>
                <div className='flex items-center gap-1'>
                    {/* <span className='text-muted text-sm font-light'>
                        Protein
                    </span> */}
                    <ProteinFood className='h-7 w-7' />
                    <span className='text-lg leading-tight font-semibold'>
                        {proteinG}g
                    </span>
                </div>
                <div className='flex items-center gap-1'>
                    {/* <span className='text-muted text-sm font-light'>Carbs</span> */}

                    <CarbFood className='h-7 w-7' />
                    <span className='text-lg leading-tight font-semibold'>
                        {carbsG}g
                    </span>
                </div>
                <div className='flex items-center gap-1'>
                    {/* <span className='text-muted text-sm font-light'>Fat</span> */}
                    <FatFood className='h-7 w-7' />
                    <span className='text-lg leading-tight font-semibold'>
                        {fatG}g
                    </span>
                </div>
            </div>
        </div>
    );
}
