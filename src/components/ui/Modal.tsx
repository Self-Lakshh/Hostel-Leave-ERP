'use client';

import { Dialog, DialogContent, DialogHeader, DialogFooter, type DialogContentProps } from './Dialog';

// Re-export Dialog components as Modal components for backward compatibility
export const Modal = {
  Root: Dialog,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
};

// Example usage:
// const MyDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <Modal.Root>
//       <Modal.Content 
//         isOpen={isOpen} 
//         onClose={() => setIsOpen(false)}
//         title="My Dialog"
//         description="This is a description"
//       >
//         <div>Content goes here</div>
//         <Modal.Footer>
//           <button onClick={() => setIsOpen(false)}>Close</button>
//         </Modal.Footer>
//       </Modal.Content>
//     </Modal.Root>
//   );
// };

// Export props type for consumers
export type ModalProps = DialogContentProps;
