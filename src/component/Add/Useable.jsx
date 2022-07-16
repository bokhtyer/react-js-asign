import { City } from 'country-state-city';

//formik form validation;
export const validate = values => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = 'Required';
    } else if (values.first_name.length > 15) {
        errors.first_name = 'Must be 15 characters or less';
    }

    if (!values.last_name) {
        errors.last_name = 'Required';
    } else if (values.last_name.length > 15) {
        errors.last_name = 'Must be 15 characters or less';
    }

    if (!values.user_type) {
        errors.user_type = 'Required';
    }

    if (values.user_type === "employe" && !values.division) {
        errors.division = 'Required';
    }

    if (values.user_type === "employe" && !values.district) {
        errors.district = 'Required';
    }
}


const divisions = City.getCitiesOfCountry("BD");

export const filteredDivisions = divisions.filter(function (v) {
    return (v["name"] === "Dhaka" || v["name"] === "Chittagong" || v["name"] === "Barisal" || v["name"] === "Khulna" || v["name"] === "Sylhet" || v["name"] === "Rajshahi" || v["name"] === "Rangpur");
});


export const getStateCode = (stateName) => {
    let stateCode;
    if (stateName === "Dhaka") {
        stateCode = "13";
    }
    if (stateName === "Chittagong") {
        stateCode = "B";
    }
    if (stateName === "Barisal") {
        stateCode = "06";
    }
    if (stateName === "Khulna") {
        stateCode = "27";
    }
    if (stateName === "Sylhet") {
        stateCode = "60";
    }
    if (stateName === "Rajshahi") {
        stateCode = "54";
    }
    
    if (stateName === "Rangpur") {
        stateCode = "55";
    }
    return stateCode;
}