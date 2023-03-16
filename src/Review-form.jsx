import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { convertToCms, convertToFeet, nameParser } from './CommonUtility';

// import Item froom ''
class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
      weight: '',
      bmi: '',
      heightCm: '', 
      heightFt: ''
    };
  }
  
  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age, weight,  heightCm, heightFt } = steps;
    this.setState({ name, gender, age, heightCm, heightFt, weight });
  }

  render() {
    const { name, gender, age, heightFt, heightCm, weight } = this.state;
    const calculateBMI = () => {
        let msg = '';
        let height = '';
        if(heightFt) {
          height = convertToCms(heightFt.value)
        } else {
          height = heightCm.value;
        }
        let val = (
          [Number(weight.value) / Number(height) / Number(height)] * 10000
        ).toFixed(1);
        if (val < 18.5) {
            msg = `${val} - Under Weight`;
        } else if (val > 18.5 && val <= 24.9) {
            msg = `${val} - Healthy`;
        } else if (val > 24.9 && val < 30) {
            msg = `${val} - Overweight`;
        } else {
            msg = `${val} - Obese`;
        }
        return msg;
      }
      function stateSet (value, key) {
        this.setState({...this.state, [key]: {...[key], value: convertToCms(value)}})
      }
      function parseHeightCm () {
        if (heightCm && heightCm.value) {
          if (heightCm.value.includes('.')) {
            stateSet(heightCm.value);
            return convertToCms(heightCm.value);
          }
        return heightCm.value;
        } else if (heightFt && heightFt.value && !heightCm) {
          return convertToCms(heightFt.value);
        }
      }
    return (
      <div style={{ width: '100%', marginLeft: 5 }}>
        <h3>BMI Report</h3>
        <Grid container spacing={2}>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Name :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
  <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{nameParser(name.value)}</Typography>
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
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{'Height (cm) :'}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{parseHeightCm()}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{'Height (ft) :'}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{heightFt && heightFt.value ? heightFt.value : convertToFeet(heightCm.value)}</Typography>
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