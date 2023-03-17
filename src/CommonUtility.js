export const nameParser = (s) => {
    if (s) {
    let str = s;
    if (s && s.value) {
        str = str.value;
        }
    const separetor = ["i'm ", "i am ", " is", " name's "];
    let name = '';
    if (/ name's| is|i'm |i am /.test(str.toLowerCase())) {
        for (let i = 0; i <= separetor.length; i++) {
            if (str.toLocaleLowerCase().split(separetor[i]).length > 0) {
                name = str.toLocaleLowerCase().split(separetor[i])[1];
                if (name) {
                name = name.toUpperCase().trim();
                return name.charAt(0).toUpperCase() + name.slice(1, name.length).toLowerCase();
                }
            }
        }
    }
    return str.charAt(0).toUpperCase() + str.slice(1, str.length).toLowerCase();
}
return '';
};

export const convertToFeet = (hgt) => {
    if (hgt) {
    let height = hgt;
    if (hgt && hgt.value) {
        height = hgt.value;
        }
    const realFeet = ((height*0.393700) / 12);
    const feet = Math.floor(realFeet);
    const inches = Math.round((realFeet - feet) * 12);
    return feet + '.' + inches;
    }
    return 0;
}

export const convertToCms = (hgt) => {
    if (hgt) {
    let height = Number(hgt).toPrecision(2);
    let feet;
    let cmTotal;
    if (hgt && hgt.value) {
    height = Number(hgt.value).toPrecision(2);
    }
    if(height && height.includes('.')) {
    feet = height.split('.')
    cmTotal = feet[0] * 30.48 + feet[1] * 2.54;
    } else {
        cmTotal = feet * 30.48 + 0 * 2.54;
    }
    return Math.round(cmTotal);
}
return 0;
}


export const calculateBMI = (formDetails) => {
    let msg = '';
    let height = '';
    if (formDetails && formDetails.heightUnits && formDetails.heightUnits.value === 'ft'
    && formDetails.heightFt) {
        height = convertToCms(formDetails.heightFt.value || 0)
    } else {
        height = formDetails.heightCm ? formDetails.heightCm.value : 0;
    }
    let val = (
        [Number(formDetails.weight ? formDetails.weight.value : 0) / Number(height) / Number(height)] * 10000
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


export const parseHeightCm = (formDetails) => {
    if (formDetails && formDetails.heightCm && formDetails.heightCm.value) {
        if (formDetails.heightCm.value.includes('.')) {
            return convertToCms(formDetails.heightCm.value);
        }
        return formDetails.heightCm.value;
    } else if (formDetails.heightFt && formDetails.heightFt.value && !formDetails.heightCm) {
        return convertToCms(formDetails.heightFt.value);
    }
}