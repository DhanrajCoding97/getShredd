import AddMealForm from '@/components/AddMealForm';
function AddMealPage() {
    return (
        // <div className='flex max-w-120 flex-col rounded-xl border-2 p-5'>
        <div className='mt-20 grid min-h-full w-full place-content-center'>
            <div className='animate-border flex w-full max-w-120 flex-col rounded-2xl border border-transparent p-5 [background:linear-gradient(45deg,#172033,--theme(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-slate-600/.48)_80%,--theme(--color-indigo-500)_86%,--theme(--color-indigo-300)_90%,--theme(--color-indigo-500)_94%,--theme(--color-slate-600/.48))_border-box]'>
                <div className='space-y-1'>
                    <h1 className='text-2xl font-bold'>Add Meal</h1>
                    <p className='text-muted-foreground text-sm'>
                        Help us calculate your daily calorie and macro goals.
                    </p>
                </div>
                <AddMealForm />
            </div>
        </div>
    );
}

export default AddMealPage;
