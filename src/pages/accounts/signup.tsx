import React, { useState } from "react";
import styles from "./styles/signup.module.css";
import { useRouter } from "next/router";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import * as Icon from "@/components/icons";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const handleSignIn = () => {
    router.push('/accounts/signin');
  };

  const handleForgotPassword = () => {
    router.push('/accounts/reset-password');
  };
  
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup}>
        <div className={styles.logo_container}>
          <p className={styles.logo}>BLEND</p>
        </div>
        <div className={styles.heading_container}>
          <h1 className={styles.heading}>
            Create your free account
          </h1>
          <p className={styles.subheading}>
            You are two steps away to unleash your creativity in music.
          </p>
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
            />
            <div className={styles.eye_icon} onClick={togglePasswordVisibility}>
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.signup2}>
        <button className={styles.continue_button}>Continue</button>
        <div className={styles.signin_container}>
          <p className={styles.signin_text}>Already have an account?</p>
          <a onClick={handleSignIn} className={styles.signin_link}>
            Login
          </a>
        </div>
        <div className={styles.divider}>
          <span className={styles.span}>OR</span>
        </div>
        <button className={styles.google_button}>
          <FcGoogle className={styles.google_logo} />
          <p className={styles.google_login_text}>Continue with Google</p>
        </button>
      </div>
      <div className={styles.terms_and_policy}>
        <p className={styles.terms_and_policy_text}>
          By continuing, you agree to Blend's{' '}<a href="#">Terms of Service{' '}</a>
          and{' '}<a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
