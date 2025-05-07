import React, { useState } from 'react'
import { DialogComponent } from '@syncfusion/ej2-react-popups'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { TextBoxComponent, type ChangedEventArgs } from '@syncfusion/ej2-react-inputs'
import { useAppDispatch } from '../redux/hooks'
import { addProduct, updateProduct, productActions } from '../redux/slices/productSlice'

interface AddProductDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: any
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, setOpen, data }) => {
  const dispatch = useAppDispatch()

  const [product, setProduct] = useState({
    title: data.title || '',
    price: data.price || 0,
    description: data.description || '',
    category: data.category || '',
    brand: data.brand || ''
  })

  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    if (data.isEdit) {
      dispatch(updateProduct({ id: data.id, payload: product }))
        .unwrap()
        .then(() => handleClose())
        .catch(err => console.log(err))
    } else {
      dispatch(addProduct(product))
        .unwrap()
        .then(res => {
          dispatch(productActions.setProduct(res.data))
          handleClose()
        })
        .catch(err => console.log(err))
    }
  }

  const handleChange = (e: ChangedEventArgs) => {
    const { name, value } = e.event?.target as HTMLInputElement

    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }))
  }

  const footerTemplate = () => (
    <div style={{ textAlign: 'right' }}>
      <ButtonComponent cssClass='e-flat' onClick={handleClose}>
        Cancel
      </ButtonComponent>
      <ButtonComponent isPrimary onClick={handleSubmit}>
        Save
      </ButtonComponent>
    </div>
  )

  return (
    <DialogComponent
      width='400px'
      header='Add New Product'
      visible={open}
      showCloseIcon={true}
      close={handleClose}
      isModal={true}
      animationSettings={{ effect: 'Zoom' }}
      footerTemplate={footerTemplate}
    >
      <div style={{ padding: '1rem' }}>
        {[
          { label: 'Product Name', name: 'title', type: 'text' },
          { label: 'Price', name: 'price', type: 'number' },
          { label: 'Description', name: 'description', type: 'text' },
          { label: 'Category', name: 'category', type: 'text' },
          { label: 'Brand', name: 'brand', type: 'text' }
        ].map(field => (
          <div key={field.name} className='mb-4'>
            <label>{field.label}</label>
            <TextBoxComponent
              name={field.name}
              type={field.type}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              value={product[field.name as keyof typeof product].toString()}
              change={handleChange}
            />
          </div>
        ))}
      </div>
    </DialogComponent>
  )
}

export default AddProductDialog
