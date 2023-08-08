import React, { useState } from 'react';
import "./App.css"

function App() {
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const copyColor = () => {
    navigator.clipboard.writeText(selectedColor);
  }

  return (
    <div>
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
      />
      <div>
        <button onClick={copyColor}>copy</button>
        <p>Selected color: {selectedColor}</p>
      </div>
    </div>
  );
}

export default App;
