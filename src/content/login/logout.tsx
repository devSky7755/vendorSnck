import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
    }, [])
    return (
        <div>
        </div>
    );
}

export default Logout;
