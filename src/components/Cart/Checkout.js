import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() === '';
const isValidPostal = value => value.trim().length === 5;

const Checkout = props => {
  const [formInputsValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmhandler = event => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setFormInputValidity({
      name: !isEmpty(enteredName),
      street: !isEmpty(enteredStreet),
      city: !isEmpty(enteredCity),
      postalCode: isValidPostal(enteredPostalCode)
    })

    const formIsValid = !isEmpty(enteredName) && !isEmpty(enteredStreet) && !isEmpty(enteredCity) && isValidPostal(enteredPostalCode);

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    })

  }


  return <form onSubmit={confirmhandler} className={classes.form}>
    <div className={classes.control}>
      <label htmlFor="name">Your Name</label>
      <input type="text" id='name' ref={nameInputRef} />
      {!formInputsValidity.name && <p>please enter a valid name</p>}
    </div>
    <div className={classes.control}>
      <label htmlFor="street">Street</label>
      <input type="text" id='street' ref={streetInputRef} />
      {!formInputsValidity.street && <p>please enter a valid street address</p>}
    </div>
    <div className={classes.control}>
      <label htmlFor="postal">Postal Code</label>
      <input type="text" id='postal' ref={postalInputRef} />
      {!formInputsValidity.postalCode && <p>please enter a valid postal code</p>}
    </div>
    <div className={classes.control}>
      <label htmlFor="city">City</label>
      <input type="text" id='city' ref={cityInputRef} />
      {!formInputsValidity.city && <p>please enter a valid city name</p>}
    </div>
    <div className={classes.actions}>
      <button type='button' onClick={props.onCancel}>Cancel</button>
      <button>Confirm</button>
    </div>
  </form>
}

export default Checkout;