// models/checkout.ts

export interface Checkout {
    id: number;
    user_id: number;
    book_id: number;
    checkout_date: Date;
    due_date: Date;
    returned: boolean;
    created_at: Date;
    updated_at: Date;
  }