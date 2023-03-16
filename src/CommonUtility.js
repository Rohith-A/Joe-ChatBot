export const nameParser = (s) => {
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
    } return str;
};

export const convertToFeet = (hgt) => {
    let height = hgt;
    if (hgt && hgt.value) {
        height = hgt.value;
        }
    const realFeet = ((height*0.393700) / 12);
    const feet = Math.floor(realFeet);
    const inches = Math.round((realFeet - feet) * 12);
    return feet + '.' + inches;
}

export const convertToCms = (hgt) => {
    let height = hgt;
    let feet;
    let cmTotal;
    if (hgt && hgt.value) {
    height = hgt.value;
    }
    if(height && height.includes('.')) {
    feet = height.split('.')
    cmTotal = feet[0] * 30.48 + feet[1] * 2.54;
    } else {
        cmTotal = feet * 30.48 + 0 * 2.54;
    }
    return Math.round(cmTotal);
}