import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from 'src/reducers/auth/action';
import { useAlert } from 'react-alert';

interface LogoutProps {
    logout?: Function;
}

const Logout: FC<LogoutProps> = ({ logout }) => {
    const navigate = useNavigate();
    const alert = useAlert();
    useEffect(() => {
        alert.success('Logout successfully!');
        logout();
        navigate('/login');
    }, [])
    return (
        <div>
        </div>
    );
}
function reduxState(state) {
    return {
        ...state.auth
    }
}

export default connect(reduxState, { logout })(Logout);
