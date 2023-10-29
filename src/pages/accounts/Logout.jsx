import { useEffect } from 'react';
import { logout } from '@/utils/auth';
import { useNavigate, Link } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
    useEffect(() => {
      logout()
      navigate('/');
    }, []);
    return null;
};

export default Logout;
