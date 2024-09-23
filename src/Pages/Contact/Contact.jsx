import React, { useRef } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_g00oai4', 'template_l9ys2yn', form.current, {
      publicKey: 'LR6iMnt9axgX2LAEZ',
    })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Email Sent Successfully")
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error("Email not sent! try again")
        },
      );
  };
  return (
    <div className="contact">
      <img src={assets.contact_img} alt="" />
      <form ref={form} onSubmit={sendEmail}>
        <h1>CONTACT US</h1>
        <label htmlFor="name"> Your Name</label>
        <input type="text" id='name' placeholder='Enter your name' name="your_name" required />
        <label htmlFor="email"> Your Email</label>
        <input type="email" id='email' placeholder='Enter your email' name="your_email" required />
        <label htmlFor="subject"> Subject</label>
        <input type="text" id='subject' placeholder='Subject' name="your_subject" required />
        <label htmlFor="message"> Type your message here</label>
        <textarea name="message" id="message" rows="10" placeholder='Input your message' required></textarea>
        <button type='submit' value="Send">Submit</button>
      </form>

    </div>
  )
}

export default Contact
