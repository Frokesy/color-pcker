import React, { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";

function App() {
  const [selectedColor, setSelectedColor] = useState("");
  const [defaultColor, setDefaultColor] = useState("");
  const [show, setShow] = useState(false);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
    setDefaultColor(event.target.value);
  };

  useEffect(() => {
    setSelectedColor(defaultColor);

    if (defaultColor.length === 7 && defaultColor[0] === "#") {
      setShow(true);
    }
  }, [defaultColor]);
        
  return (
    <div className="py-4 w-[300px] px-4">
      <div className="flex items-center">
        <input
          type="color"
          value={defaultColor}
          onChange={handleColorChange}
          className="cursor-pointer w-[30%]"
        />
        <input
          type="text"
          placeholder="#000000"
          value={defaultColor}
          className="w-[70%] ml-2 border-2 border-[#ccc] outline-none px-3 py-0.5 rounded-md placeholder:text-[14px] text-[14px]"
          onChange={(e) => setDefaultColor(e.target.value)}
        />
      </div>
      {show && (
        <div className="flex justify-between pt-2 items-center">
          <p>
            Selected color: <span className="font-bold">{selectedColor}</span>
          </p>
          {/* <button onClick={copyColor}>copy</button> */}
          <Dropdown selectedColor={selectedColor} />
        </div>
      )}
    </div>
  );
}

export default App;
