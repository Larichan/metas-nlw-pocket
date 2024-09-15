type PendingGoal = {
    pendingGoals: {
        id: string,
        title: string,
        desiredWeeklyFrequency: number,
        completionCount: number,
    }[]
}

export async function getPendingGoals(): Promise<PendingGoal> {
    return (await fetch(`${import.meta.env.VITE_BACK_URI}/pendingGoals`)).json()
}