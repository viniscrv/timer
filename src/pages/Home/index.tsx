import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import Countdown from "./components/Countdown";
import NewCycleForm from "./components/NewCycleForm";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
  .number()
  .min(5, "O ciclo deve ser de no minímo 5 minutos")
  .max(60, "O ciclo deve ser de no máximo 5 minutos"),
});

const Home = () => {

  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)

  interface newCycleFormData {
    task: string;
    minutesAmount: number;
  }

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        { activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24}/>
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>
        ) }
      </form>
    </HomeContainer>
  );
};

export default Home;
