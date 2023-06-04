const validateInputs = (inputs) => {
    const { name, email, username, password, title, content } = inputs;
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
    if (username && !username.trim()) {
        error = "Username is required";
        return error;
    } else if (username && (username.trim().length < 4 || username.trim().length > 20)) {
        error = "Username must be between 4-20 characters";
        return error;
    }

    // Validate password
    console.log("password");
    if (password && !password.trim()) {
        error = "Password is required";
        return error;
    } else if (password && (password.trim().length < 4 || password.trim().length > 20)) {
        error = "Password must be between 4-20 characters";
        return error;
    }

    // Validate title

    if (title && !title.trim()) {
        error = "Title is required";
        return error;
    } else if (title && title.trim().length > 50) {
        error = "Title can be at most 50 characters";
        return error;
    }

    // Validate content
    if (content && !content.trim()) {
        error = "Content is required";
        return error;
    } else if (content && content.trim().length > 1000) {
        error = "Content can be at most 1000 characters";
        return error;
    }

    return null;
};

export default validateInputs;