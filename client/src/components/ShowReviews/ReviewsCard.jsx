import React from "react";


export default function ReviewsCard(props) {
    console.log("props", props);
    return (
      <div>
        {/* <p>{props.review.items.User}</p> */}
        {/* <p>{props.review.items.createdAt}</p> */}
        <p>{props.review.items.message}</p>
        {/* <p>{props.review.items.stars}</p> */}
      </div>
    );
  }
