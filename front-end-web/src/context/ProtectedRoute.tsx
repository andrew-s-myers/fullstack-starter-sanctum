import { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthContext';

interface Props {
    children: ReactElement;
}

export default function ProtectedRoute({ children }: Props) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" replace />;
}
