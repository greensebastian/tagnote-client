import { useState } from "react";

// TODO WIP

const useUndoableState = <T>(
  initialState: T
): [T, (newState: T) => void, () => void, () => void] => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [current, setCurrent] = useState(0);

  const setState = (state: T) => {
    const newHistory = [...history.slice(0, current), state];
    if (newHistory.length > 10) {
      newHistory.shift();
    }
    setHistory(newHistory);
    setCurrent(newHistory.length - 1);
  };

  const undo = () => {
    const newCurrent = Math.max(current - 1, 0);
    setCurrent(newCurrent);
  };

  const redo = () => {
    const newCurrent = Math.min(current + 1, history.length - 1);
    setCurrent(newCurrent);
  };

  const currentState = history[current];

  return [currentState, setState, undo, redo];
};

export default useUndoableState;
