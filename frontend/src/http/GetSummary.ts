type Summary = {
    completed: number,
    total: number,
    goalsPerDay: Record<string, {
        id: string,
        title: string,
        completedAt: string
    }[]>;
  }

export async function getSummary(): Promise<Summary> {
    return (await fetch(`${import.meta.env.VITE_BACK_URI}/summary`)).json()
}