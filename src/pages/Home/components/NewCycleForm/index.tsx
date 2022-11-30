import React from 'react'
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import zod from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
  .number()
  .min(1, "O ciclo deve ser de no minímo 5 minutos")
  .max(60, "O ciclo deve ser de no máximo 5 minutos"),
});



const NewCycleForm = () => {

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    }
  });


  return (
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            type="text"
            list="task-suggestions"
            id="task" 
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register("task")}  
          />

          <datalist id="task-suggestions">
            <option value="Projeto 01"/>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00" 
            step={5} 
            min={1} 
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })} 
            />
          <span>minutos.</span>
        </FormContainer>
  )
}

export default NewCycleForm