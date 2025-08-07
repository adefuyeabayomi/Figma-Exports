import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthLayout } from './auth/AuthLayout';
import { SignUpForm } from './auth/SignUpForm';
import { LoginForm } from './auth/LoginForm';
import { ForgotPasswordForm } from './auth/ForgotPasswordForm';
import { PasswordResetForm } from './auth/PasswordResetForm';
import { OnboardingLayout } from './onboarding/OnboardingLayout';
import { BusinessProfileStep } from './onboarding/steps/BusinessProfileStep';

type AuthStep = 'login' | 'signup' | 'forgot-password' | 'password-reset' | 'onboarding' | 'success';

interface AuthAppProps {
  onComplete: () => void;
}

export function AuthApp({ onComplete }: AuthAppProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({});

  const renderAuthContent = () => {
    switch (currentStep) {
      case 'login':
        return (
          <AuthLayout
            title="Welcome back"
            subtitle="Please sign in to your account"
          >
            <LoginForm
              onSuccess={() => setCurrentStep('onboarding')}
              onSwitchToSignUp={() => setCurrentStep('signup')}
              onForgotPassword={() => setCurrentStep('forgot-password')}
            />
          </AuthLayout>
        );

      case 'signup':
        return (
          <AuthLayout
            title="Create New Account"
            subtitle="Please input valid credentials to create your account."
          >
            <SignUpForm
              onSuccess={() => setCurrentStep('onboarding')}
              onSwitchToLogin={() => setCurrentStep('login')}
            />
          </AuthLayout>
        );

      case 'forgot-password':
        return (
          <AuthLayout
            title="Forgot Password"
            subtitle="Please input the email you used to create the account. If the email exists on our database, a reset mail will be sent to your email."
            showBackButton
            onBack={() => setCurrentStep('login')}
          >
            <ForgotPasswordForm
              onBack={() => setCurrentStep('login')}
              onSuccess={() => setCurrentStep('password-reset')}
            />
          </AuthLayout>
        );

      case 'password-reset':
        return (
          <AuthLayout
            title="Password Reset"
            subtitle="Please enter a new password for your account. Make sure your password is at least 8 characters long and includes a mix of letters, numbers, and symbols."
          >
            <PasswordResetForm
              onSuccess={() => setCurrentStep('login')}
            />
          </AuthLayout>
        );

      case 'onboarding':
        return (
          <OnboardingLayout
            currentStep={onboardingStep}
            totalSteps={5}
            stepTitle="Tell Us About Your Business"
            stepDescription="Please provide your business information to help us customize your experience and ensure compliance with regulatory requirements."
          >
            <BusinessProfileStep
              onNext={() => {
                if (onboardingStep < 5) {
                  setOnboardingStep(onboardingStep + 1);
                } else {
                  onComplete();
                }
              }}
              data={onboardingData}
              onDataChange={setOnboardingData}
            />
          </OnboardingLayout>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderAuthContent()}
      </motion.div>
    </AnimatePresence>
  );
}