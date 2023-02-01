import styles from './HeaderList.module.css'
import { TbClipboardText } from "react-icons/tb";

interface PropsHeaderList {
  isContent: boolean;
  totalTasks: number;
  qtdeTaskCompleted: number
}

export function HeaderList({...props}: PropsHeaderList){
  const tasksDone = props.qtdeTaskCompleted;

  return(
    <>
      <div className={styles.info}>
        <div className={styles.tasksCreated}>Tarefas criadas
        <span>{props.totalTasks}</span>
        </div>
        <div className={styles.tasksDone}>Concluídas
          <span>
            {props.totalTasks > 0 ? `${tasksDone} de ` : ''}
            {props.totalTasks}
          </span>
        </div>
      </div>
      {!props.isContent &&
        <div className={styles.noContent}>
          <TbClipboardText size={50} />
          <p className={styles.firstMsg}>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      }
    </>
  )
}