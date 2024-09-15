type Goal = {
    title: string,
    desiredWeeklyFrequency: number
}

export async function createGoal(goal: Goal) {
    await fetch(`${import.meta.env.VITE_BACK_URI}/goals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: goal.title,
            desiredWeeklyFrequency: goal.desiredWeeklyFrequency
        })
    })
}