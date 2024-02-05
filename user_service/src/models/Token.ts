// src/models/Token.ts
class Token {
  constructor(
    public token_id: number,
    public user_id: number,
    public token_value: string,
    public expiration_time: Date
  ) {
    this.token_id = token_id;
    this.user_id = user_id;
    this.token_value = token_value;
    this.expiration_time = expiration_time;
  }

}

export default Token;
