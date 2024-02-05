// src/models/Session.ts
class Session {
    constructor(
        public sessionId: number,
        public userId: number,
        public sessionToken: string,
        public expirationTime: Date
    ) { }
}

export default Session;
