import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../redux/actions";
import "./Filters.css";

export default function Filters() {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectValue, setSelectValue] = React.useState(""); //uso estos estados locales para mostrar al usuario los filtros q eligio
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("useEffect() cambia products");
    setCurrentPage(1);
  }, [products]);

  const countCategories = (arr, name) => {
    let count = 0;
    arr.forEach((e) => {
      e.Categories.forEach((category) => {
        if (category.name === name) count++;
      });
    });
    return count;
  };

  const categories = [];
  products.forEach((event) => {
    event.Categories.forEach((category) => {
      categories.push({
        id: category.id,
        name: category.name,
      });
    });
  });

  const uniqueCategories = [
    ...new Set(categories.map((category) => category.name)),
  ].map((name) => {
    return {
      id: categories.find((category) => category.name === name).id,
      name: name,
    };
  });

  const handleDayChange = (day) => {
    setSelectedDay(day);
    setSelectValue(day); //para mostrarle a usuario lo que eligio
    dispatch(filterProducts(day, selectedCategoryId));
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    dispatch(filterProducts(selectedDay, categoryId));
    setCurrentPage(1);
  };

  const BtnTemplate = ({ value, action, data, style }) => {
    return (
      <button
        className={style}
        onClick={() => {
          action(data);
        }}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="filter_section">
      {/* FILTRADO POR FECHA*/}
      <div className="shows__filters-container">
        <div className="shows__filter-textcontainer">
          <div className="shows__filter-text">
            <h4>
              {selectedDay === "" ? (
                "PRÓXIMAS FUNCIONES"
              ) : (
                <button
                  onClick={() => {
                    handleDayChange(selectedDay !== "" ? "" : selectedDay);
                  }}
                >
                  QUITAR FILTRO (X)
                </button>
              )}
            </h4>
          </div>
        </div>

        <div className="shows__filter-datescontainer">
          <div className={"shows__filter-box"}>
            <BtnTemplate value="HOY" data={1} action={handleDayChange} />
            <BtnTemplate
              value="7 D&Iacute;AS"
              data={7}
              action={handleDayChange}
            />
            <BtnTemplate
              value="30 D&Iacute;AS"
              data={30}
              action={handleDayChange}
            />
          </div>
        </div>
        {selectValue && <h3 className="showFilter"> Shows de los próximos {selectValue} días</h3>}

        {/* FILTRADO POR CATEGORIAS */}
        <div className="shows__categories-container">
          {!products.length ? (
            ""
          ) : (
            <>
              <div className="shows__categories-title">
                <h4>
                  {selectedCategoryId !== "" ? (
                    <BtnTemplate
                      action={handleCategoryChange}
                      data=""
                      value="QUITAR FILTRO"
                      className="filter_remove_btn"
                    />
                  ) : (
                    "CATEGORÍAS"
                  )}
                </h4>
              </div>
              <div className="shows__categories-box">
                {uniqueCategories.map((c) => {
                  return (
                    <BtnTemplate
                      value={
                        c.name + " (" + countCategories(products, c.name) + ")"
                      }
                      action={handleCategoryChange}
                      data={c.id}
                      style="shows__categories-buttons"
                      key={c.id}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      {/* FIN FILTRADO POR CATEGORIAS */}
    </div>
  );
}
