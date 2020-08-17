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

export default style;
