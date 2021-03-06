import { useState } from "react";
export default function FilterCheckbox() {
  const [shortFilmsSelected, setShortFilmsSelected] = useState(false);

  const handleCheckboxSelected = () => {
    setShortFilmsSelected(!shortFilmsSelected);
  };

  return (
    <div className={"filter"}>
      <div className={"filter__label"}>
        <div
          className={`filter__toggle ${
            shortFilmsSelected ? "filter__toggle_clicked" : ""
          }`}
          onClick={handleCheckboxSelected}
        >
          <div
            className={`filter__toggle-circle ${
              shortFilmsSelected ? "filter__toggle-circle_clicked" : ""
            }`}
          />
        </div>
        <p className={"filter__text"}>Короткометражки</p>
      </div>
      <input className={"filter__checkbox"} type={"checkbox"} id={"filter"} />
    </div>
  );
}
