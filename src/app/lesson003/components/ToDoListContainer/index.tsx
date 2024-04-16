"use client";

import React from "react";
import ToDoItem, { ToDoItemProps } from "../ToDoItem";
import ToDoAddButton from "../ToDoAddButton";

export interface ToDoContainerProps {
  toDoList: ToDoItemProps[];
  add: (event: React.MouseEvent<HTMLButtonElement>) => void;
  delete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToDoListContainer = (props: ToDoContainerProps) => {
  // render
  return (
    <div className="font-mono bg-gray-200 justify-center text-white shadow border border-black w-64">
      <div className="flex justify-center bg-green-500 p-5">
        <h1 className="text-lg font-bold">TODO List</h1>
      </div>
      <ul className="p-3">
        {props.toDoList.map((toDo) => {
          return (
            <li key={toDo.id}>
              <ToDoItem
                id={toDo.id}
                labelText={toDo.labelText}
                clickEvent={props.delete}
              />
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end p-3">
        <ToDoAddButton clickEvent={props.add} />
      </div>
    </div>
  );
};

export default ToDoListContainer;
