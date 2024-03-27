import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(16);
  const [numbState, setNumbState] = useState(true);
  const [charState, setCharState] = useState(true);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbState) str += "0123456789";
    if (charState) str += "!@#$%^&*-_+=<>[]{}~`";

    //ref hook

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numbState, charState, setPassword]);

  const copyPassToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    animate();
  }, [password]);

  const animate = () => {
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.innerHTML = "Copied";
    setTimeout(() => {
      copyBtn.innerHTML = "COPY";
    }, 1000);
  };


  useEffect(() => {
    passwordGenerator();
  }, [length, numbState, charState, passwordGenerator]);

  return (
    <>
      <h1 className="text-4xl text-center my-4">PASSWORD GENERATOR</h1>
      <button onClick={passwordGenerator}>Generate Password</button>

      <div className="w-full max-w-md mx-auto text-white bg-gray-700 p-4 px-4 my-4 rounded-lg">
        <div className="flex shadow-sm rounded-lg ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 h-auto"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button id="copyBtn" onClick={copyPassToClipBoard}>
            COPY
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={10}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbState}
              className="cursor-pointer"
              onChange={() => setNumbState((prev) => !prev)}
            />
            <label htmlFor="">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charState}
              className="cursor-pointer"
              onChange={() => setCharState((prev) => !prev)}
            />
            <label htmlFor="">Char</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
