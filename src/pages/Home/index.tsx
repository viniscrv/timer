import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { createContext, useEffect, useState } from "react";
import NewCycleForm from "./components/NewCycleForm"
import Countdown from "./components/Countdown";


interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date; 
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const Home = () => {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCycles(prev => prev.map(cycle => {
      if(cycle.id === activeCycleId){
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle
      }
    }));
  }

  interface newCycleFormData {
    task: string;
    minutesAmount: number;
  }

  // function handleCreateNewCycle(data: newCycleFormData) {
  //   const newCycle: Cycle = {
  //     id: String(new Date().getTime()),
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles(prev => [...prev, newCycle]);
  //   setActiveCycleId(newCycle.id);
  //   setAmountSecondsPassed(0);

  //   reset();
  // }

  function handleInterruptCycle() {
    
    setCycles(prev => prev.map(cycle => {
      if(cycle.id === activeCycleId){
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))

    setActiveCycleId(null);
  }

  

  // const task = watch("task");
  // const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">

        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>
        
        { activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24}/>
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>
        ) }
      </form>
    </HomeContainer>
  );
};

export default Home;
