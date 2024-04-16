"use client";

import React, { useState } from "react";
import CounterButton from "../CounterButton";

export interface CounterContainerProps {
  title: string;
}

const CounterContainer = (props: CounterContainerProps) => {
  // React Hooks
  const [countNum, setCountNum] = useState(0);

  // 関数
  const countUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCountNum(countNum + 1);
  };

  const countDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCountNum(countNum - 1);
  };

  // Render
  return (
    <div className="font-mono bg-white rounded-xl shadow justify-center p-5">
      <div className="flex justify-center">
        <h1 className="text-lg text-gray-500 font-bold">{props.title}</h1>
      </div>
      <div className="flex justify-center mt-10 mb-10">
        <h2 className="text-5xl text-blue-600 font-bold">{countNum}</h2>
      </div>
      <div className="flex justify-around">
        <div>
          <CounterButton symbol="+" clickEvent={countUp} />
        </div>
        <div>
          <CounterButton symbol="-" isOutline={true} clickEvent={countDown} />
        </div>
      </div>
    </div>
  );
};

export default CounterContainer;
