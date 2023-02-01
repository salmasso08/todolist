import styles from './Tasks.module.css'
import { Trash } from 'phosphor-react'
import { BsFillCheckCircleFill } from "react-icons/bs";


export interface PropsList {
  id: string;
  title: string;
  isComplete: boolean,
  onDelete: (id: string) => void,
  onComplete: (taskId: string) => void
}

export function Tasks({...props}: PropsList) { 

  function handleDeleteTask() {
    props.onDelete(props.id)
  }

  return (
    <>
      <section className={styles.tasks}>
        <button
          className={styles.checkContainer}
          onClick={() => props.onComplete(props.id)}
        >
          {props.isComplete ? <BsFillCheckCircleFill /> : <div />}
        </button>
        <p className={props.isComplete ? styles.textCompleted: ''}>{props.title}</p>
        <Trash className={styles.trash} size={24} onClick={() => handleDeleteTask()} />
      </section>
    </>
  )
}