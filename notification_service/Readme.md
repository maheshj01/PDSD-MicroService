### Notification Service

This service is responsible for sending email/app notifications to users. A cron job is scheduled to run every 24 hours to check for due dates and send notifications to users.


10. View Due Date Notifications (Notification Service):

   - Test Case 1: Receive Email Notification

      Input: Due date approaching
      Expected Output: Email notification received

   - Test Case 2: Receive In-App Notification

      Input: Due date approaching
      Expected Output: In-app notification received