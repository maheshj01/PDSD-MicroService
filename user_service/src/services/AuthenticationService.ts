// src/services/AuthenticationService.ts
import bcrypt from 'bcrypt';
import TokenManager from './TokenManager';
import Token from '../models/Token';
import UserRepository from './UserRepository';
import SessionManager from './SessionManager';
class AuthenticationService {
    async handleAuthentication(usernameOrEmail: string, password: string): Promise<Token | null> {
        const user = await UserRepository.retrieveUserByUsernameOrEmail(usernameOrEmail);

        if (user && await this.validatePassword(password, user.passwordHash)) {
            // Generate and return a token if authentication is successful
            const token = await TokenManager.generateToken(user.userId!, user.userRole);
            return token;
        }

        return null;
    }

    private async validatePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        const result = await bcrypt.compare(inputPassword, hashedPassword);
        console.log('Password validation result:', result);
        return result;
    }
}

export default new AuthenticationService();
