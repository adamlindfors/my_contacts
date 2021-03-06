import React, { Component } from "react";
import { addContact } from "../actions/contactActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";
import { setAuth, userLogin } from "../actions/authActions";
import ImageUploaderWidget from "./ImageUploaderWidget";
import {
  faCamera,
  faMapMarkedAlt,
  faPhoneAlt,
  faBirthdayCake,
  faBriefcase,
  faEnvelope,
  faUsers,
  faKey,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardBody, CardTitle, CardHeader, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import InfoCard from "./InfoCard";

class CreateContact extends Component {
  state = {
    name: "",
    address: "",
    phoneNumber: "",
    image: "",
    work: "",
    email: "",
    doorCode: "",
    birthday: "",
    relationship: "",
    label: "",
  };

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.props.authReducer.Authenticated) {
      this.props.setAuth(authenticated);
    }
  };

  async componentDidMount() {
    await this.checkAuthentication();
    if (this.props.authReducer.Authenticated) {
      this.props.userLogin();
    }
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  onChangeWork = (e) => {
    this.setState({
      work: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangeBirthday = (e) => {
    this.setState({
      birthday: e.target.value,
    });
  };

  onChangePhoneNumber = (e) => {
    this.setState({
      phoneNumber: e.target.value,
    });
  };

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onChangeRelationship = (e) => {
    this.setState({
      relationship: e.target.value,
    });
  };

  onChangeDoorCode = (e) => {
    this.setState({
      doorCode: e.target.value,
    });
  };

  onImageSuccess = async (res) => {
    await res;
    this.setState({
      image: res,
    });
  };

  passBody = () => {
    return (
      <FontAwesomeIcon icon={faCamera} className="fa-2x"></FontAwesomeIcon>
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      image: this.state.image,
      label: this.state.label,
      work: this.state.work,
      email: this.state.email,
      doorCode: this.state.doorCode,
      birthday: this.state.birthday,
      relationship: this.state.relationship,
    };

    this.props.addContact(newContact, this.props.authReducer.subID);
    window.location = "/";
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <fieldset disabled={this.state.disabledEdit}>
            <div className="row mobile">
              <div className="col-md-4 mb-3">
                <img
                  src={
                    this.state.image
                      ? "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_300,h_300/" +
                        this.state.image
                      : "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_300,h_300/https://res.cloudinary.com/mycontacts/image/upload/v1589640571/myContacts/g1gk0riburccmbjzxgzr.png"
                  }
                  data-holder-rendered="true"
                  alt=""
                />
              </div>
              <div className="col ">
                <input
                  className="form-control form-control-lg text-center"
                  ref="userInput"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  type="text-name"
                  placeholder="Name"
                ></input>
              </div>
            </div>

            {/* Camera Button */}
            <div className="d-flex" style={{ paddingLeft: "12%" }}>
              <ImageUploaderWidget
                onImageSuccess={this.onImageSuccess}
                passBody={this.passBody}
              />
            </div>
            <hr />
            <Row lg="4" sm="2" md="3" xs="1">
              <InfoCard
                icon={faMapMarkedAlt}
                onChange={this.onChangeAddress}
                title={"Address"}
              />
              <InfoCard
                info={this.state.phoneNumber}
                icon={faPhoneAlt}
                onChange={this.onChangePhoneNumber}
                title={"Number"}
              />
              <InfoCard
                info={this.state.email}
                icon={faEnvelope}
                onChange={this.onChangeEmail}
                title={"Email"}
              />
              <InfoCard
                info={this.state.birthday}
                icon={faBirthdayCake}
                onChange={this.onChangeBirthday}
                title={"Birthday"}
              />
              <InfoCard
                info={this.state.work}
                icon={faBriefcase}
                onChange={this.onChangeWork}
                title={"Work"}
              />
              <InfoCard
                info={this.state.doorCode}
                icon={faKey}
                onChange={this.onChangeDoorCode}
                title={"Code"}
              />
              <InfoCard
                info={this.state.relationship}
                icon={faHeart}
                onChange={this.onChangeRelationship}
                title={"Status"}
              />
              <div style={{ padding: "1vh" }}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="text-center">
                        <h2>
                          <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>{" "}
                          Group
                        </h2>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <select
                      style={{ cursor: "pointer" }}
                      ref="userInput"
                      className="form-control"
                      value={this.state.label}
                      onChange={this.onChangeLabel}
                    >
                      <option>No label</option>
                      {this.props.labelReducer.labels.map((label) => {
                        return (
                          <option key={label} value={label}>
                            {label}     
                          </option>
                        );
                      })}
                    </select>
                  </CardBody>
                </Card>
              </div>
            </Row>
            <div className="text-center" style={{ margin: "5vh" }}>
              <input
                type="submit"
                value="Save Contact"
                className="btn btn-primary btn-lg"
              />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

CreateContact.propTypes = {
  addContact: PropTypes.func.isRequired,
  contactReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contactReducer: state.contactReducer,
  authReducer: state.authReducer,
  labelReducer: state.labelReducer,
});

export default connect(mapStateToProps, { addContact, setAuth, userLogin })(
  withAuth(CreateContact)
);
