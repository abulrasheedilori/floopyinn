import { createButton } from 'react-social-login-buttons';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

// Define custom styles
const buttonStyle = {
    background: "whitesmoke", // Gray background
    color: '#000',
    fontWeight: 'bold' as const,
    borderRadius: '25px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    cursor: 'pointer',
    boxShadow: '0 1px 1px rgba(0,0,0,0)',
};

// Icon wrapper style to add space between icon and text
const iconWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px', // Adjust the spacing as needed
};

// Facebook Login Button
export const CustomFacebookLoginButton = createButton({
    text: 'Continue with Facebook',
    icon: (props: { size: string | number; color: string }) => (
        <span style={iconWrapperStyle}>
            <FaFacebook size={props.size} color="#1877F2" /> {/* Facebook brand color */}
        </span>
    ),
    style: buttonStyle,
    activeStyle: { background: '#606060', color: 'white' },
});

// Google Login Button
export const CustomGoogleLoginButton = createButton({
    text: 'Continue with Google',
    icon: (props: { size: string | number; color: string }) => (
        <span style={iconWrapperStyle}>
            <FaGoogle size={props.size} color="#DB4437" /> {/* Google brand color */}
        </span>),
    style: buttonStyle,
    activeStyle: { background: '#606060', color: "white" },
});
