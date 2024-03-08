// src/models/Checkout.ts

export class Checkout {
  public id: number = 0;
  public user_id: string;
  public book_id: string;
  public checkout_date: Date;
  public due_date: Date;
  public returned: boolean;
  public created_at: Date;
  public updated_at: Date;

  constructor(
    user_id: string,
    book_id: string,
    checkout_date: Date,
    due_date: Date,
    returned: boolean,
    created_at: Date,
    updated_at: Date
  ) {
    this.user_id = user_id;
    this.book_id = book_id;
    this.checkout_date = checkout_date;
    this.due_date = due_date;
    this.returned = returned;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
