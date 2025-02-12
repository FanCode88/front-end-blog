import { SignUp } from '@clerk/clerk-react';
import './registerPage.scss';

const RegisterPage = () => {
    return (
        <div className="registerPage">
            <SignUp signInUrl="/login" />
        </div>
    );
};

export default RegisterPage;
