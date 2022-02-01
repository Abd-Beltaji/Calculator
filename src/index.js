import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

function App() {
  const [text, setText] = React.useState("");
  const buttonContent = [
    "1",
    "2",
    "3",
    "=",
    "4",
    "5",
    "6",
    "/",
    "7",
    "8",
    "9",
    "*",
    "C",
    "0",
    "+",
    "-",
  ];
  return (
    <div className="container">
      <div className="screen">
        <input className="result" type="text" disabled value={text} />
      </div>
      <div className="btns">
        {buttonContent.map((e, index) => (
          <span
            className={isNaN(parseInt(e)) ? "operation" : "number"}
            key={index}
            onClick={(event) => {
              if (event.target.textContent === "C")
                setText((prevText) => prevText.slice(0, -1));
              else if (event.target.textContent === "=")
                setText(eval(text).toString());
              else setText((prev) => prev + event.target.textContent);
            }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
