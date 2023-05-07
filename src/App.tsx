import React from "react";
import "./assests/css/App.css";
import Layout from "./components/layout";
import Provider from "./components/provider";

function App() {
  return (
    <div className="App">
      <Provider>
        <Layout />
      </Provider>
    </div>
  );
}

export default App;
