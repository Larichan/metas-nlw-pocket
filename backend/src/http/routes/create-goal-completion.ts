import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createGoalCompletion } from "../../services/create-goal-completion";

export const createGoalCompletionRoute:FastifyPluginAsyncZod = async app => {
    app.post('/goalCompletion', {
        schema: {
            body: z.object({
                goalId: z.string()
            })
        }
    }, async (request) => {
        
        const { goalId } = request.body
    
        return await createGoalCompletion({
            goalId
        })
    })
}