import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const response = await fetch(`${API_URL}/users/me`, {
                credentials: "include",
            });
            
            if (response.ok){
                setUser(await response.json());
            }

        } catch (err) {
            console.error(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error(err);
        }
        setUser(null);
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const value = {
        user,
        loading,
        isLogged: !!user,
        isAdmin: user?.role === "ADMIN",
        refreshUser,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}