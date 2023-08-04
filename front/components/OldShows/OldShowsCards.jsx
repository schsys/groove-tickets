import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOldShows } from "../../redux/actions";
import OldShowCard from "./OldShowCard";
import "./OldShowsCards.css";

function OldShowCards() {
  const dispatch = useDispatch();
  const fetchOldShowsStatus = useSelector((state) => state.oldShows.status);
  const oldShows = useSelector((state) => state.oldShows.items);

  useEffect(() => {
    if (fetchOldShowsStatus === "idle") {
      dispatch(fetchOldShows());
    }
  }, [fetchOldShowsStatus, dispatch]);

  if (fetchOldShowsStatus === "loading") {
    return (
      <>
        <p>Buscando históricos...</p>
      </>
    );
  }

  if (fetchOldShowsStatus === "failed" || oldShows.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="oldShows_Cards_container">
        <h2 className="oldShows_Cards_h2">HISTORICOS</h2>
        <div className="oldShows_section">
          {oldShows.slice(0, 3).map((show) => (
            <OldShowCard show={show} key={show.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default OldShowCards;
