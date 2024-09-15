export async function createGoalCompletion(goalId: string) {
    await fetch(`${import.meta.env.VITE_BACK_URI}/goalCompletion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            goalId
        })
    })
}