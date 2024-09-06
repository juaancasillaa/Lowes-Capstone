import React, { useState } from 'react';
import "../css/ContactPage.css";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        comment: ''
    });

    const [errors, setErrors] = useState({});
    const [formMessage, setFormMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    setFormData({
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        email: '',
                        comment: ''
                    });
                    setErrors({});
                    setFormMessage('Thank you for your message! We will get back to you within 24 hours.');
                } else {
                    setFormMessage('Error submitting the form. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                setFormMessage('An error occurred. Please try again.');
            }
        } else {
            setErrors(validationErrors);
            setFormMessage('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = (data) => {
        const errors = {};
        const nameRegex = /^[a-zA-Z]+$/;

        if (!data.firstName.trim()) {
            errors.firstName = 'First name is required';
        } else if (!nameRegex.test(data.firstName)) {
            errors.firstName = 'First name cannot contain numbers or special characters';
        }

        if (!data.lastName.trim()) {
            errors.lastName = 'Last name is required';
        } else if (!nameRegex.test(data.lastName)) {
            errors.lastName = 'Last name cannot contain numbers or special characters';
        }

        if (!data.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        }

        if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email address';
        }

        if (!data.comment.trim()) {
            errors.comment = 'Comment is required';
        }

        return errors;
    };

    return (
        <div className='body'>
            <h1 className='contact-h1'>Get in touch with our team</h1>
            <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-groupp">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className='contact-input' id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <small className="error">{errors.firstName}</small>}
                </div>

                <div className="form-groupp">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className='contact-input' id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <small className="error">{errors.lastName}</small>}
                </div>

                <div className="form-groupp">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" className='contact-input' id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    {errors.phoneNumber && <small className="error">{errors.phoneNumber}</small>}
                </div>

                <div className="form-groupp">
                    <label htmlFor="email">Email</label>
                    <input type="email" className='contact-input' id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <small className="error">{errors.email}</small>}
                </div>

                <div className="form-groupp">
                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange}></textarea>
                    {errors.comment && <small className="error">{errors.comment}</small>}
                </div>

                <button className="cnct-submit" type="submit" value="Submit">Submit</button>
                {formMessage && <p className="form-message">{formMessage}</p>}
            </form>
           
        </div>
    );
};

export default ContactPage;
