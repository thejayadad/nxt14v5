'use client'
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import HeadingText from '../heading-text';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { registerUser } from '@/lib/actions/user/register-user';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const RegisterUserForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(1);
  // const [celebration, setCelebration] = useState(false);
  const { width, height } = useWindowSize();

  // Define validation schema for each step
  const step1Schema = yup.object().shape({
    name: yup.string().required('Name is required'),
  });

  const step2Schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(step === 1 ? step1Schema : step2Schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    if (step === 1) {
      // Move to the next step
      setStep(2);
    } else {
      try {
        const user = await registerUser(data);
        if (user instanceof Error) {
          toast.error(user.message);
        } else {
          toast.success('Registration successful!');
          // setCelebration(true); // Start the celebration animation
          setTimeout(() => {
            onOpenChange(false); // Close the modal
            reset(); // Reset the form fields
            // setCelebration(false); // Stop the celebration animation
          }, 3000);
        }
      } catch (error) {
        toast.error('Registration failed, please try again.');
        console.error(error);
      }
    }
  };

  const social = (provider) => {
    signIn(provider);
  };

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-100">
        SignUp
      </div>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
              <ModalBody>
                {/* {celebration && <Confetti width={width} height={height} />} */}
                <div className="flex flex-col">
                  <HeadingText title={'SignUp'} subtitle={'Enter the name you want others to know you by.'} />
                  <div className="relative py-2 flex-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {step === 1 && (
                        <div>
                          <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                autoComplete="off"
                                placeholder="Enter your name"
                                className={`w-full ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                              />
                            )}
                          />
                          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                      )}

                      {step === 2 && (
                        <>
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
                        </>
                      )}
                    </form>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="w-full" color="warning" variant="ghost" onPress={onClose}>
                    Close
                  </Button>
                  <Button className="w-full" color="primary" onPress={handleSubmit(onSubmit)}>
                    {step === 1 ? 'Next' : 'Submit'}
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-col gap-4 justify-center items-center w-full">
                  <Button onClick={() => social('google')} variant="ghost" className="w-full">
                    <FaGoogle />
                    Login With Google
                  </Button>
                  <p className="font-light text-small text-neutral-500">Already Have an Account? Login</p>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterUserForm;
