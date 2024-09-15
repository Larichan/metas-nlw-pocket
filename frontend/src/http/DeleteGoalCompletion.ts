export async function deleteGoalCompletion(goalCompletionId: string) {
    await fetch(`${import.meta.env.VITE_BACK_URI}/deleteGoalCompletion`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            goalCompletionId
        })
    })
}