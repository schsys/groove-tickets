import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Modal, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { NavLink } from "react-router-dom";
import { getReviews } from "../../common/integrations/api";
import { UserAuth } from "../../context/AuthContext";

import { useRef } from 'react';

import Swal from "sweetalert2";
import Error_Search from "../../assets/Error_Search.jpg";

import ReviewsCard from "./ReviewsCard";
import "./ShowReviews.css";

const apiUrl = process.env.REACT_APP_BASE_URL;

const promiseHandleSubmit = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${apiUrl}/reviews`, data)
      .then(data => resolve(data))
      .catch(e => reject(e))
  });
}

const promiseHandleEdit = (idReview, body) => {
  return new Promise((resolve, reject) => {
    axios.put(`${apiUrl}/reviews/${idReview}`, body)
      .then(data => resolve(data))
      .catch(e => reject(e))
  });
}

export default function ShowReviews({ productId }) {

  //FUNCION VALIDADORA
  function validate(input) {
    //va a recibir el estado input con los cambios detectados por los handlers
    let errors = {}; //objeto que guarda todos los errores y le agrego props con los nombres iguales a los del input
    if (!input.text) {
      errors.text = "Necesitás ingresar un comentario";
    } else if (input.text.length > 500) {
      errors.text = "Solo se permiten hasta 500 caracteres";
    }
  }


  const modalRef = useRef(null);
 
  const [value, setValue] = React.useState(2); // stars

  const [hover, setHover] = React.useState(-1);
  const [errors, setErrors] = useState({ e: "" });
  const [input, setInput] = useState({ text: "" }); // texto
  const [reviewId, setReviewId] = useState(0);
  const [toRender, setToRender] = useState(false);
  const [reviews, setReviews] = useState({
    data: {},
    fetchStatus: 'loading',
    error: null
  });
  const [openModal, setOpenModal] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    async function getApiReviews(productId) {
      const response = await getReviews(productId);
      setReviews(response);
    }
    getApiReviews(productId);
  }, [productId, toRender])

  //Rating
  const labels = {
    1: "Malo",
    2: "Pobre",
    3: "Ok",
    4: "Bueno",
    5: "Excelente",
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

  const goToRegister = () => {
    Swal.fire({
      imageUrl: Error_Search,
      imageHeight: 150,
      imageWidth: 200,
      imageAlt: "Alerta sobre nuestro stock.",
      title: "Yazz",
      text: "Para poder dejar una opinión, necesitás loguearte.",
      showCancelButton: true,
      confirmButtonColor: "#6f4580e0",
      cancelButtonColor: "#efa13ce0",
      confirmButtonText: "LOGUEARME",
      cancelButtonText: "CANCELAR"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/register";
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && user.hasOwnProperty('email')) {
      const customer = await axios.get(`${apiUrl}/user?userName=${user.email}`);
      if (customer) {
        const r = {
          productId: productId,
          CustomerId: customer.data.Customer.id,
          UserId: customer.data.id,
          stars: value,
          message: input.text,
        }

        await promiseHandleSubmit(r)
          .then(review => {
            setInput({ text: '' });
            setErrors('');
            setToRender(!toRender)
          }
          )
          .catch(e => {
            console.log(e);
            setErrors({
              ...input,
              text: e.response.data.error
            })
          }
          );
          if (modalRef.current) {
            modalRef.current.close();
          }
      }
    } else {
      goToRegister()
    }
  }

  /*Edit Review*/
  const handleEdit = async (e) => {
    e.preventDefault();
    if (user && user.hasOwnProperty('email')) {
        const body = {
          stars: value,
          message: input.text,
        }

        const idReview = 0;
        await promiseHandleEdit(reviewId, body)
          .then(review => {
            setInput({ text: '' });
            setErrors('');
            setToRender(!toRender);
             setOpenModal(false);
          }
          )
          .catch(e => {
            console.log(e);
            setErrors({
              ...input,
              text: e.response.data.error
            })
          }
          );
      }
    else {
      goToRegister()
    }
  }


  if (reviews.fetchStatus === 'loading') {
    return <>
      <p>Obteniendo datos...</p>
    </>
  }

  if (reviews.fetchStatus === 'failed') {
    return <>
      <p>Oops! Esto es embarazoso! </p>
      <p>{reviews.error && reviews.error.message}</p>
      <NavLink to="/">Volver</NavLink>
    </>
  }

  const ReviewsCards = () => {
    if (!reviews.data) {
      return <></>
    }
    return <>
      <div className="reviews_div">
        <h2 className="detail_rating_title">Mirá las reviews de este show</h2>
        <div className="users_reviews_div">
          {reviews.data.items.map((review) => 
          <ReviewsCard 
          handleOpenModal= {handleOpenModal} 
          review={review} 
          key={review.id} />)}
        </div>
      </div>
    </>
  }

  const AverageRating = () => {
    if (!reviews.data) {
      return <></>
    }
    return <h2>Puntaje promedio: {reviews.data.averageRating.toFixed(2)}</h2>;
  }

   //***Modal para editar review */
   const handleOpenModal = (data) => {
      console.log('handleOpenModal', data);
      setValue(data.review.stars); // stars
      setInput({text: data.review.message});
      setReviewId(data.review.id);
      setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="detail_rating_section">
        <div className="show_reviews">
          <AverageRating />

        </div>

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
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#efa13ce0',
                  },
                  '& .MuiRating-iconFocus': {
                    color: '#6f4580e0',
                  },
                  '& .MuiRating-iconHover': {
                    color: '#6f4580e0',
                  },
                }}
                name="hover-feedback"
                value={value}
                precision={1}
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
                onChange={handleTextChange}
                maxLength={500}
              ></textarea>
              {errors && errors.text && <p className="textarea_error">{errors.text}</p>}
            </div>
            <button className="send_review_btn">ENVIAR OPINIÓN</button>
          </form>
        </div>
      </div>

      <ReviewsCards />
      
      {/*Modal para editar review*/}
      <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              className="modal_edit_review"
              ref={modalRef}
            >
              <div className="modal-edit-container">
                <button className="edit_btn_close" onClick={handleCloseModal}>
                  X
                </button>
                <h2 className="modal-title-edit">Editá tu opinión</h2>
                <form onSubmit={handleSubmit}  className="reviews_form">
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#efa13ce0',
                  },
                  '& .MuiRating-iconFocus': {
                    color: '#6f4580e0',
                  },
                  '& .MuiRating-iconHover': {
                    color: '#6f4580e0',
                  },
                }}
                name="hover-feedback"
                value={value}
                precision={1}
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
                onChange={handleTextChange}
                maxLength={500}
              ></textarea>
              {errors && errors.text && <p className="textarea_error">{errors.text}</p>}
            </div>

            <button type="submit" className="send_review_btn" onClick={handleEdit}>ENVIAR OPINIÓN</button>
          </form>
                  
      

              </div>
            </Modal>
    </div>
  );
}
