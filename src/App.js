import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

function App() {
  const [text, setText] = useState({
    in: "",
    out: "",
    lineGap: "0",
    prefix: `System.out.println("`,
    suffix: `");`,
  });

  function textParser(_text) {
    if (_text.in === "") return "";
    let raw = _text.in.split("\n");
    let preSufAdd = raw.map((t) => {
      return _text.prefix + t + _text.suffix;
    });
    let out = preSufAdd.join("\n".repeat(parseInt(_text.lineGap) + 1));
    return out;
  }

  function updateText(event) {
    let value = event.target.value;
    let eName = event.target.name;
    console.log("pre", value.toString());

    // input validation
    switch (eName) {
      case "in":
        setText({ ...text, [eName]: value });
        break;
      case "lineGap":
        value = parseInt(value);
        if (value < 0 || isNaN(value)) value = "0";
        setText({ ...text, [eName]: value.toString() });
        break;
      case "prefix":
        setText({ ...text, [eName]: value });
        break;
      case "suffix":
        setText({ ...text, [eName]: value });
        break;
      default:
    }

    // Post state update
    setText((text) => {
      return { ...text, out: textParser(text) };
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Code Helper</p>
      </header>
      <TextArea
        name="in"
        value={text.in}
        onChange={updateText}
        autoFocus
      ></TextArea>
      <Controller>
        <ControllerChild>
          <span>Prefix: </span>
          <input
            name="prefix"
            value={text.prefix}
            onChange={updateText}
          ></input>
        </ControllerChild>
        <ControllerChild>
          <span>Suffix: </span>
          <input
            name="suffix"
            value={text.suffix}
            onChange={updateText}
          ></input>
        </ControllerChild>
        <ControllerChild>
          <span>Line gap: </span>
          <input
            name="lineGap"
            type="number"
            value={text.lineGap}
            onChange={updateText}
          ></input>
        </ControllerChild>
      </Controller>
      <TextArea value={text.out} readOnly></TextArea>
    </div>
  );
}

const TextArea = styled.textarea`
  width: 70vw;
  height: 30vh;
`;

const Controller = styled.div`
  width: 70vw;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row wrap;
`;

const ControllerChild = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  :not(:first-child) {
    margin-top: 10px;
  }
`;

export default App;
