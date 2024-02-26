// src/models/Checkout.ts

export class Checkout {
    public checkoutId: number = 0;
    public userId: string;
    public bookId: string;
    public checkoutDate: Date;
    public dueDate: Date;
    public returned: boolean;
    public createdAt: Date;
    public updatedAt: Date;
  
    constructor(
      userId: string,
      bookId: string,
      checkoutDate: Date,
      dueDate: Date,
      returned: boolean,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.userId = userId;
      this.bookId = bookId;
      this.checkoutDate = checkoutDate;
      this.dueDate = dueDate;
      this.returned = returned;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  