import { type FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoals } from "../../services/get-week-pending-goals";

export const getWeekPendingGoalsRoute:FastifyPluginAsyncZod = async app => {
    app.get('/pendingGoals', async () => {
        return await getWeekPendingGoals()
    })
}