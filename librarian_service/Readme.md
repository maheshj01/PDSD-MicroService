### Librarian Service

The librarian service is responsible for managing the library's collection of books and users. It provides the following functionality:

### Test Cases bases on User Story  

6. Add Books to the Collection (Librarians Only) (Librarian Service):

   - Test Case 1: Add New Book

     Input: Title, author, category, availability status
     Expected Output: Book added to the collection

   - Test Case 2: Add Book with Missing Information

     Input: Incomplete book information
     Expected Output: Error message

7. Register New Users (Librarians Only) (Librarian Service):

   - Test Case 1: Register New User

     Input: Name, ID, contact details
     Expected Output: User successfully registered

   - Test Case 2: Register User with Invalid Information

     Input: Incomplete or invalid user information
     Expected Output: Error message

8. Edit User Information (Librarians Only) (Librarian Service):

- Test Case 1: Edit User Contact Details

  Input: Updated contact details
  Expected Output: User details updated successfully

- Test Case 2: Edit User Status

  Input: Change in user status
  Expected Output: User status updated

### Test Cases based on Service

6. Librarian Service:

   1. Manage Librarian Actions:

   - Test Case 1: Register New Users

     Input: User registration information
     Expected Output: New user registered successfully

   - Test Case 2: Approve Book Request

     Input: Book request with valid justification
     Expected Output: Request approved

   - Test Case 3: Deny Book Request

     Input: Book request with valid justification
     Expected Output: Request denied with a reason

   - Test Case 4: Edit User Information

     Input: Updated user details
     Expected Output: User details updated successfully

   - Test Case 5: Generate Reports

     Input: Report request
     Expected Output: Report generated and available for download
