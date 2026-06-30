import AddMealForm from '@/components/AddMealForm';
function AddMealPage() {
    return (
        <div className='flex flex-col rounded-xl border-2 p-5'>
            <div className='space-y-1'>
                <h1 className='text-2xl font-bold'>Add Meal</h1>
                <p className='text-muted-foreground text-sm'>
                    Help us calculate your daily calorie and macro goals.
                </p>
            </div>
            <AddMealForm />
        </div>
    );
}

export default AddMealPage;
