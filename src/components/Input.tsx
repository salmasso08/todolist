import { Tasks } from './Tasks';
import styles from './Input.module.css'
import { HeaderList } from './HeaderList';
import { useState, ChangeEvent, FormEvent, InvalidEvent } from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai";

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function Input() {
  const [task, setTask] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task[]>([]);  
  const [title, setTitle] = useState("");
  const lengthTask = task.length > 0;
  
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTask([...task, ...newTask]);
    setTitle("");
  }

  function makeId(length: number) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }
  
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    event.target.setCustomValidity('');
    setTitle(event.target.value,);

    setNewTask([
      {
        id: makeId(5),
        title: event.target.value,
        isComplete: false
      }
    ]);
  }

  function deleteTaskById(taskId: string) {
    const newTasksWhitoutDeletedOne = task.filter((task) => task.id !== taskId)
    setTask(newTasksWhitoutDeletedOne)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Preencha sua tarefa antes de clicar no botão criar. :)')
  }

  function toggleTaskCompletedById(taskId: string) {
    const newTasks = task.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      }
      return task;
    });
    setTask(newTasks);
  }

  const completedTasks = task.filter((task) => task.isComplete).length;

  return (
    <>
      <form onSubmit={handleCreateNewTask} className={styles.createTask}>
        <input 
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
          onInvalid={handleNewCommentInvalid}
          value={title}
          required
        />      
        <button>
          Criar
          <AiOutlinePlusCircle size={20} />
        </button>
      </form>

      <HeaderList 
        totalTasks={task.length}
        isContent={lengthTask}
        qtdeTaskCompleted={completedTasks}
      />     
      {
        task.map(task => {
          return (
            <Tasks 
              id={task.id}
              key={task.id}
              title={task.title}
              isComplete={task.isComplete}
              onDelete={deleteTaskById}
              onComplete={toggleTaskCompletedById}
            />
          )
        })
      }
    </>
  )
}
