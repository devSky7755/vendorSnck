import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from 'src/reducers/auth/action';
import { useAlert } from 'react-alert';
import { setVendorStand, setVenues } from 'src/reducers/venues/action';

interface LogoutProps {
    logout?: Function;
    setVendorStand?: Function;
    setVenues?: Function;
}

const Logout: FC<LogoutProps> = ({ logout, setVendorStand, setVenues }) => {
    const navigate = useNavigate();
    const alert = useAlert();
    useEffect(() => {
        alert.success('Logout successfully!');
        logout();
        setVendorStand(null);
        setVenues(null);
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

export default connect(reduxState, { logout, setVendorStand, setVenues })(Logout);
