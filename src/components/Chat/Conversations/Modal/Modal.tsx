import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConversationModal;
