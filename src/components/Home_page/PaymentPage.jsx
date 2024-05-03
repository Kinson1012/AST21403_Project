import React from 'react'
import Card from "react-credit-cards-2";
import "./style.css";
import './bookcar'
import { Link } from 'react-router-dom';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";

import "react-credit-cards-2/dist/es/styles-compiled.css";


export default class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.searchParams = new URLSearchParams(window.location.search);
    this.price = this.searchParams.get('price');
    console.log(this.price);
  }


  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    const searchParams = new URLSearchParams(window.location.search);
    const price = searchParams.get('price');

    return (
      <div key="Payment">
        <div className="App-payment">
          <h1>Credit Cards Payment</h1>
          <h4>Enter your payment detail</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="col-6">
              <input
                type="tel"
                name="number"
                className="form-control1"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                name="name"
                className="form-control2"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control3"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control4"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
            </div>          
            <div className='price'>
             <p>Price: ${price}</p>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <Link to='/BookingComplete'><button className="btn btn-primary btn-block">PAY</button></Link>
            </div>
          </form>

          {/* {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    );
  }
}