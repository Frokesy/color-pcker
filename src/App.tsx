import React, { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
import History from "./History";

function App() {
  const [selectedColor, setSelectedColor] = useState("");
  const [defaultColor, setDefaultColor] = useState("");
  const [show, setShow] = useState(false);
  const [newColor, setNewColor] = useState("")

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
    setDefaultColor(event.target.value);
  };

  const fetchNewColor = (data: string) => {
    setNewColor(data)

  }

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
          className="cursor-pointer w-[10%]"  
        />
        <input
          type="text"
          placeholder="#000000"
          value={defaultColor}
          className="w-[90%] ml-2 border-2 border-[#ccc] outline-none px-3 py-0.5 rounded-md placeholder:text-[14px] text-[14px]"
          onChange={(e) => setDefaultColor(e.target.value)}
        />
      </div>
      {show && (
        <div className="flex justify-between pt-2 items-center">
          <p className="text-[14px]">
            Selected color: <span className="font-bold">{selectedColor}</span>
          </p>
          <Dropdown selectedColor={selectedColor} getNewColor={fetchNewColor} />
        </div>
      )}
      <History selectedColor={newColor} />
    </div>
  );
}

export default App;
