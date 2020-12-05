const style = (errorColor) => `
.StripeElement {
  height: 50px;
  padding: 15px 12px;
  border-radius: 10px;
  background:#EDF2F7;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color:${errorColor}
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
 `

const payStyle = (errorColor) => `
.StripeElement {
  height: 40px;
  padding: 10px 12px;
  border-radius: 0.5rem;
  border: 1px solid;
  transition: box-shadow 150ms ease;
  border-color: inherit;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color:${errorColor}
}


 `
export { payStyle }
export default style;
