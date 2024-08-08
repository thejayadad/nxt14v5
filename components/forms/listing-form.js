'use client'
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Textarea, Progress } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import HeadingText from '../heading-text';
import Logo from '../logo';
import { categories } from '../header/categories';
import CategoryItem from './category-item';
import LocationSelection from './location-selection';
import NumCounter from './num-counter';
import ImageUrlForm from './imageurl-form';
import FeaturesBoard from './features-board';
import { createListing } from '@/lib/actions/listing/create-listing';

// Define validation schemas using yup
const step0Schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

const step1Schema = yup.object().shape({
  category: yup.string().required('Category is required'),
});

const steps = [
  { title: 'Title & Description', subtitle: 'Enter the name you want others to know you by.' },
  { title: 'Category', subtitle: 'Select the appropriate title for your listing.' },
  { title: 'Location', subtitle: 'Let us know where your ride is located.' },
  { title: 'Info', subtitle: 'Provide additional details about your ride.' },
  { title: 'Images', subtitle: 'Upload images of your ride.' },
  { title: 'Features & Price', subtitle: 'Add features and set a price for your ride.' },
];

const ListingForm = ({ user }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(0); // Start from 0 to use as index
  const maxSteps = steps.length;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState({ city: "Washington", state: "D.C." }); // Default to Washington, D.C.
  const [seatCount, setSeatCount] = useState(1); // Default number of seats
  const [doorCount, setDoorCount] = useState(1); // Default number of doors
  const [mpg, setMpg] = useState(1); // Default mpg
  const [images, setImages] = useState([]); // Default images array
  const [features, setFeatures] = useState([]); // Default features array
  const [price, setPrice] = useState(0); // Default price

  // Initialize react-hook-form with yup validation for each step
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(step === 0 ? step0Schema : step1Schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    if (step < maxSteps - 1) {
      toast.success(`Step ${step + 1} completed successfully!`);
      setStep((prevStep) => prevStep + 1);
    } else {
      toast.loading('Posting...');
      try {
        await createListing({
          ...data,
          imageSrc: images[0] || '', // Assuming the first image as the main image
          category: selectedCategory,
          seatCount,
          doorCount,
          mpg,
          price,
          features: features.join(', '), // Convert features array to comma-separated string
          location: `${location.city}, ${location.state}`,
        });
        toast.dismiss();
        toast.success('Listing posted successfully!');
        console.log("Form data:", { ...data, seatCount, doorCount, mpg, location, images, features, price });
        reset();
        setStep(0);
        setSelectedCategory('');
        setLocation({ city: "Washington", state: "D.C." });
        setSeatCount(1);
        setDoorCount(1);
        setMpg(1);
        setImages([]);
        setFeatures([]);
        setPrice(0);
        onOpenChange(false);
      } catch (error) {
        toast.dismiss();
        toast.error('Failed to post listing.');
        console.error('Failed to post listing:', error);
      }
    }
  };

  const handleCategorySelect = (label) => {
    setSelectedCategory(label);
    setValue('category', label, { shouldValidate: true });
  };

  return (
    <div>
      <div onClick={onOpen} className="cursor-pointer block text-gray-800">
        Host A Ride
      </div>
      {user ? (
        <>
          <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 items-center">
                    <Logo />
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col space-y-6">
                      <Progress
                        value={((step + 1) / maxSteps) * 100}
                        label={`Step ${step + 1} of ${maxSteps}`}
                        color="success"
                        className="mb-4"
                      />
                      <HeadingText title={steps[step].title} subtitle={steps[step].subtitle} />
                      <div className="relative py-2 flex-auto">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                          {step === 0 && (
                            <>
                              <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    placeholder="Title..."
                                    className={`w-full ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                  />
                                )}
                              />
                              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                              <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                  <Textarea
                                    {...field}
                                    placeholder="Description..."
                                    className={`w-full ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                  />
                                )}
                              />
                              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </>
                          )}
                          {step === 1 && (
                            <>
                              <div className='flex flex-col gap-8'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                                  {categories.map((item) => (
                                    <div key={item.label} className='col-span-1'>
                                      <CategoryItem
                                        onClick={() => handleCategorySelect(item.label)}
                                        selected={selectedCategory === item.label}
                                        label={item.label}
                                        icon={item.icon}
                                      />
                                    </div>
                                  ))}
                                </div>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                              </div>
                            </>
                          )}
                          {step === 2 && (
                            <>
                              <div className='flex flex-col gap-8'>
                                <Controller
                                  name="location"
                                  control={control}
                                  render={({ field }) => (
                                    <LocationSelection
                                      {...field}
                                      error={errors.location}
                                      value={location}
                                      onChange={setLocation}
                                    />
                                  )}
                                />
                              </div>
                            </>
                          )}
                          {step === 3 && (
                            <>
                              <NumCounter
                                title="Number of Seats"
                                subtitle="How many seats are available?"
                                value={seatCount}
                                onChange={setSeatCount}
                              />
                              <NumCounter
                                title="Number of Doors"
                                subtitle="How many doors does the car have?"
                                value={doorCount}
                                onChange={setDoorCount}
                              />
                              <NumCounter
                                title="Miles per Gallon (MPG)"
                                subtitle="What is the MPG of the car?"
                                value={mpg}
                                onChange={setMpg}
                              />
                            </>
                          )}
                          {step === 4 && (
                            <>
                              <div className='flex flex-col gap-8'>
                                <ImageUrlForm
                                  images={images}
                                  setImages={setImages}
                                />
                              </div>
                            </>
                          )}
                          {step === 5 && (
                            <>
                              <div className='flex flex-col gap-8'>
                                <div>
                                  <FeaturesBoard
                                    value={features}
                                    onChange={setFeatures}
                                  />
                                </div>
                                <div>
                                  <NumCounter
                                    title={'Price per day'}
                                    subtitle={'How much are you charging per day?'}
                                    value={price}
                                    onChange={setPrice}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                          <div className="flex gap-2 pt-4">
                            {step > 0 && (
                              <Button className="w-full" color="warning" variant="ghost" onPress={() => setStep((prevStep) => prevStep - 1)}>
                                Back
                              </Button>
                            )}
                            <Button
                              type="submit"
                              className="w-full"
                              color="primary"
                            >
                              {step === maxSteps - 1 ? 'Submit' : 'Next'}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Modal isOpen={!user} onOpenChange={onOpenChange}>
          <ModalContent>
            <div className="p-4 text-center">
              <p>You must be logged in to host a ride.</p>
              <Button onPress={onOpenChange} color="primary">
                Close
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
      <Toaster />
    </div>
  );
};

export default ListingForm;
