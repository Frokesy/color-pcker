import React, { useEffect, useState } from "react";

interface HistoryProps {
  selectedColor: string;
}

const History: React.FC<HistoryProps> = ({ selectedColor }) => {
  const [historyArray, setHistoryArray] = useState<string[]>([]);
  const [copy, setCopy] = useState<boolean>(false);
  const [copiedColor, setCopiedColor] = useState<string>("");

  useEffect(() => {
    if (selectedColor) {
      localStorage.setItem(
        "colorHistory",
        JSON.stringify([selectedColor, ...historyArray])
      );
    }

    const localHistory = localStorage.getItem("colorHistory");
    if (localHistory) {
      setHistoryArray(JSON.parse(localHistory));
    }
    console.log(localHistory);
  }, [selectedColor]);


  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopy(true);
    setCopiedColor(color);
    setTimeout(() => {
      setCopy(false);
    }, 500);
  };

  const deleteColor = (color: string) => {
    const filteredHistory = historyArray.filter((item) => item !== color);
    localStorage.setItem("colorHistory", JSON.stringify(filteredHistory));
    setHistoryArray(filteredHistory);
  };

  return (
    <div>
      {historyArray.length > 0 && (
        <div>
          <h2 className="text-[15px] font-semibold mt-4">Recent Picks</h2>
          {historyArray.map((color, index) => (
            <div key={index}>
              <div className="flex items-center mt-2 justify-between">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300 shadow-md inline-block mr-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-[13px] font-light">{color}</span>
                </div>

                <div className="flex space-x-4 items-center">
                  <button
                    className="text-[11px] text-blue-500"
                    onClick={() => copyColor(color)}
                  >
                    {copy && copiedColor === color ? "Copied!" : "Copy"}
                  </button>
                  <button
                    className="text-[11px] text-red-500"
                    onClick={() => deleteColor(color)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr className="my-1" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
