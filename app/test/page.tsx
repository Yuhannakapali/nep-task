'use client';
import React, { useState } from "react"
import { Modal, Button } from 'flowbite-react';

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  return (

    <>
      <Button onClick={onClick}>
        Toggle modal
      </Button>
      <Modal
        show={isOpen}
        // isOpen={isOpen}
        onClose={onClose}
      >
        <Modal.Header>
          Terms of Service
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <p>
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                companies around the world are updating their terms of service agreements to comply.
              </p>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <p>
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
                ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as
                possible of high-risk data breaches that could personally affect them.
              </p>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClick}>
            I accept
          </Button>
          <Button
            color="gray"
            onClick={onClick}
          >
            <p>
              Decline
            </p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}