import React, { useContext } from 'react'
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/CyclesContext';

const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

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
            min={5} 
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })} 
            />
          <span>minutos.</span>
        </FormContainer>
  );
}

export default NewCycleForm