import React, { useState } from "react";
import { useEffect } from "react";
import { Observable, tap } from "rxjs";
import ErrorBoundary from "./ErrorBoundary";
import { getObservable } from "./observable";
const RemoteApp = React.lazy(() => import("PeerSever/App"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      border: "1px solid red",
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);



export const App = () => {
 
  let [name, setName] = useState("");

  useEffect( () => {
    console.log("jnreugneormg")
      getObservable().pipe(
        tap(t => {
            console.log("Got ", t);
            setName(t);
        })
      ).subscribe();
  }, []);

  return (
    <div style={{ background: "rgba(43, 192, 219, 0.3)" }}>
    <h2>Host App:</h2>
    <h3>{name}</h3>
    <h2>Remote App:</h2>
    <RemoteWrapper>
      <RemoteApp />
    </RemoteWrapper>

    <br />
    <a href="http://localhost:4000">Link to Remote App</a>
  </div>
  )
}


export default App;
