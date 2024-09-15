import z from "zod"

const envSchema = z.object({
    DATABASE_URL: z.string().url()
})

export const env = envSchema.parse({ DATABASE_URL:`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DB_PORT}/${process.env.POSTGRES_DB}` })