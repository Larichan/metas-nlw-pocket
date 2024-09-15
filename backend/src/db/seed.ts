import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
    await db.delete(goalCompletions)
    await db.delete(goals)

    const insertedGoals = await db.insert(goals).values([
        { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
        { title: 'Estudar', desiredWeeklyFrequency: 5 },
        { title: 'Fazer exercícios', desiredWeeklyFrequency: 3 },
        { title: 'Beber água', desiredWeeklyFrequency: 7 },
        { title: 'Ler um livro', desiredWeeklyFrequency: 1 },
        { title: 'Comer um fruta', desiredWeeklyFrequency: 7 },
        { title: 'Dormir cedo', desiredWeeklyFrequency: 5 },
        { title: 'Ligar para mãe', desiredWeeklyFrequency: 3 },
    ]).returning()

    const startOfWeek = dayjs().startOf('week')

    await db.insert(goalCompletions).values([
        { goalId: insertedGoals[0].id, createdAt: startOfWeek.toDate() },
        { goalId: insertedGoals[1].id, createdAt: startOfWeek.toDate() },
        { goalId: insertedGoals[2].id, createdAt: startOfWeek.toDate() },
        { goalId: insertedGoals[3].id, createdAt: startOfWeek.toDate() },
        { goalId: insertedGoals[6].id, createdAt: startOfWeek.toDate() },
        { goalId: insertedGoals[0].id, createdAt: startOfWeek.add(1, 'day').toDate() },
        { goalId: insertedGoals[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
        { goalId: insertedGoals[3].id, createdAt: startOfWeek.add(1, 'day').toDate() },
        { goalId: insertedGoals[7].id, createdAt: startOfWeek.add(1, 'day').toDate() },
        { goalId: insertedGoals[2].id, createdAt: startOfWeek.add(2, 'day').toDate() },
        { goalId: insertedGoals[5].id, createdAt: startOfWeek.add(2, 'day').toDate() },
    ])
}

seed().finally(() => {
    client.end()
})