import { SignIn } from '@clerk/clerk-react';
import './loginPage.scss';

const LoginPage = () => {
    return (
        <div className="loginPage">
            <SignIn signUpUrl="/register" />
        </div>
    );
};

export default LoginPage;
