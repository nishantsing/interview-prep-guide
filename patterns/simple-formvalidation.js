/* 
Simple Form Validation

 Write a function that validates a form object.
*/

function validateForm(formData) {
    const errors = {};
    if (!formData.username) {
        errors.username = 'Username is required';
    }
    if (!formData.email.includes('@')) {
        errors.email = 'Email must be valid';
    }
    return errors;
}
// Usage
const formData = { username: '', email: 'test.com' };
const validationErrors = validateForm(formData);
console.log(validationErrors); // { username: 'Username is required', email: 'Email must be valid' }