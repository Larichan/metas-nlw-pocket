import { eq } from "drizzle-orm"
import { db } from "../db"
import { goalCompletions } from "../db/schema"

interface DeleteGoalCompletionRequest {
    goalCompletionId: string
}

export async function deleteGoalCompletion({ goalCompletionId }: DeleteGoalCompletionRequest) {
    const goalCompletion = await db.select().from(goalCompletions).where(eq(goalCompletions.id, goalCompletionId))

    if(goalCompletion.length == 0) {
        throw new Error('Goal Completion not found!')
    }

    const result = await db.delete(goalCompletions).where(eq(goalCompletions.id, goalCompletionId)).returning()

    return result[0]
}