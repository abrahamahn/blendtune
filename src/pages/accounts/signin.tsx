import React, { useState } from 'react';
import styles from './styles/signin.module.css';
import { useRouter } from 'next/router';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const handleSignUp = () => {
    router.push('/accounts/signup');
  };

  const handleForgotPassword = () => {
    router.push('/accounts/reset-password');
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login}>
        <div className={styles.logo_container}>
          <p className={styles.logo}>BLEND</p>
        </div>
        <div className={styles.heading_container}>
          <h1 className={styles.heading}>Log into your account</h1>
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.email_container}>
            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
            />
          </div>
          <div className={styles.password_container}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={styles.input}
            />
            <div className={styles.eye_icon} onClick={togglePasswordVisibility}>
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.login2}>
        <a className={styles.forgot_password} onClick={handleForgotPassword}>Forgot password?</a>
        <button className={styles.continue_button}>Continue</button>
        <div className={styles.signup_container}>
          <p className={styles.signup_text}>Don't have an account?</p>
          <a className={styles.signup_link} onClick={handleSignUp}>
            Sign up
          </a>
        </div>
        <div className={styles.divider}>
          <span className={styles.span}>OR</span>
        </div>
        <button className={styles.google_button}>
          <FcGoogle className={styles.google_logo} />
          <p className={styles.google_login_text}>
            Continue with Google
          </p>
        </button>
      </div>
      <div className={styles.terms_and_policy}>
        <p className={styles.terms_and_policy_text}>
          By continuing, you agree to Blend's{&apos; &apos;}<a className={styles.link}>Terms of Service</a>{&apos; &apos;}and{&apos; &apos;}<a className={styles.link}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
