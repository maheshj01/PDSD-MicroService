import { Checkout } from '../models/Checkout';
import { CheckoutRepositoryDB } from '../repositories/CheckoutRepository';
import { NotificationService, NotificationType } from './NotificationService';
import { CheckoutValidator } from '../validators/CheckoutValidator';
import { User } from '../models/User';
import { Book } from '../models/Book';
import e from 'express';
import axios from 'axios';

export class CheckoutManager {
  private checkoutRepository: CheckoutRepositoryDB;
  private checkoutValidator: CheckoutValidator;
  private token: string;
  constructor() {
    this.checkoutRepository = new CheckoutRepositoryDB();
    this.checkoutValidator = new CheckoutValidator();
    this.token = '';
  }

  public async renewItems(checkoutId: string): Promise<void> {
    try {
      // this.checkoutValidator.validateItemsForRenewal(items);
      const checkoutData = await this.checkoutRepository.retrieveCheckout(checkoutId);
      if (!checkoutData.returned && checkoutData.due_date > new Date()) {
        checkoutData.due_date.setDate(checkoutData.due_date.getDate() + 30); // Extend due date by 30 days
        await this.checkoutRepository.updateCheckout(checkoutData);
      } else {
        throw new Error('Unable to renew the item. It may be returned or the due date is exceeded.');
      }
    } catch (error: any) {
      console.error(`Error renewing items: ${error.message}`);
      throw new Error('Failed to renew items. Please try again.');
    }
  }

  public async checkoutItem(bookId: string, userId: string, due_date: Date): Promise<Checkout> {
    try {
      const valid = this.checkoutValidator.validateCheckout(userId, bookId);
      if (!valid) {
        throw new Error('Invalid user or book information');
      }
      const checkout: Checkout = {
        id: 0,
        user_id: userId,
        book_id: bookId,
        checkout_date: new Date(),
        due_date: due_date,
        returned: false,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const checkedOut = await this.checkoutRepository.storeCheckout(checkout);
      return checkedOut;
    } catch (error: any) {
      console.error(`Error checking out item: ${error.message}`);
      throw new Error(error.message);
    }
  }

  public async checkoutItems(bookIds: string[], userId: string, due_date: Date): Promise<Checkout[]> {
    try {
      // Start a transaction
      await this.checkoutRepository.beginTransaction();

      const checkedOutItems: Checkout[] = [];

      // Loop through each book ID and checkout the item
      for (const bookId of bookIds) {
        const checkedOutItem = await this.checkoutItem(bookId, userId, due_date);
        checkedOutItems.push(checkedOutItem);
      }

      // Commit the transaction
      await this.checkoutRepository.commitTransaction();

      return checkedOutItems;
    } catch (error: any) {
      // Rollback the transaction if an error occurs
      await this.checkoutRepository.rollbackTransaction();
      console.error(`Error checking out items: ${error.message}`);
      throw new Error(error.message);
    }
  }
  public async returnItem(checkoutId: string): Promise<Checkout> {
    try {
      const checkoutData = await this.checkoutRepository.retrieveCheckout(checkoutId);

      if (!checkoutData.returned) {
        checkoutData.returned = true;
        await this.checkoutRepository.updateCheckout(checkoutData);
        return checkoutData;
      } else {
        throw new Error('Item has already been returned');
      }
    } catch (error: any) {
      console.error(`Error returning item: ${error.message}`);
      throw new Error('Failed to return item. Please try again.');
    }

  }


  public async checkouts(): Promise<Checkout[]> {
    try {
      const checkouts = await this.checkoutRepository.retrieveCheckouts();
      return checkouts;
    } catch (error: any) {
      console.error(`Error retrieving checkouts: ${error.message}`);
      throw new Error('Failed to retrieve checkouts');
    }
  }

  public async dueCheckouts(): Promise<Checkout[]> {
    try {
      const dueCheckouts = await this.checkoutRepository.retrieveDueCheckouts();
      return dueCheckouts;
    } catch (error: any) {
      console.error(`Error retrieving due checkouts: ${error.message}`);
      throw new Error('Failed to retrieve due checkouts');
    }
  }

  public async checkedOutBooksByUser(userId: string): Promise<any[]> {
    try {
      const checkouts = await this.checkoutRepository.retrieveCheckoutsByUser(userId);
      const checkedOutBooks = await Promise.all(checkouts.map(async (checkout: any) => {
        const bookSearchApiUrl = `${process.env.BOOKS_SERVICE_BASE_URL}/api/books/search?id=${checkout.book_id}`;
        const bookInfoResponse = await axios.get(bookSearchApiUrl);
        if (bookInfoResponse.status !== 200) {
          console.error(`Failed to retrieve book information for book ID ${checkout.book_id}. Status Code: ${bookInfoResponse.status}`);
          return null;
        }
        const bookInfo = bookInfoResponse.data[0]; // Assuming the API returns an array of books, take the first one
        return {
          ...checkout,
          book: bookInfo,
        };
      }));
      return checkedOutBooks.filter((book) => book !== null);
    } catch (error: any) {
      console.error(`Error retrieving checkouts by user: ${error.message}`);
      throw new Error('Failed to retrieve checkouts by user');
    }
  }
}