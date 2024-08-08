'use client'
import React, { useState, useEffect, useCallback } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Logo from '../logo';
import ModalButton from './modal-button';
import { FiMenu } from 'react-icons/fi';


const ModalBox = ({onSubmit, title, body, footer, actionLabel,  secondAction, secondaryLabel}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
    <>
       <div 
       onClick={onOpen}
      >{actionLabel}</div>
       <Modal
       size='2xl'
       isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className='flex flex-col'>
                    <div className='flex justify-center'>
                    <Logo /> 
                    </div>
                    <div className='text-lg font-semibold'>
                    {title} 
                </div> 
                </div> 
              </ModalHeader>
              <ModalBody>
                    <div className='relative p-6 flex-auto'>
                    {body}
                    </div>
              </ModalBody>
              <ModalFooter>
                {/* <div className='flex flex-col gap-2 p-6'> */}
                    <div className='flex flex-row items-center gap-4 w-full'>
                        {
                            secondAction && secondaryLabel (
                                <ModalButton
                                outline
                                label={secondaryLabel}
                                />
                            )
                        }
                        
                        <ModalButton                     
                        label={actionLabel}
                        />
                    </div>
                {/* </div> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalBox