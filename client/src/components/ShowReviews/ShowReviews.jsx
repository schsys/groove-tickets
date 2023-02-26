import React from 'react'
import { Box } from '@mui/system'
import { Rating } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";

import './ShowReviews.css';

export default function ShowReviews() {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

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

  return (
    <div>
        <div className='detail_rating_section'>
           <h2 className='detail_rating_title'>¿Conocés la banda? ¿Viste el show?</h2>
           <p className='detail_rating_text'>Dejanos tu opinión</p>
           <div className="detail_rating_containter">
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
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
                <div className='rating_textarea_div'>
                    <textarea 
                        className='reviews_textarea' 
                        name="reviews_textarea" 
                        id="reviews_textarea" 
                        cols="30" 
                        rows="10" 
                        placeholder='Dejá tu comentario'
                        // value={text}
                        // onChange={handleTextChange}
                        maxLength={500} 
                        ></textarea>
                </div>
                <button className='send_review_btn'>ENVIAR OPINIÓN</button>
              </div>
        </div>
        
        <div className='reviews_div'>
            <h2 className='detail_rating_title'>Mirá las reviews de este show</h2>

        </div>
        {/* <ReviewShow />
        <ReviewList />
        <ReviewEdit />
        <ReviewCreate />
        <StarRatingField />
         */}
    </div>
  )
}
