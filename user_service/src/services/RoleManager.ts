// src/services/RoleManager.ts
class RoleManager {
    validateUserRole(userRole: string, allowedRoles: string[]): boolean {
        return allowedRoles.includes(userRole);
    }
}

export default new RoleManager();
