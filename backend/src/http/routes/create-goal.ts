import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createGoal } from "../../services/create-goal";

export const createGoalRoute:FastifyPluginAsyncZod = async app => {
    app.post('/goals', {
        schema: {
            body: z.object({
                title: z.string(),
                desiredWeeklyFrequency: z.number().min(1).max(7)
            })
        }
    }, async (request) => {
        
        const { title, desiredWeeklyFrequency } = request.body
    
        return await createGoal({
            title,
            desiredWeeklyFrequency
        })
    })
}