import dayjs from "dayjs";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";

export async function getWeekPendingGoals() {
    const firstDayOfWeek = dayjs().startOf('week').toDate()
    const lastDayOfCurrentWeek = dayjs().endOf('week').toDate()

    const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
        db.select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt
        }).from(goals).where(lte(goals.createdAt, lastDayOfCurrentWeek))
    )

    const goalCompletionCounts = db.$with('goal_completion_counts').as(
        db.select({
            goalId: goalCompletions.goalId,
            completionCount: count(goalCompletions.id).as('completionCount')
        }).from(goalCompletions).where(
            and(lte(goalCompletions.createdAt, lastDayOfCurrentWeek),
                gte(goalCompletions.createdAt, firstDayOfWeek)
            ))
            .groupBy(goalCompletions.goalId)
    )

    const pendingGoals = await db.with(goalsCreatedUpToWeek, goalCompletionCounts).select({
        id: goalsCreatedUpToWeek.id,
        title: goalsCreatedUpToWeek.title,
        desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
        completionCount: sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(Number)
    }).from(goalsCreatedUpToWeek)
    .leftJoin(goalCompletionCounts, eq(goalsCreatedUpToWeek.id, goalCompletionCounts.goalId))

    return {
        pendingGoals
    }
}