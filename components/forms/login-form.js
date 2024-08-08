'use client'
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import HeadingText from '../heading-text';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { authenicate } from '@/lib/actions/user/login-user';

const LoginForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAuthenticating, setIsAuthenticating] = useState(false);


  // Define validation schema using yup
  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    
  });

  const onSubmit = async (data) => {
    setIsAuthenticating(true);
    try {
      await authenicate(data);
      toast.success('Login successful!');    
    //   window.location.reload()
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const social = (provider) => {
    signIn(provider);
  };

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-100">
        Login
      </div>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <HeadingText title="User LogIn" subtitle="Login with your credentials below." />
                  <div className="relative py-2 flex-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              autoComplete="off"
                              placeholder="Enter your email"
                              className={`w-full ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                          )}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                      </div>
                      <div>
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="password"
                              autoComplete="off"
                              placeholder="Enter your password"
                              className={`w-full ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                            />
                          )}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button className="w-full" color="warning" variant="ghost" onPress={onClose}>
                          Back
                        </Button>
                        <Button className="w-full" color="primary" type="submit"             disabled={isAuthenticating}
                        >
                        {isAuthenticating ? 'One moment...' : 'Login'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-col gap-4 justify-center items-center w-full">
                  <Button onClick={() => social('google')} variant="ghost" className="w-full">
                    <FaGoogle />
                    Login With Google
                  </Button>
                  <p className="font-light text-small text-neutral-500">Need an account? Register</p>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        <Toaster />
      </Modal>
    </>
  );
};

export default LoginForm;
