const validateInputs = (inputs) => {
    const { name, email, username, password } = inputs;
    let error = "";
    // Validate name
    if (name && !name.trim()) {
        error = "Name is required";
        return error;
    } else if (name && name.trim().length > 30) {
        error = "Name must not exceed 30 characters";
        return error;
    }

    // Validate email
    if (email && !email.trim()) {
        error = "Email is required";
        return error;
    } else if (email) {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            error = "Invalid email address";
            return error;
        }
    }

    // Validate username
    if (!username.trim()) {
        error = "Username is required";
        return error;
    } else if (username.trim().length < 4 || username.trim().length > 20) {
        error = "Username must be between 4-20 characters";
        return error;
    }

    // Validate password
    if (!password.trim()) {
        error = "Password is required";
        return error;
    } else if (password.trim().length < 4 || password.trim().length > 20) {
        error = "Password must be between 4-20 characters";
        return error;
    }

    return null;
};

export default validateInputs;