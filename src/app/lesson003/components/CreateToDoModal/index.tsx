"use client";

import FormButton from "@/app/components/FormButton";
import React, { useEffect, useState, useRef } from "react";

interface CreateToDoModalProps {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  save: (event: React.MouseEvent<HTMLButtonElement>) => void;
  cancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreateToDoModal = (props: CreateToDoModalProps) => {
  // React Hooks
  const [inputToDo, setInputToDo] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const isFirstRender = useRef<boolean>(false);

  // バリデーション
  const validInput = (input: string) => {
    input ? setIsValid(false) : setIsValid(true);
  };

  // useEffect
  useEffect(() => {
    isFirstRender.current = true;
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      // 初回レンダー
      isFirstRender.current = false;
    } else {
      // ２回以降レンダー
      props.setInput(inputToDo);
      validInput(inputToDo);
    }
  }, [inputToDo, props]);

  // Render
  return (
    <div className="font-mono bg-gray-100 rounded-xl shadow justify-center p-5 max-w-60">
      <div className="flex py-4">
        <p className="text-2xl text-green-500 font-bold">新規登録</p>
      </div>
      <div className="flex">
        <input
          type="text w-full bg-white"
          className="p-2 rounded-md border-solid border-2 border-black w-full"
          onChange={(e) => setInputToDo((e.target as HTMLInputElement).value)}
          onBlur={() => validInput(inputToDo)}
          value={inputToDo}
        />
      </div>
      {isValid && (
        <p className="pt-4 text-red-500 font-bold">
          タスク名を入力してください
        </p>
      )}
      <div className="flex justify-end pt-4">
        <div className="pr-2">
          <FormButton
            clickEvent={(e) => (inputToDo ? props.save(e) : setIsValid(true))}
            bgColor="bg-green-500"
            labelText="保存"
            isDisabled={isValid}
          />
        </div>
        <div className="">
          <FormButton
            clickEvent={props.cancel}
            bgColor="bg-gray-400"
            labelText="キャンセル"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateToDoModal;
