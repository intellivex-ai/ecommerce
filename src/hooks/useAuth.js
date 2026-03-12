import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { authService } from '../services/authService';

export const useAuth = () => {
    const { user, profile, loading, session, initialize, clearUser } = useUserStore();

    useEffect(() => {
        // Only initialize if not already done.
        if (!session && !user && loading) {
            initialize();
        }
    }, [initialize, session, user, loading]);

    const login = async (email, password) => {
        return await authService.login(email, password);
    };

    const signUp = async (email, password, fullName) => {
        return await authService.signUp(email, password, fullName);
    };

    const loginWithGoogle = async () => {
        return await authService.loginWithGoogle();
    };

    const logout = async () => {
        await authService.logout();
        clearUser();
    };

    return {
        user,
        profile,
        loading,
        isAuthenticated: !!user,
        login,
        signUp,
        loginWithGoogle,
        logout,
    };
};
