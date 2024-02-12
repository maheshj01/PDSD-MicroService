class Validator {
    static validateBookDetails(bookDetails: any): boolean {
        // Implement validation logic for book details
        // For demonstration purposes, check if the required fields are present
        return (
            bookDetails &&
            bookDetails.title &&
            bookDetails.author &&
            bookDetails.isbn &&
            bookDetails.category
        );
    }

    static validateUserDetails(userDetails: any): boolean {
        // Implement validation logic for user details
        // For demonstration purposes, check if the required fields are present
        return (
            userDetails &&
            userDetails.username &&
            userDetails.email &&
            userDetails.password &&
            userDetails.userRole
        );
    }
}

export default Validator;
