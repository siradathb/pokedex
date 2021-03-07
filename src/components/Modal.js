import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SearchCard from "./SearchCard";

const Modal = ({ open, saveCard, setOpen, myCard }) => {
  const local_path = "http://localhost:3030";
  const [card_list, set_card_list] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState("all");
  const wrapperRef = useRef(null);

  useEffect(() => {
    axios.get(`${local_path}/api/cards`).then((response) => {
      check_duplicate(response.data.cards);
    });
  }, [myCard]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target) && event.target.id === "myModal") {
      if (open) {
        setOpen(false);
      }else{
        setOpen(true);
      }
    }
  };

  const searchPokedex = () => {
    axios
      .get(
        `${local_path}/api/cards?limit=20${
          searchValue === "" ? "" : `&name=${searchValue}`
        }${type === "all" ? "" : `&type=${type}`}`
      )
      .then((response) => {
        check_duplicate(response.data.cards);
      });
  };

  const check_duplicate = (list) => {
    let array = [];

    list.filter((val) => {
      if (!myCard.find((x) => x.id === val.id)) {
        array.push(val);
      }
    });
    set_card_list(array);
  };

  return (
    open && (
      <div
        id="myModal"
        className="modal w-full h-full"
        style={{ display: "flex" }}
      >
        <div
          className="flex flex-col modal-content m-3 w-full relative"
          ref={wrapperRef}
        >
          <div className="flex h-6 bg-white m-1 mb-2 justify-between items-baseline">
            <div className="h-4">
              <input
                className="p-1 w-full input-form"
                style={{ width: "600px" }}
                placeholder="find pokemon..."
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </div>
            <div className="h-4">
              <select
                className="p-1 input-form"
                style={{ width: "200px" }}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="psychic">psychic</option>
                <option value="fighting">fighting</option>
                <option value="fairy">fairy</option>
                <option value="normal">normal</option>
                <option value="grass">grass</option>
                <option value="metal">metal</option>
                <option value="water">water</option>
                <option value="lighting">lighting</option>
                <option value="darkness">darkness</option>
                <option value="colorless">colorless</option>
                <option value="fire">fire</option>
              </select>
            </div>
            <div className="h-4 ">
              <button className="h-full input-form" onClick={() => searchPokedex()}>
                Search
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col overflow-auto mt-2">
            {card_list.map((item, index) => (
              <SearchCard
                key={item.id}
                info={item}
                saveCard={(item) => {
                  saveCard(item);
                  check_duplicate(card_list);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
