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
