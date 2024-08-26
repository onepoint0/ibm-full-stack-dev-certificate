import React, { useState } from "react";
import "./FeedbackForm.css"; // Import CSS for styling

const FeedbackForm = () => {
  const formInit = {
    name: '',
    email: '',
    feedback: '',
    rating: ''
  }

  const [form, setForm] = useState(formInit)

  const handleSetForm = (e) => { 
    const {name,value} = e.target;
    console.log('handleSetForm - setting ',name,' to ',value);
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const confirmationMsg =
      `Please confirm details:
       Name:    ${form.name}
       Email:   ${form.email}
       Message: ${form.feedback}
       Rating:  ${form.rating}`

    const send = confirm(confirmationMsg)

    if (send) {
      console.log('Submitting form!')
      setForm(formInit)
      alert('Thank you for submitting feedback!')
    } else {
      console.log('cancelled')
    }
  }

  return (
    <>
      <nav>
        Tell Us What You Think
      </nav>
      <form className="feedback-form">
        <h2>We'd Love to Hear From You!</h2>
        <p>Please share your feedback with us.</p>
        <input
          type="text"
          placeholder="Your name"
          name="name"
          value={form.name}
          onChange={handleSetForm}
          />
        <input
          type="email"
          placeholder="Your email address"
          name="email"
          value={form.email}
          onChange={handleSetForm}
        />
        <textarea
          name="feedback"
          placeholder="Your feedback"
          value={form.feedback}
          onChange={handleSetForm}
        ></textarea>
        <h3 className="rating">Give us a rating?</h3>
        <div className="radios">
          <div><input type="radio" name="rating" value="1" onChange={handleSetForm} checked={form.rating==1} /> 1</div>
          <div><input type="radio" name="rating" value="2" onChange={handleSetForm} checked={form.rating==2} /> 2</div>
          <div><input type="radio" name="rating" value="3" onChange={handleSetForm} checked={form.rating==3} /> 3</div>
          <div><input type="radio" name="rating" value="4" onChange={handleSetForm} checked={form.rating==4} /> 4</div>
          <div><input type="radio" name="rating" value="5" onChange={handleSetForm} checked={form.rating==5} /> 5</div>
        </div>
        <button type="submit" onClick={e => handleSubmit(e)}>Submit</button>
      </form>
    </>
  );
};

export default FeedbackForm;
