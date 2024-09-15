import { X } from "lucide-react";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./Dialog";
import { Label } from "./Label";
import { Input } from "./Input";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./RadioGroup";
import { Button } from "./Button";
import { Controller, useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoal } from "../http/CreateGoal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createGoalForm = z.object({
    title: z.string().min(1, 'Necessário preencher o título da meta'),
    desiredWeeklyFrequency: z.coerce.number().min(1).max(7)
})

type CreateGoalForm = z.infer<typeof createGoalForm>

const frequencyOptions = [{ value: '1', description: '1x na semana', emoji: '🥱' },
    { value: '2', description: '2x na semana', emoji: '🙂' },
    { value: '3', description: '3x na semana', emoji: '😎' },
    { value: '4', description: '4x na semana', emoji: '😜' },
    { value: '5', description: '5x na semana', emoji: '🤨' },
    { value: '6', description: '6x na semana', emoji: '🤯' },
    { value: '7', description: 'Todos os dias da semana', emoji: '🔥' },
] 

export function CreateGoalDialog() {
    const queryClient = useQueryClient()

    const { register, control, handleSubmit, formState, reset } = useForm<CreateGoalForm>({
        resolver: zodResolver(createGoalForm)
    })

    async function handleCreateGoal(data: CreateGoalForm) {
        try {
            await createGoal(data)
    
            queryClient.invalidateQueries({ queryKey: ['summary'] })
            queryClient.invalidateQueries({ queryKey: ['pendingGoals'] })
    
            reset()
            toast.success('Meta cadastrada com sucesso!')
        } catch (error) {
            toast.error('Algo deu errado: ' + error)
        }
    }

    return (
        <DialogContent>
            <div className='flex flex-col gap-6 h-full'>
                <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                    <DialogTitle>Cadastrar metas</DialogTitle>
                    <DialogClose><X className='size-5 text-zinc-600' /></DialogClose>
                </div>

                <DialogDescription>
                    Adicione atividades que você queira continuar praticando semanalmente.
                </DialogDescription>
                </div>

                <form onSubmit={handleSubmit(handleCreateGoal)} className='flex flex-col justify-between flex-1'>
                <div className='flex flex-col gap-6'>
                    <div className=' flex flex-col gap-2'>
                        <Label htmlFor='title'>Qual a meta que você deseja alcançar essa semana?</Label>
                        <Input id='title' autoFocus placeholder='Ex.: Estudar' { ...register('title') } />
                        {formState.errors.title && (
                            <p className="text-red-400 text-sm">{formState.errors.title.message}</p>
                        )}
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <Label htmlFor='frequency'>Frequência de realização da meta?</Label>
                        <Controller
                            control={control}
                            name='desiredWeeklyFrequency'
                            defaultValue={1}
                            render={({ field }) => {
                                return (
                                    <RadioGroup onValueChange={field.onChange} value={String(field.value)}>
                                        {frequencyOptions.map(option => {
                                            return (
                                                <RadioGroupItem key={option.value} value={option.value}>
                                                    <RadioGroupIndicator />
                                                    <span className='text-pink-300 text-sm font-medium leading-none'>{option.description}</span> 
                                                    <span className='text-lg leading-none'>{option.emoji}</span>
                                                </RadioGroupItem>
                                            )
                                        })}
                                    </RadioGroup>
                                )
                            }}
                        />
                    </div>
                </div>
                
                <div className='flex items-center gap-3'>
                    <DialogClose asChild>
                    <Button type='button' variant='close' className='flex-1'>Fechar</Button>
                    </DialogClose>
                    <Button className='flex-1'>Salvar</Button>
                </div>
                </form>
            </div>
        </DialogContent>
    )
}