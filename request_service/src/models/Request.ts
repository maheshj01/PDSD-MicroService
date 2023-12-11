// src/models/Request.ts
class Request {
    id?: number;
    user_id!: number;
    book_title!: string;
    book_author!: string;
    justification!: string;
    status!: string;
    created_at?: Date;
    updated_at?: Date;
}

export default Request;