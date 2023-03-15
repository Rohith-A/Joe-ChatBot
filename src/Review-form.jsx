import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

// import Item froom ''
class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
      bmi: ''
    };
  }
  
  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age, height, weight } = steps;
    this.setState({ name, gender, age, height, weight });
  }

  render() {
    const { name, gender, age, height, weight } = this.state;
    const calculateBMI = () => {
        let msg = '';
        let val = (
          [Number(weight.value) / Number(height.value) / Number(height.value)] * 10000
        ).toFixed(1);
        if (val < 18.5) {
            msg = `${val} - Under Weight`;
        } else if (val > 18.5 && val <= 24.9) {
            msg = `${val} - Healthy`;
        } else if (val > 24.9 && val < 30) {
            msg = `${val} - Overweight`;
        } else {
            msg = "Obese";
        }
        return msg;
      }
    return (
      <div style={{ width: '100%', marginLeft: 5 }}>
        <h3>BMI Report</h3>
        <Grid container spacing={2}>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Name :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
  <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{name.value}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
  <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Gender :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{gender.value}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Age :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{age.value}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Height :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{height.value}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Weight :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{weight.value}</Typography>
  </Grid>
  <Grid item={true} xs={5}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>BMI :</Typography>
  </Grid>
  <Grid item={true} xs={7}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '14px'}}>{calculateBMI()}</Typography>
  </Grid>
</Grid>
      </div>
    );
  }
}

export default Review