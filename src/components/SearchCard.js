import React, { useEffect, useState } from "react";
import cute from "../cute.png";

const SearchCard = ({ info, saveCard }) => {
  const [happiness, setHappiness] = useState([])

  useEffect(() => {
    let damage = 0;
    if (info.attacks) {
      damage = info.attacks.reduce(function (value, a) {
        if (a["damage"] !== "") {
          return value + parseInt(a["damage"].replace(/[^0-9]/g, ""));
        } else {
          return value + 0;
        }
      }, 0);
    }

    let hp = info.hp === "None" || !info.hp ? 0 : info.hp > 100 ? "100" : info.hp
    let weakness = info.weaknesses ? info.weaknesses.length : 0
    let happiness = Math.ceil(((hp / 10) + (damage /10 ) + 10 - (weakness)) / 5)
    setHappiness(Array.apply(null, Array(happiness)).map(function (x, i) { return i; }))
  }, []);

  return (
    <div className="card">
      <div className="flex justify-center p-2" style={{ flex: 0.4 }}>
        <img src={info.imageUrl} className="h-full" />
      </div>
      <div style={{ padding: "10px", flex: 0.6 }}>
        <div className="flex flex-row justify-between">
          <h2>{info.name}</h2>
          <h2 className="text-hover-red" onClick={() => saveCard(info)}>Add</h2>
        </div>
        <div className="flex flex-row mb-1">
          <div className="w-8">
            <p className="mr-1 m-0">HP</p>
          </div>
          <div className="round-1 flex items-center bg-tube w-full">
            <div
              className="round-1 flex justify-center items-center bg-orange h-full"
              style={{ width: `${info.hp > 100 ? "100" : info.hp}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-row mb-1">
          <div className="w-8">
            <p className="mr-1 m-0">STR</p>
          </div>
          <div className="round-1 flex items-center bg-gray w-full">
            <div
              className="round-1 flex justify-center items-center bg-orange h-full"
              style={{
                width: `${
                  info.attacks ? (info.attacks.length >= 2 ? "100" : "50") : "0"
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-row mb-1">
          <div className="w-8">
            <p className="mr-1 m-0">WEAK</p>
          </div>
          <div className="round-1 flex items-center bg-gray w-full">
            <div
              className="round-1 flex justify-center items-center bg-orange h-full"
              style={{
                width: `${
                  info.weaknesses
                    ? info.weaknesses.length >= 2
                      ? "100"
                      : "50"
                    : "0"
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-row mt-2">
          {happiness.map((item, index) => (
            <img src={cute} className="w-4 ml-1" key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
