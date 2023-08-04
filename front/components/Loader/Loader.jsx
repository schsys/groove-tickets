import React from "react";
import LoadingGif from "./LoaderGif.gif";
import './Loader.css';

//MUI Version
// import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <div className="loader_container">
    <div>
      <img className="loader_img" src={LoadingGif} alt="loading" />
      {/* <h2 className="loader_title">Cargando...</h2> */}
    </div>

{/* <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
<CircularProgress color="secondary" className="progess_Loader" />
<CircularProgress color="success" />
<CircularProgress color="inherit" />
</Stack> */}
        
    </div>
  );
}

