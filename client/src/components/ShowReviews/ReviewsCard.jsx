import React from "react";
import "./ReviewsCard.css";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { Box } from "@mui/system";

export default function ReviewsCard(props) {
  const date = new Date(props.review.createdAt);
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  //Rating
  const labels = {
    0.5: "Malo",
    1: "Malo+",
    1.5: "Pobre",
    2: "Pobre+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Bueno",
    4: "Bueno+",
    4.5: "Excelente",
    5: "Excelente+",
  };

  function getLabelText() {
    const stars = props.review.stars;
    return (
      <div className="review_label_stars">
        <p className="review_label_stars_p">{`${labels[stars]}`}</p>
      </div>
    );
  }

  function getStars() {
    const stars = props.review.stars;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        className="review_label_stars_icons"
      >
        <Rating
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#efa13ce0',
          },
        }}
          name="hover-feedback"
          value={stars}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, stars) => {
            setValue(stars);
          }}
        />
      </Box>
    );
  }

  console.log("props", props);
  return (
    <div className="individual_review_card">
      <p>{props.review.User.userName}</p>
      <p>{formattedDate}</p>
      <p>{props.review.message}</p>
      <div className="stars_review_div">
        {getStars()}
        {getLabelText()}
      </div>
    </div>
  );
}
