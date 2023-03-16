import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from "react";
import { convertToCms, convertToFeet, nameParser } from './CommonUtility';

const ReviewForm = (props) => {
    const [formDetails, setFormDetails] = useState({
      });
      const { steps } = props;
      useEffect(() => {
        if (steps) {
        const { name, gender, age, weight,  heightCm, heightFt } = steps;
        const formData = { name, gender, age, weight,  heightCm, heightFt }
        setFormDetails(formData);
        }
      }, [steps]);

      const calculateBMI = () => {
        let msg = '';
        let height = '';
        if(formDetails?.heightFt) {
          height = convertToCms(formDetails?.heightFt.value)
        } else {
          height = formDetails?.heightCm.value;
        }
        let val = (
          [Number(formDetails?.weight.value) / Number(height) / Number(height)] * 10000
        ).toFixed(1);
        if (val < 18.5) {
            msg = `${val} - Under Weight`;
        } else if (val >= 18.5 && val <= 24.9) {
            msg = `${val} - Healthy`;
        } else if (val >= 24.9 && val < 30) {
            msg = `${val} - Overweight`;
        } else {
            msg = `${val} - Obese`;
        }
        return msg;
      }

      const parseHeightCm = () => {
        if (formDetails?.heightCm && formDetails?.heightCm.value) {
          if (formDetails?.heightCm.value.includes('.')) {
            setFormDetails({...formDetails, heightFt: {...formDetails?.heightFt, value: formDetails?.heightCm.value}})
            return convertToCms(formDetails?.heightCm.value);
          }
        //   setFormDetails({...formDetails, heightFt: {...formDetails?.heightFt, value: convertToCms(formDetails?.heightCm.value)}})
        return formDetails?.heightCm.value;
        } else if (formDetails?.heightFt && formDetails?.heightFt.value && !formDetails?.heightCm) {
          return convertToCms(formDetails?.heightFt.value);
        }
      }

      return(
        <div>
        {Object.keys(formDetails).length && (<div style={{ width: '100%', marginLeft: 5 }}>
        <h3>BMI Report</h3>
        <Grid container spacing={2}>
  <Grid item={true} xs={6}>
    <Typography align="right" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Name :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
  <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{nameParser(formDetails?.name.value)}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
  <Typography align="right" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Gender :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{formDetails?.gender.value}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="right" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Age :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{formDetails?.age.value + ' yrs'}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="right" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{'Height (cm) :'}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{parseHeightCm() + ' cms'}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="right" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{'Height (ft) :'}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{
    formDetails?.heightFt && formDetails?.heightFt.value ? formDetails?.heightFt.value 
    : convertToFeet(formDetails?.heightCm.value) + ' ft'}</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="right" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>Weight :</Typography>
  </Grid>
  <Grid item={true} xs={6}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>{formDetails?.weight.value + ' kg(s)'}</Typography>
  </Grid>
  <Grid item={true} xs={5}>
    <Typography align="right" variant="h5" style={{fontWeight: 800, fontSize: '15px'}}>BMI :</Typography>
  </Grid>
  <Grid item={true} xs={7}>
    <Typography align="center" variant="h5" style={{fontWeight: 800, fontSize: '14px'}}>{calculateBMI()}</Typography>
  </Grid>
</Grid>
      </div>)}
      </div>
      )
}

export default ReviewForm