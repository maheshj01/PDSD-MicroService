// src/services/NotificationManager.ts
import { Pool, PoolClient } from 'pg';
import { NotificationPreferences } from '../models/NotificationPreferences';
import schedule from 'node-schedule';
import dotenv from 'dotenv';
import { EmailService } from './EmailService';
import { Checkout } from '../models/Checkout';
import axios from 'axios';
import EmailUtils from '../utils/EmailUtils';

dotenv.config();
export class NotificationManager {
    private pool: Pool;
    private client: PoolClient;
    private emailService = new EmailService();

    constructor() {
        this.client = {} as PoolClient;
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432', 10),
        });
        this.connect(); // Connect to the database when the class is instantiated
    }

    private connect(): void {
        this.pool.connect((err, client, done) => {
            if (err) throw err;
            this.client = client!;
            console.log('Connected to the Notifications database');
            this.runNotificationsJob();
        });
    }

    public async disconnect(): Promise<void> {
        try {
            await this.pool.end();
            console.log('Disconnected from the database');
        } catch (err: any) {
            console.error('Error disconnecting from the database:', err.message);
        }
    }

    private async runNotificationsJob(): Promise<void> {
        const cronSchedule = process.env.CRON_SCHEDULE || '0 0 * * *'; // Default to run daily at midnight
        const cronScheduleinHumanReadableFormat = schedule.scheduleJob(cronSchedule, () => { }).nextInvocation().toString();
        // Log cron schedule in human readable format
        console.log(`Next Cron scheduled at ${cronScheduleinHumanReadableFormat}`)
        // Schedule a daily task to process due date notifications
        schedule.scheduleJob(cronSchedule, async () => {
            try {
                await this.sendDueDateNotifications();
            } catch (error: any) {
                console.error('Error in scheduled task:', error);
            }
        });

    }

    private async sendDueDateNotifications(): Promise<void> {
        try {
            console.log('Sending due date notifications');
            const dueCheckouts = await this.fetchDueCheckouts();
            // Iterate over due checkouts and send notifications
            for (const checkout of dueCheckouts) {
                const formattedDate = EmailUtils.formatToCustomString(checkout.dueDate, 'yyyy/mm/dd hh:mm');
                this.emailService.sendDueNotification(checkout.userId, checkout.bookId, checkout.dueDate.toString());
            }
        } catch (error: any) {
            console.error('Error sending due date notifications:', error);
        }
    }

    private async fetchDueCheckouts(): Promise<Checkout[]> {
        try {
            const response = await axios.get(process.env.CHECKOUT_SERVICE_BASE_URL + '/api/checkout/due-checkouts'); // Replace with your actual API endpoint
            const checkouts = [];
            for (const checkout of response.data) {
                checkouts.push({
                    checkoutId: checkout.checkout_id,
                    userId: checkout.user_id,
                    bookId: checkout.book_id,
                    dueDate: checkout.due_date,
                    checkoutDate: checkout.checkout_date,
                    returned: checkout.returned,
                    createdAt: checkout.created_at,
                    updatedAt: checkout.updated_at
                });
            }
            return checkouts;

        } catch (error: any) {
            console.error('Error fetching due checkouts:', error);
            return [];
        }
    }

    public async manageNotificationPreferences(
        user_id: number,
        email_enabled: boolean,
        in_app_enabled: boolean
    ): Promise<void> {
        try {
            await this.client.query('BEGIN');
            const result = await this.client.query(
                'INSERT INTO notification_preferences (user_id, email_enabled, in_app_enabled) VALUES ($1, $2, $3) ' +
                'ON CONFLICT (user_id) DO UPDATE SET email_enabled = $2, in_app_enabled = $3',
                [user_id, email_enabled, in_app_enabled]
            );
            await this.client.query('COMMIT');
            if (result.rowCount === 0) {
                throw new Error('Failed to update notification preferences');
            }

        } catch (error) {
            await this.client.query('ROLLBACK');
            throw error;
        } finally {
            this.client.release();
        }
    }
}
