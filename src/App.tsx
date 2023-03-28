import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import desktopDivider from "./assets/images/pattern-divider-desktop.svg";
import dice from "./assets/images/icon-dice.svg";

interface slip {
  advice: string;
  id: number;
}

function App() {
  const [advice, setAdvice] = useState<slip | null>();

  const grabAdvice = () => {
    axios.get("https://api.adviceslip.com/advice").then((res) => {
      if (res.status === 200) {
        setAdvice(res.data.slip);
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    grabAdvice();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center bg-gray-700 rounded-2xl">
        <h1 className="text-emerald-300 text-md my-8">
          A D V I C E # {advice?.id}
        </h1>
        <p className="text-gray-200 text-2xl max-w-lg font-bold text-center pb-10 px-10">
          {`"${advice?.advice}"`}
        </p>
        <img src={desktopDivider} alt="divider" className="mb-2 mx-6" />
        <div className="relative">
          <img
            src={dice}
            alt="dice"
            className="p-4 bg-emerald-300 rounded-3xl hover:shadow-xl hover:shadow-emerald-300 hover:cursor-pointer relative top-8"
            onClick={grabAdvice}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
