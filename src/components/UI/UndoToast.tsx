import { useUndoUIStore } from "../../state/useUndoUIStore";
import { useIssueStore } from "../../state/useIssueStore";

export default function UndoToast() {
  const isUndoVisible = useUndoUIStore(state => state.isUndoVisible);
  const lastActionLabel = useUndoUIStore(state => state.lastActionLabel);
  const hideUndo = useUndoUIStore(state => state.hideUndo);
  const popUndo = useIssueStore(state => state.popUndo);

  if (!isUndoVisible) return null;

  return (
    <div
      className="undo-toast"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#222",
        color: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 1000,
        padding: "1em 2em",
        display: "flex",
        alignItems: "center",
        gap: "1em"
      }}
    >
      <span>
        {lastActionLabel || "Action performed."}&nbsp;Undo?
      </span>
      <button
        onClick={() => {
          popUndo();
          hideUndo();
        }}
        style={{
          background: "#fff",
          color: "#222",
          border: "none",
          borderRadius: 4,
          padding: "0.4em 1em",
          cursor: "pointer",
          fontWeight: 500
        }}
      >
        Undo
      </button>
    </div>
  );
}
