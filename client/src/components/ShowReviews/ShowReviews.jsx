import React, { useState } from "react";
import { Box } from "@mui/system";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import "./ShowReviews.css";

export default function ShowReviews() {
  //FUNCION VALIDADORA
  function validate(input) {
    //va a recibir el estado input con los cambios detectados por los handlers
    let errors = {}; //objeto que guarda todos los errores y le agrego props con los nombres iguales a los del input
    if (!input.text) {
      errors.text = "Necesitás ingresar un nombre"; 
    } else if (input.text.length > 500) {
      errors.displayName = "Solo se permiten hasta 500 caracteres";
    }
  }

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [errors, setErrors] = useState({ e: "" });
  const [input, setInput] = useState({
    text: "",
  });

  //Rating
  const labels = {
    0.5: "Inútil",
    1: "Inútil+",
    1.5: "Pobre",
    2: "Pobre+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Bueno",
    4: "Bueno+",
    4.5: "Excelente",
    5: "Excelente+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const handleTextChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')


    setInput({
      //resetea el estado del input
      text: "",
    })

  }

  return (
    <div>
      <div className="detail_rating_section">
        <h2 className="detail_rating_title">
          ¿Conocés la banda? ¿Viste el show?
        </h2>
        <p className="detail_rating_text">Dejanos tu opinión</p>
        <div className="detail_rating_containter">
          <form onSubmit={handleSubmit} className="reviews_form">
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
            <div className="rating_textarea_div">
              <textarea
                className="reviews_textarea"
                name="text"
                id="text"
                cols="30"
                rows="10"
                placeholder="Dejá tu comentario"
                value={input.text}
                onChange={(e) => handleTextChange(e)}
                maxLength={500}
              ></textarea>
              {/* {errors.text && <p className="textarea_error">{errors.text}</p>} */}
            </div>
            <button className="send_review_btn">ENVIAR OPINIÓN</button>
          </form>
        </div>
      </div>

      <div className="reviews_div">
        <h2 className="detail_rating_title">Mirá las reviews de este show</h2>
      </div>
    </div>
  );
}
