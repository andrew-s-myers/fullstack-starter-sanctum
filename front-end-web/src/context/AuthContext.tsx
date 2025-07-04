import { createContext, useContext, useState } from "react";



const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    async function register ({ name, email, password, password_confirmation }) {
        const response = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation,
            }),
        });
        if (!response.ok) throw await response.json();
        const userData = await response.json();

        // set front-end user state and store token in localStorage
        setUser(userData.user);
        localStorage.setItem("token", userData.token);

        return userData;
    }

    async function login ({ email, password }) {
        const response = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        
        if (!response.ok) throw await response.json();
        const userData = await response.json();
        // This sets the front-end state for the logged in user. 
        setUser(userData.user)
        localStorage.setItem('token', userData.token);
        return userData;
    }

    const logout = async () => {
        const token = localStorage.getItem("token");
        await fetch(`${API_BASE}/logout`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}