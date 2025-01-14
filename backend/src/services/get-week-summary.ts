import dayjs from "dayjs"
import { and, eq, gte, lte, sql } from "drizzle-orm"
import { db } from "../db"
import { goalCompletions, goals } from "../db/schema"

export async function getWeekSummary() {
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

    const goalsCompletedInWeek = db.$with('goals_completed_in_week').as(
        db.select({
            id: goalCompletions.id,
            title: goals.title,
            completedAt: goalCompletions.createdAt,
            completedAtDate: sql`DATE(${goalCompletions.createdAt})`.as('completedAtDate')
        }).from(goalCompletions)
        .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
        .where(
            and(lte(goalCompletions.createdAt, lastDayOfCurrentWeek),
                gte(goalCompletions.createdAt, firstDayOfWeek)
            )
        ).orderBy(goalCompletions.createdAt)
    )

    const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
        db.select({
            completedAtDate: goalsCompletedInWeek.completedAtDate,
            completions: sql`
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', ${goalsCompletedInWeek.id},
                        'title', ${goalsCompletedInWeek.title},
                        'completedAt', ${goalsCompletedInWeek.completedAt}
                    )
                )
            `.as('completions')
        })
        .from(goalsCompletedInWeek)
        .groupBy(goalsCompletedInWeek.completedAtDate)
        .orderBy(goalsCompletedInWeek.completedAtDate)
    )

    type GoalsPerDay = Record<string, {
        id: string,
        title: string,
        completedAt: string
    }[]>

    const result = await db.with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
        completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(Number),
        total: sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(Number),
        goalsPerDay: sql<GoalsPerDay>`
            JSON_OBJECT_AGG(
                ${goalsCompletedByWeekDay.completedAtDate},
                ${goalsCompletedByWeekDay.completions}
            )
        `
    }).from(goalsCompletedByWeekDay)

    return result[0]
}