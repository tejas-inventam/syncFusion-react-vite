import { DialogComponent } from '@syncfusion/ej2-react-popups'

interface ConfirmDeleteDialogProps {
  open: boolean
  onDelete: () => void
  setOpen: (open: boolean) => void
}

const DeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, setOpen, onDelete }) => {
  const handleClose = () => setOpen(false)

  const dialogButtons = [
    {
      buttonModel: { content: 'Yes', isPrimary: true },
      click: onDelete
    },
    {
      buttonModel: { content: 'No' },
      click: handleClose
    }
  ]

  return (
    <DialogComponent
      width='300px'
      header='Confirm Delete'
      visible={open}
      showCloseIcon={true}
      isModal={true}
      close={handleClose}
      buttons={dialogButtons}
      content={`Are you sure you want to delete ?`}
      target='#root'
      animationSettings={{ effect: 'Fade' }}
    />
  )
}

export default DeleteDialog
