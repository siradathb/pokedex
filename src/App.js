import React, { useState } from "react";
import "./App.css";
import Cards from "./components/Card";
import Modal from "./components/Modal";

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
};

function App() {
  const [myCard, setMyCard] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const deleteCard = (info) => {
    let list = myCard.filter(function (item) {
      return item !== info;
    });
    setMyCard(list);
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="flex header">
        <h1>MY POKEDEX</h1>
      </div>
      <div className="content">
        <div className="card-container">
          {myCard.map((item, index) => (
            <Cards
              key={index}
              info={item}
              deleteCard={(arg) => deleteCard(arg)}
            />
          ))}
        </div>
      </div>
      <div className="footer">
        <div className="circle" onClick={() => setIsOpen(true)}>
          <h2 className="m-0 text-white">+</h2>
        </div>
      </div>
      {isOpen ? (
        <Modal
          open={isOpen}
          saveCard={(item) => myCard.push(item)}
          setOpen={(arg) => setIsOpen(arg)}
          myCard={myCard}
        />
      ) : null}
    </div>
  );
}

export default App;
