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
                    // alert('Form submitted successfully!');
                    setFormData({ ...formData, comment: '' });
                    setFormMessage('Thank you for your message! We will get back to you within 24 hours.');
                } else {
                    alert('Error submitting the form. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
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
        if (!data.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!data.lastName.trim()) {
            errors.lastName = 'Last name is required';
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
            <h1>Questions, comments or concerns please contact us below!</h1>
            <form id="contactForm" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                
                {errors.firstName && <small>{errors.firstName}</small>}
                
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

                {errors.lastName && <small>{errors.lastName}</small>}

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

                {errors.phoneNumber && <small>{errors.phoneNumber}</small>}

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                {errors.email && <small>{errors.email}</small>}

                <label htmlFor="comment">Comment:</label>
                <textarea id="comment" name="comment" value={displayComment(formData.comment)} onChange={handleChange}></textarea>

                {errors.comment && <small>{errors.comment}</small>}

                <input type="submit" value="Submit" />
                {formMessage && <p id="contactFormMessage">{formMessage}</p>}
            </form>
            
            {/* {formMessage && <p id="contactFormMessage">{formMessage}</p>} */}

        </div>
    );
};

function displayComment(comment) {
    return comment.length > 0 ? comment : '';
}

export default ContactPage;
