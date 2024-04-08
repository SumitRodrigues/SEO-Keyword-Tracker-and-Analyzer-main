import React, { useEffect, useState } from 'react';
import Demo from './Demo';
import { Grid, Paper, Typography } from '@mui/material';
import TextSphere from './TextSphere';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Mainpage.css';

const MainPage = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("responseData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setResponseData(data);
    } else {
      console.log("No response data found in localStorage");
    }
  }, []);

  return (
    <div className="main-page-container">
      <Grid container spacing={2} className="grid-container">
        <Grid item xs={12} md={6} className="grid-item">
          <Paper className="paper-container" elevation={3}>
            <Typography className="typography-title" align='center' variant="h5">
              Keywords Count
            </Typography>
            <Demo data={responseData?.data}/>
            <div className="button-container">
              <Link to="/home">
                <Button className="button-base button-back" variant="contained" size="small">
                  Back
                </Button>
              </Link>
              <Link to="/analyzer">
                <Button className="button-base button-analyzer" variant="contained" size="small">
                  Analyzer
                </Button>
              </Link>
              {/* <Link to="/recommender">
                <Button className="button-base button-recommender" variant="contained" size="small">
                  Recommender
                </Button>
              </Link> */}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} className="grid-item">
          <Paper className="paper-container" elevation={3}>
            <Typography className="typography-title" align='center' variant="h5">
              Word Cloud
            </Typography>
            <TextSphere data={responseData?.data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPage;
