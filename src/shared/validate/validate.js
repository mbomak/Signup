import moment from 'moment';

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Enter a password of at least 6 characters';
    }

    if (!values.cPassword) {
        errors.cPassword = 'Password confirmation is required';
    } else if (values.password !== values.cPassword) {
        errors.cPassword = 'Password confirmation should match the password';
    }

    if (!values.birthDay) {
        errors.birthDay = 'Birthday is required';
    } else if (values.birthDay < 1 || values.birthDay > 31) {
        errors.birthDay = 'Invalid  day of birth';
    }

    if (!values.birthMonth) {
        errors.birthMonth  = 'Birthday is required';
    } else if (values.birthMonth < 1 || values.birthMonth > 12) {
        errors.birthMonth = 'Invalid month of birth';
    }

    if (!values.birthYears) {
        errors.birthYears  = 'Birthday is required';
    } else if (values.birthYears > moment().format('YYYY')) {
        errors.birthYears = 'Invalid year of birth. You are form future?!';
    }

    return errors;
}
export default validate;
