import React, { useEffect, useState } from "react";

interface HistoryProps {
  selectedColor: string;
}

const History: React.FC<HistoryProps> = ({ selectedColor }) => {
  const [historyArray, setHistoryArray] = useState<string[]>([]);
  const [copy, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedColor);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleRemove = () => {
    const filteredArray = historyArray.filter(
      (color) => color !== selectedColor
    );
    setHistoryArray(filteredArray);
  };

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");
    console.log("hist",storedHistory)
    setHistoryArray(storedHistory);
  }, [selectedColor]);

  useEffect(() => {
    setHistoryArray([selectedColor, ...historyArray]);
    localStorage.setItem(
      "history",
      JSON.stringify([selectedColor, ...historyArray])
    );
  }, [selectedColor]);

  console.log(historyArray)
  return (
    <div>
      {historyArray.length !== 0 && (
        <div>
          <h1 className="text-[16px] font-semibold mt-4">Recent picks</h1>
          <div className="flex flex-col gap-y-2 mt-2">
            {historyArray.map((color, index) => (
              <div key={index} className="flex justify-between text-[14px]">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <p className="text-[13px]">{color}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    className="text-[12px] text-blue-700"
                    onClick={handleCopy}
                  >
                    {copy ? "Copied!" : "Copy"}
                  </button>
                  <button
                    className="text-[12px] text-red-500"
                    onClick={handleRemove}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
