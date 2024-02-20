import { Checkout } from '../models/Checkout';
import { CheckoutRepositoryDB } from '../repositories/CheckoutRepository';
import { NotificationService } from './NotificationService';
import { CheckoutValidator } from '../validators/CheckoutValidator';
import { User } from '../models/User';
import { Book } from '../models/Book';

export class CheckoutManager {
  private checkoutRepository: CheckoutRepositoryDB;
  private notificationService: NotificationService;
  private checkoutValidator: CheckoutValidator;

  constructor() {
    this.checkoutRepository = new CheckoutRepositoryDB();
    this.notificationService = new NotificationService();
    this.checkoutValidator = new CheckoutValidator();
  }

  public async renewItems(items: Book[]): Promise<void> {
    try {
      this.checkoutValidator.validateItemsForRenewal(items);

      for (const item of items) {
        const checkoutData = await this.checkoutRepository.retrieveCheckout(item.bookId);

        if (!checkoutData.returned && checkoutData.dueDate > new Date()) {
          checkoutData.dueDate.setDate(checkoutData.dueDate.getDate() + 30); // Extend due date by 30 days
          await this.checkoutRepository.updateCheckout(checkoutData);
          const userId = checkoutData.userId;
          await this.notificationService.sendNotification(userId, item.bookId, checkoutData.dueDate, 'Item renewed successfully.');
        } else {
          throw new Error('Unable to renew the item. It may be returned or the due date is exceeded.');
        }
      }
    } catch (error: any) {
      console.error(`Error renewing items: ${error.message}`);
      throw new Error('Failed to renew items. Please try again.');
    }
  }

  public async checkoutItem(bookId: string, userId: string, due_date: Date): Promise<void> {
    try {
      const valid = this.checkoutValidator.validateCheckout(userId, bookId);

      if (!valid) {
        throw new Error('Invalid user or book information');
      }
      const checkout: Checkout = {
        checkoutId: 0,
        userId: userId,
        bookId: bookId,
        checkoutDate: new Date(),
        dueDate: due_date,
        returned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const checkedOut = await this.checkoutRepository.storeCheckout(checkout);
      if (checkedOut) {
        console.log('Item checked out successfully.');
        await this.notificationService.sendNotification(userId, bookId, checkout.dueDate, 'Item checked out successfully.');
      }
    } catch (error: any) {
      console.error(`Error checking out item: ${error.message}`);
      throw new Error('Failed to check out item. Please try again.');
    }
  }
}