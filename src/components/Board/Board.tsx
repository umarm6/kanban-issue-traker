import { DndContext, useSensor, useSensors, PointerSensor, DragEndEvent } from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";
import { Issue, IssueStatus } from "../../types/Issues.types";
import { useIssueStore } from "../../state/useIssueStore";
import { currentUser } from "../../constants/currentUser";
import  {useUndoUIStore} from "../../state/useUndoUIStore";
import UndoToast from "../../components/UI/UndoToast";

const columns = [
    'Backlog',
    'In Progress',
    'Done' 
];

export default function Board({ issues }: { issues: Issue[] }) {
  const moveIssue = useIssueStore(state => state.moveIssue);
  const showUndo = useUndoUIStore(state => state.showUndo);

  const isAdmin = currentUser.role === "admin";
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isAdmin) return; // Ignore drag events if not admin
    
    const { active, over } = event;
    const issue = issues.find(i => i.id === active.id as string);
    const newStatus = over?.id as string;
    if (over && active.id !== over.id && issue && issue.status !== newStatus) {
        moveIssue(active.id.toString(), over.id as IssueStatus);
        showUndo(`Moved "${issue.title}" to ${newStatus}`);
    }
};

  return (
    <>
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "1rem" ,width:"82%"}}>
        {columns.map((column) => {
          return (
            <BoardColumn
              key={column}
              id={column} // droppable Id
              title={column}
              issues={issues.filter(issue => issue.status === column)}
            />
          );
        })}
      </div>
    </DndContext>
    <UndoToast />
    </>
  );
}
