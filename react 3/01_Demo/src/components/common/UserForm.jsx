import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "../../assets/style.css";

const API_KEY = "QVBhajhRQ2Rwd0ZxVDJxZHR0RjFSWjhTamd1TWlYRXJPQUhxcGF3Tw==";

export default function UserForm({
  user = null,
  isEdit = false,
  onSubmit,
  isOpen = true,
  closeModal,
}) {
  const [data, setData] = useState(() => {
    if (!user) {
      return {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        address2: "",
        country: "",
        countryName: "",
        state: "",
        stateName: "",
        city: "",
        cityName: "",
        terms: false,
        countries: [],
        states: [],
        cities: [],
      };
    }
    return {
      id: user.id || null,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      dob: user.dob || "",
      address: user.address || "",
      address2: user.address2 || "",
      country: user.country || "",
      countryName: user.countryName || "",
      state: user.state || "",
      stateName: user.stateName || "",
      city: user.city || "",
      cityName: user.cityName || "",
      terms: user.terms || false,
      countries: [],
      states: [],
      cities: [],
    };
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (data.country) {
      fetchStates(data.country);
    } else {
      setData((prev) => ({
        ...prev,
        states: [],
        state: "",
        stateName: "",
        city: "",
        cityName: "",
        cities: [],
      }));
    }
  }, [data.country]);

  useEffect(() => {
    if (data.state) {
      fetchCities(data.country, data.state);
    } else {
      setData((prev) => ({
        ...prev,
        cities: [],
        city: "",
        cityName: "",
      }));
    }
  }, [data.state, data.country]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://api.countrystatecity.in/v1/countries",
        {
          method: "GET",
          headers: { "X-CSCAPI-KEY": API_KEY },
        }
      );
      const result = await response.json();
      setData((prev) => ({ ...prev, countries: result }));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        {
          method: "GET",
          headers: { "X-CSCAPI-KEY": API_KEY },
        }
      );
      const result = await response.json();
      setData((prev) => ({
        ...prev,
        states: result,
      }));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
        {
          method: "GET",
          headers: { "X-CSCAPI-KEY": API_KEY },
        }
      );
      const result = await response.json();
      setData((prev) => ({
        ...prev,
        cities: result,
      }));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!data.firstName) newErrors.firstName = "Please enter your first name.";
    if (!data.lastName) newErrors.lastName = "Please enter your last name.";
    if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Please enter your email address.";
    if (!/^\d{10}$/.test(data.phone))
      newErrors.phone = "Please enter your phone number";
    if (!data.dob) newErrors.dob = "Please enter your birth date";
    if (!data.address) newErrors.address = "Please enter your address";
    if (!data.country) newErrors.country = "Select your country";
    if (!data.state) newErrors.state = "Select your state";
    if (!data.city) newErrors.city = "Select your city";
    if (!data.terms)
      newErrors.terms = "You need to agree to the terms to proceed.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userSubmission = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        address: data.address,
        address2: data.address2,
        country: data.country,
        countryName: data.countryName,
        state: data.state,
        stateName: data.stateName,
        city: data.city,
        cityName: data.cityName,
        terms: data.terms,
      };

      onSubmit(userSubmission);

      //
      if (!isEdit && closeModal) {
        setData((prev) => ({
          ...prev,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dob: "",
          address: "",
          address2: "",
          country: "",
          countryName: "",
          state: "",
          stateName: "",
          city: "",
          cityName: "",
          terms: false,
        }));
        closeModal();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "country") {
      const selectedCountry = data.countries.find((c) => c.iso2 === value);
      const countryName = selectedCountry ? selectedCountry.name : "";

      setData((prev) => ({
        ...prev,
        [name]: value,
        countryName: countryName,
      }));
    } else if (name === "state") {
      const selectedState = data.states.find((s) => s.iso2 === value);
      const stateName = selectedState ? selectedState.name : "";

      setData((prev) => ({
        ...prev,
        [name]: value,
        stateName: stateName,
      }));
    } else if (name === "city") {
      const selectedCity = data.cities.find((c) => c.id.toString() === value);
      const cityName = selectedCity ? selectedCity.name : "";

      setData((prev) => ({
        ...prev,
        [name]: value,
        cityName: cityName,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={closeModal}
      backdrop="static"
      size="md"
      centered
    >
      <ModalHeader toggle={closeModal}>
        {isEdit ? "Update User" : "Add New User"}
      </ModalHeader>
      <ModalBody>
        <div className="form-container">
          <Form onSubmit={handleSubmit} noValidate>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={data.firstName}
                    onChange={handleChange}
                    invalid={!!errors.firstName}
                  />
                  <FormFeedback style={{fontSize: "12px"}}>{errors.firstName}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={data.lastName}
                    onChange={handleChange}
                    invalid={!!errors.lastName}
                  />
                  <FormFeedback style={{fontSize: "12px"}}>{errors.lastName}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
                invalid={!!errors.email}
              />
              <FormFeedback style={{fontSize: "12px"}}>{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={data.phone}
                onChange={handleChange}
                invalid={!!errors.phone}
              />
              <FormFeedback style={{fontSize: "12px"}}>{errors.phone}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="dob">Birth Date</Label>
              <Input
                type="date"
                id="dob"
                name="dob"
                value={data.dob}
                onChange={handleChange}
                invalid={!!errors.dob}
              />
              <FormFeedback style={{fontSize: "12px"}}>{errors.dob}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="123, floor/ Building/ Street name"
                value={data.address}
                onChange={handleChange}
                invalid={!!errors.address}
              />
              <FormFeedback style={{fontSize: "12px"}}>{errors.address}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="address2">Address2</Label>
              <Input
                type="text"
                id="address2"
                name="address2"
                placeholder="Area, Main road"
                value={data.address2}
                onChange={handleChange}
              />
            </FormGroup>

            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="country">Country</Label>
                  <Input
                    type="select"
                    id="country"
                    name="country"
                    value={data.country}
                    onChange={handleChange}
                    invalid={!!errors.country}
                  >
                    <option value="">Select Country</option>
                    {data.countries.map((country) => (
                      <option key={country.iso2} value={country.iso2}>
                        {country.name}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback style={{fontSize: "12px"}}>{errors.country}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input
                    type="select"
                    id="state"
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    disabled={!data.country}
                    invalid={!!errors.state}
                  >
                    <option value="">Select State</option>
                    {data.states.map((state) => (
                      <option key={state.iso2} value={state.iso2}>
                        {state.name}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback style={{fontSize: "12px"}}>{errors.state}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="select"
                    id="city"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    disabled={!data.state}
                    invalid={!!errors.city}
                  >
                    <option value="">Select City</option>
                    {data.cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback style={{fontSize: "12px"}}>{errors.city}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup check>
              <Input
                type="checkbox"
                id="terms"
                name="terms"
                checked={data.terms}
                onChange={handleChange}
                invalid={!!errors.terms}
              />
              <Label for="terms" check>
                I agree to the terms and conditions
              </Label>
              {errors.terms && (
                <FormFeedback style={{ display: "block",fontSize: "12px" }}>
                  {errors.terms}
                </FormFeedback>
              )}
            </FormGroup>

            <Button color="primary" type="submit" className="mt-3">
              {isEdit ? "Update" : "Submit"}
            </Button>
            {closeModal && (
              <Button color="secondary" onClick={closeModal} className="mt-3 ms-2">
                Cancel
              </Button>
            )}
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
}
