### Checkout Service

The checkout service is responsible for checking out books/ placing holds and managing the library's collection of books. It provides the following functionality:

3. View Library Records (Checkout Service):

   - Test Case 1: View Checked-Out Items

     Input: User ID
     Expected Output: List of checked-out items with due dates

   - Test Case 2: View No Checked-Out Items

     Input: User ID with no checked-out items
     Expected Output: Empty list

4. Renew Checked-Out Items (Checkout Service):

   - Test Case 1: Renew Checked-Out Item

     Input: Checked-out item ID
     Expected Output: Renewal confirmation and updated due date

   - Test Case 2: Renew Overdue Item

     Input: Overdue checked-out item ID
     Expected Output: Error message and inability to renew

5. Place a Hold on Checked-Out Items (Checkout Service):

   - Test Case 1: Place a Hold on Checked-Out Item

     Input: Checked-out item ID
     Expected Output: Hold placed successfully

   - Test Case 2: Place Hold on Available Item

     Input: Item available in the library
     Expected Output: Error message


### Database Schema

Tables: checkouts, checkout_holds

```bash
-- Schema Creation
-- Table for managing checkouts
CREATE TABLE checkouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    book_id INTEGER,
    checkout_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    returned BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for tracking holds on checked-out items
CREATE TABLE checkout_holds (
    id SERIAL PRIMARY KEY,
    book_id INTEGER,
    user_id INTEGER,
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```