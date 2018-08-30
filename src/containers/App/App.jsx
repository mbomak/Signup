// import modules
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {Field, Fields, getFormMeta, change, reduxForm} from 'redux-form';
import Select from 'react-select';

// import components
import Header from 'components/Header';
import ProgressBar from 'components/ProgressBar';
import Button from 'components/Button';

// import selectors and actions
import {
    selectors as dataSelectors,
    actions as dataActions,
} from 'modules/data';

//import validate function
import validate from '../../shared/validate/validate';

// import styles
import './App.css';
import './Form.css';

const normalizeData = (data) => {
    const birthDay = data.birthDay + data.birthMonth + data.birthYears;
    delete data.birthDay;
    delete data.birthMonth;
    delete data.birthYears;
    delete data.cPassword;

    return {
        userData: {
            ...data,
            birthDay
        }
    };
};

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            gender: 'male',
            selectedOption: null
        }
    }

    renderField = ({
        input,
        label,
        id,
        className,
        type,
        meta: {touched, error}
    }) => {
        const isError = touched && error;
        const labelInner = () => {
            if (isError) {
                return error;
            } else {
                return label;
            }
        };

        return (
            <div
                className={cn(
                    'form__group',
                    {'form__group_err': isError}
                )}
            >
                <label htmlFor={id}>{labelInner()}</label>
                <input
                    {...input}
                    id={id}
                    className={cn('form__field', className)}
                    type={type}
                />
            </div>
        );
    };

    renderBirthday = ({type, birthDay, birthMonth, birthYears}) => {
        const err = (birthDay.meta.touched && birthDay.meta.error) ||
            (birthMonth.meta.touched && birthMonth.meta.error) ||
            (birthYears.meta.touched && birthYears.meta.error);

        const labelInner = () => {
            if (err) {
                return birthDay.meta.error || birthMonth.meta.error || birthYears.meta.error;
            } else {
                return 'Date of birth';
            }
        };

        return (
            <div
                className={cn(
                    'form__birthday',
                    {'form__birthday_err': err}
                )}
            >
                <label htmlFor="birthday-1">{labelInner()}</label>
                <div className="form__birthday-wrapp">
                    <input
                        {...birthDay.input}
                        id="birthday-1"
                        type={type}
                        placeholder="DD"
                    />
                    <input
                        {...birthMonth.input}
                        type={type}
                        placeholder="MM"
                    />
                    <input
                        {...birthYears.input}
                        type={type}
                        placeholder="YYYY"
                    />
                </div>
            </div>
        );
    };

    renderGender = ({input, label}) => {
        const handleChange = (e) => {
            const target = e.target;
            const value = target.value;
            this.setState({
                gender: value
            });
            target.blur();
        };

        return (
            <div className="form__gender">
                <div className="form__gender-title">{label}</div>
                <div className="form__gender-wrapp">
                    <input
                        {...input}
                        id="gender-1"
                        type="radio"
                        checked={this.state.gender === 'male'}
                        value="male"
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="gender-1">male</label>
                    <input
                        {...input}
                        id="gender-2"
                        type="radio"
                        checked={this.state.gender === 'female'}
                        value="female"
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="gender-2">female</label>
                    <input
                        {...input}
                        id="gender-3"
                        type="radio"
                        checked={this.state.gender === 'unspecified'}
                        value="unspecified"
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="gender-3">unspecified</label>
                </div>
            </div>
        );
    };

    renderAboutUs = ({input, label}) => {
        const handleChangeSelect = (selectedOption) => {
            this.setState({selectedOption});
            this.select.blur();
        };

        return (
            <div className="form__select">
                <label>{label}</label>
                <Select
                    ref={el => this.select = el}
                    {...input}
                    className="form__select-item"
                    classNamePrefix="sl"
                    value={this.state.selectedOption}
                    onChange={handleChangeSelect}
                    placeholder=""
                    options={[
                        {value: 'instagram', label: 'Instagram'},
                        {value: 'twitter', label: 'Twitter'},
                        {value: 'friends', label: 'Friends'},
                        {value: 'another', label: 'Another'}
                    ]}
                />
            </div>
        );
    };

    detectErrInDOM = () => {
        const el = document.querySelectorAll('.form__group');
        let isErr = false;
        el.forEach(obj => {
            if (obj.classList.contains('form__group_err')) {
                isErr = true;
            }
        });
        return isErr;
    };

    handleNext = () => {
        const {
            changeTitle,
            dispatch
        } = this.props;

        if (this.detectErrInDOM()) {
            return false;
        }

        if (this.state.step === 2) {
            changeTitle('Thank you!');
            dispatch(change('signupForm', 'gender', this.state.gender));
            dispatch(change('signupForm', 'howHearAboutUs', this.state.selectedOption.value));
        }

        this.setState({
            step: this.state.step + 1
        });
    };

    handleBack = () => {
        this.setState({
            step: this.state.step - 1
        });
    };

    isDisabledNextBtn = () => {
        const meta = this.props.formMeta;
        if (this.state.step === 1) {
            return !(
                meta.hasOwnProperty('email') &&
                meta.hasOwnProperty('password') &&
                meta.hasOwnProperty('cPassword')
            );
        } else if (this.state.step === 2) {
            return this.props.invalid;
        }
    };

    render() {
        const {
            handleSubmit,
            title
        } = this.props;
        console.log(this.props);
        return (
            <div className="app">
                <Header title={title}/>
                <main className="app__main">
                    <ProgressBar step={this.state.step}/>
                    <form className="form" onSubmit={handleSubmit}>
                        <div
                            className={cn(
                                'form__step',
                                {'active': this.state.step === 1}
                            )}
                        >
                            <Field
                                id="email"
                                name="email"
                                label="email"
                                component={this.renderField}
                                type="text"
                                err={this.state.errStep}
                            />
                            <Field
                                id="password"
                                name="password"
                                label="password"
                                component={this.renderField}
                                type="password"
                                err={this.state.errStep}
                            />
                            <Field
                                id="cPassword"
                                name="cPassword"
                                label="Confirm password"
                                component={this.renderField}
                                type="password"
                                err={this.state.errStep}
                            />
                        </div>
                        <div
                            className={cn(
                                'form__step',
                                {'active': this.state.step === 2}
                            )}
                        >
                            <Fields
                                names={[
                                    'birthDay',
                                    'birthMonth',
                                    'birthYears'
                                ]}
                                type="number"
                                component={this.renderBirthday}
                            />

                            <Field
                                name="gender"
                                component={this.renderGender}
                                label="Gender"
                            />

                            <Field
                                name="howHearAboutUs"
                                label="Where did you hear about us?"
                                component={this.renderAboutUs}
                            />
                        </div>
                        <div
                            className={cn(
                                'form__step',
                                {'active': this.state.step === 3}
                            )}
                        >
                            <div className="form__success">&#10004;</div>
                            <Button
                                className="form__btn-submit"
                                title="Go to Dashboard"
                                arrow={true}
                                type="submit"
                            />
                        </div>
                        <div
                            className={cn(
                                'form__footer',
                                {'form__footer_hidden': this.state.step === 3}
                            )}
                        >
                            <Button
                                className={cn(
                                    'form__btn-back',
                                    {'form__btn-back_hidden': this.state.step === 1}
                                )}
                                title="Back"
                                clickHandle={this.handleBack}
                            />
                            <Button
                                className={cn(
                                    'form__btn-next',
                                    {'form__btn-next_disable': this.isDisabledNextBtn()}
                                )}
                                title="Next"
                                arrow={true}
                                clickHandle={this.handleNext}
                            />
                        </div>
                    </form>
                </main>
            </div>
        );
    }
}

App.propTypes = {
    title: PropTypes.string,
    invalid: PropTypes.bool,
    anyTouched: PropTypes.bool,
    handleSubmit: PropTypes.func,
    changeTitle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    title: dataSelectors.getTitle,
});

const mapDispatchToProps = {
    changeTitle: dataActions.changeTitle,
};

let AppWithForm = reduxForm({
    form: 'signupForm',
    onSubmit: values => console.log('result', normalizeData(values)),
    validate
})(App);
AppWithForm = connect(state => ({
    formMeta: getFormMeta('signupForm')(state)
}))(AppWithForm);

export default connect(mapStateToProps, mapDispatchToProps)(AppWithForm);
