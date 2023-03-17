import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from "react";
import { calculateBMI, convertToCms, convertToFeet, nameParser, parseHeightCm } from './CommonUtility';
import GeneratePDF from './GeneratePDF';

const ReviewForm = (props) => {
    const [formDetails, setFormDetails] = useState({
    });
    const { steps } = props;
    useEffect(() => {
        if (steps) {
            const { name, gender, age, weight, heightCm, heightFt } = steps;
            const formData = { name, gender, age, weight, heightCm, heightFt }
            setFormDetails(formData);
        }
    }, [steps]);

    // const calculateBMI = () => {
    //     let msg = '';
    //     let height = '';
    //     if (formDetails && formDetails.heightFt) {
    //         height = convertToCms(formDetails.heightFt.value || 0)
    //     } else {
    //         height = formDetails.heightCm ? formDetails.heightCm.value : 0;
    //     }
    //     let val = (
    //         [Number(formDetails.weight ? formDetails.weight.value : 0) / Number(height) / Number(height)] * 10000
    //     ).toFixed(1);
    //     if (val < 18.5) {
    //         msg = `${val} - Under Weight`;
    //     } else if (val >= 18.5 && val <= 24.9) {
    //         msg = `${val} - Healthy`;
    //     } else if (val >= 24.9 && val < 30) {
    //         msg = `${val} - Overweight`;
    //     } else {
    //         msg = `${val} - Obese`;
    //     }
    //     return msg;
    // }

    // const parseHeightCm = () => {
    //     if (formDetails && formDetails.heightCm && formDetails.heightCm.value) {
    //         if (formDetails.heightCm.value.includes('.')) {
    //             setFormDetails({ ...formDetails, heightFt: { ...formDetails.heightFt, value: formDetails.heightCm.value } })
    //             return convertToCms(formDetails.heightCm.value);
    //         }
    //         //   setFormDetails({...formDetails, heightFt: {...formDetails.heightFt, value: convertToCms(formDetails.heightCm.value)}})
    //         return formDetails.heightCm.value;
    //     } else if (formDetails.heightFt && formDetails.heightFt.value && !formDetails.heightCm) {
    //         return convertToCms(formDetails.heightFt.value);
    //     }
    // }

    return (
        <React.Fragment>
            {Object.keys(formDetails).length && (
                <React.Fragment>
                    <Typography>BMI Report</Typography>
                    <Grid container spacing={2}>
                        <Grid item={true} xs={6}>
                            <Typography align="right" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>Name :</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="left" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>
                            {nameParser(formDetails.name && formDetails.name.value)}
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="right" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>Gender :</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="left" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>{formDetails.gender && formDetails.gender.value }</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="right" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>Age :</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="left" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>{formDetails.age && formDetails.age.value + ' yrs'}</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="right" variant="h5" style={{ fontWeight: 600, fontSize: '12px' }}>{'Height (cm) :'}</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="left" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>{parseHeightCm(formDetails) + ' cms'}</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="right" variant="h5" style={{ fontWeight: 600, fontSize: '12px' }}>{'Height (ft) :'}</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="left" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>
                            {
                                (formDetails.heightFt && formDetails.heightFt.value) ? formDetails.heightFt.value + ' ft'
                                    : convertToFeet(formDetails.heightCm && formDetails.heightCm.value) + ' ft'}
                                    </Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="right" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>Weight :</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography align="left" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>{formDetails.weight && formDetails.weight.value + ' kg(s)'}</Typography>
                        </Grid>
                        <Grid item={true} xs={5}>
                            <Typography align="right" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>BMI :</Typography>
                        </Grid>
                        <Grid item={true} xs={7}>
                            <Typography align="left" variant="h5" style={{ fontWeight: 600, fontSize: '13px' }}>{calculateBMI(formDetails)}</Typography>
                        </Grid>
                    </Grid>
                    <GeneratePDF formDetails={formDetails}/>
                </React.Fragment>
            )}
        </React.Fragment>

    )
}

export default ReviewForm