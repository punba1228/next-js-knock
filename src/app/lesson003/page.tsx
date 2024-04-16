"use client";
import React, { useState } from "react";

import Modal from "@/app/components/Modal";
import ToDoListContainer from "./components/ToDoListContainer";
import { ToDoItemProps } from "./components/ToDoItem";
import CreateToDoModal from "./components/CreateToDoModal";

const Home = () => {
  // React Hooks
  const [toDoList, setToDoList] = useState<ToDoItemProps[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [primaryKey, setPrimaryKey] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // モーダル操作
  const toggleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  // 保存
  const saveToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createToDoList("add");
    toggleModal(event);
  };

  // 削除
  const deleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const targetId = (event.target as HTMLButtonElement).id.replace(
      "delete-",
      ""
    );
    createToDoList("del", targetId);
  };

  // todoリスト作成
  const createToDoList = (method: "add" | "del", id?: string) => {
    let newToDoList: ToDoItemProps[] = [];

    switch (method) {
      case "add":
        const addItem = [
          {
            id: String(primaryKey),
            labelText: taskName,
            clickEvent: deleteTodo,
          },
        ];
        newToDoList = [...toDoList, ...addItem];
        setPrimaryKey(primaryKey + 1);
        break;

      case "del":
        newToDoList = toDoList.filter((itemList) => itemList.id !== id);
        break;
    }

    setToDoList(newToDoList);
  };

  return (
    <main className="flex w-full h-screen justify-center">
      <div className="flex items-center">
        <ToDoListContainer
          toDoList={toDoList}
          add={toggleModal}
          delete={deleteTodo}
        />
      </div>
      {isOpen && (
        <Modal>
          <CreateToDoModal
            setInput={setTaskName}
            save={saveToDo}
            cancel={toggleModal}
          />
        </Modal>
      )}
    </main>
  );
};

export default Home;
