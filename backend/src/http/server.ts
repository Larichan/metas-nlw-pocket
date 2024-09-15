import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { createGoalCompletionRoute } from "./routes/create-goal-completion";
import { getWeekPendingGoalsRoute } from "./routes/get-week-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";
import { deleteGoalCompletionRoute } from "./routes/delete-goal-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: '*'
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(deleteGoalCompletionRoute)

app.listen({
    port: Number.parseInt(process.env.APP_PORT ? process.env.APP_PORT : "3333")
}).then((port) => {
    console.log(`HTTP server running on port ${port}`)
})