import dayjs from "dayjs"
import { db } from "../db"
import { goalCompletions, goals } from "../db/schema"
import { and, count, eq, gte, lte, sql } from "drizzle-orm"

interface CreateGoalCompletionRequest {
    goalId: string
}

export async function createGoalCompletion({ goalId }: CreateGoalCompletionRequest) {
    const firstDayOfWeek = dayjs().startOf('week').toDate()
    const lastDayOfCurrentWeek = dayjs().endOf('week').toDate()

    const goalCompletionCounts = db.$with('goal_completion_counts').as(
        db.select({
            goalId: goalCompletions.goalId,
            completionCount: count(goalCompletions.id).as('completionCount')
        }).from(goalCompletions).where(
            and(lte(goalCompletions.createdAt, lastDayOfCurrentWeek),
                gte(goalCompletions.createdAt, firstDayOfWeek),
                eq(goalCompletions.goalId, goalId)
            ))
            .groupBy(goalCompletions.goalId)
    )

    const goalWithCompletionCount = await db.with(goalCompletionCounts).select({
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        completionCount: sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(Number)
    }).from(goals)
    .leftJoin(goalCompletionCounts, eq(goals.id, goalCompletionCounts.goalId))
    .where(eq(goals.id, goalId))
    .limit(1)

    const { desiredWeeklyFrequency, completionCount } = goalWithCompletionCount[0]

    if(completionCount >= desiredWeeklyFrequency) {
        throw new Error('Goal already completed this week!')
    }
    
    const result = await db.insert(goalCompletions).values({
        goalId
    }).returning()
    
    return { 
        goalCompletion: result[0] 
    }
}