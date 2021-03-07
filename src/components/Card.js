import React, { useEffect, useState } from "react";
import cute from "../cute.png";

const Cards = ({ info, deleteCard }) => {
  const [happiness, setHappiness] = useState([]);

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

    let hp =
      info.hp === "None" || !info.hp ? 0 : info.hp > 100 ? "100" : info.hp;
    let weakness = info.weaknesses ? info.weaknesses.length : 0;
    let happiness = Math.ceil((hp / 10 + damage / 10 + 10 - weakness) / 5);
    setHappiness(
      Array.apply(null, Array(happiness)).map(function (x, i) {
        return i;
      })
    );
  }, []);

  return (
    <div className="card">
      <div className="flex p-2" style={{width: '35%'}}>
        <img src={info.imageUrl} className="h-full" />
      </div>
      <div className="w-full" style={{ padding: "10px" }}>
        <div className="flex flex-row justify-between">
          <h2>{info.name}</h2>
          <h2 className="text-hover-red" onClick={() => deleteCard(info)}>&#215;</h2>
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
        <div className="flex flex-row mt-2 flex-wrap">
          {happiness.map((item, index) => (
            <img src={cute} className="w-3" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
