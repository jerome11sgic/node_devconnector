import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common//TextFieldGroup";
import TextAreaFieldGroup from "../common//TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AddExperience } from "../../actions/profileAction";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disableed: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  componentWillReceiveProps(nextProps) {
if(nextProps.errors){
this.setState({errors:nextProps.errors})
}
  }
  onSubmit(e) {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.description
    };
    this.props.addExperience(expData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck(e) {
    this.setState({
      disabled: !this.state.disableed,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="constainer">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="dispaly-4 text-center">Add experience</h1>
              <p className="lead text-center">
                add any job or position you have had in the past or current
              </p>
              <small className="d-block pb-3">*= required fields </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeHolder="* company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeHolder="* Job title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeHolder="* location"
                  name="location "
                  value={this.state.loaction}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>from date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>TO date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="frorm-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    current job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeHolder="job description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="tell us about the position"
                />
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddExperience.PropTypes = {
  addExperience: this.Function.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
