export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email?.trim()) return "Email is required";
    if (!regex.test(email)) return "Please enter a valid email address";
    return null;
};

export const validatePassword = (password) => {
    if (!password?.trim()) return "Password is required";
    if (password.length < 10) return "Password should be at least 10 characters long";
    return null;
};

export const validateConfirmPassword = ({ password, confirmPassword }) => {
    if (!confirmPassword?.trim()) return "Confirm Password is required";
    if (password !== confirmPassword) return "Password do not match";
    return null;
};

export const validateUserName = (userName) => {
    if (!userName?.trim()) return "Username is required";
    return null;
};

export const validateContact = (contact) => {
    if (!contact?.trim()) return "Contact is required";
    if (contact.length < 10) return "Invalid Contact";
    return null;
};

export const validateAddress = (address) => {
    if (!address?.trim()) return "Address is required";
    return null;
};

export const validateForm = (formData) => {
    const errors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword({ 
        password: formData.password, 
        confirmPassword: formData.confirmPassword 
    });
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    const userNameError = validateUserName(formData.userName);
    if (userNameError) errors.userName = userNameError;

    const contactError = validateContact(formData.contact);
    if (contactError) errors.contact = contactError;

    const addressError = validateAddress(formData.address);
    if (addressError) errors.address = addressError;

    return errors;
};
