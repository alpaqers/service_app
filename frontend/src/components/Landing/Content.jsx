import { Button } from "./Button";
import { GoArrowRight } from "react-icons/go";

export function Content() {
  return (
    <div className="w-3/5 h-2/5 bg-white flex flex-col items-center justify-center shadow-md p-24">
      <div className="w-full mb-7 text-left">
        <h2 className="text-black text-2xl font-semibold drop-shadow-md">
          Najlepszy serwis RTV / AGD w mieście
        </h2>
      </div>

      <div className="w-full mb-7 text-left">
        <p>
          Potrzbujesz pomocy z naprawą lub konserwacją swojego urządzenia RTV lub AGD? Nie trać czasu i sprawdź naszą ofertę już teraz!
        </p>
      </div>

      <div className="w-full flex gap-20 justify-left">
        <Button text="Cennik" href="#1" />
        <Button text="Formularz" href="#2" icon={<GoArrowRight />} />
      </div>
    </div>
  );
}
