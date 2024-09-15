import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { deleteGoalCompletion } from "../../services/delete-goal-completion";

export const deleteGoalCompletionRoute:FastifyPluginAsyncZod = async app => {
    app.delete('/deleteGoalCompletion', {
        schema: {
            body: z.object({
                goalCompletionId: z.string()
            })
        }
    }, async (request) => {
        
        const { goalCompletionId } = request.body
    
        return await deleteGoalCompletion({
            goalCompletionId
        })
    })
}