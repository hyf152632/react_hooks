import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";

import "./styles.css";

const FadeIn = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return <animated.div style={props}>I will fade in</animated.div>;
};
function todosReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    //...other actions...
    default:
      return state;
  }
}
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }
  return [state, dispatch];
}

function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  function handleAddClick(text) {
    dispatch({ type: "add", text });
  }
}
const useConsole = count => {
  useEffect(() => {
    console.log(`the count is: ${count}`);
  });
};
const useConsoleBegin = () => {
  useEffect(() => {
    console.log("begin...");
  }, []);
};

const useMedia = query => {
  let [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(
    () => {
      let media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      let listener = () => setMatches(media.matches);
      media.addListener(listener);
      return () => media.removeListener(listener);
    },
    [query]
  );
  return matches;
};

const Count = () => {
  const [count, setCount] = useState(0);

  useConsole(count);
  useConsoleBegin();
  //Similar to componentDidMunt and compoentDidUpdate
  useEffect(
    () => {
      console.log(count);
      document.title = `You clicked ${count} times.`;
    },
    [count]
  );

  return (
    <>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Hello React Hooks.</h1>
      <h2>1. useState</h2>
      <Count />
      <FadeIn />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
