/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import Loader from './components/Loader'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { deleteProduct, getAllProducts } from './redux/slices/productSlice'
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  type PageSettingsModel
} from '@syncfusion/ej2-react-grids'
import useModal from './hooks/use-modal'
import AddProductDialog from './components/AddProductDialog'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'

const App = () => {
  const { products, loading } = useAppSelector(({ product }) => product)
  const dispatch = useAppDispatch()

  const productDialog = useModal()

  useEffect(() => {
    dispatch(getAllProducts({ limit: 0 }))
  }, [dispatch])

  const handleDelete = (props: any) => {
    dispatch(deleteProduct(props.id))
  }

  const actionTemplate = (props: any) => {
    return (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <ButtonComponent cssClass='e-small e-info' onClick={() => productDialog.onOpen({ ...props, isEdit: true })}>
          Edit
        </ButtonComponent>
        <ButtonComponent cssClass='e-small e-danger' onClick={() => handleDelete(props)}>
          Delete
        </ButtonComponent>
      </div>
    )
  }

  const pageSettings: PageSettingsModel = { pageSize: 10 }

  return (
    <div style={{ padding: '40px', marginTop: '50px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2>Product List</h2>
        <ButtonComponent isPrimary onClick={() => productDialog.onOpen({})}>
          Add Product
        </ButtonComponent>
      </div>
      {loading ? (
        <Loader show={true} message='Fetching products...' />
      ) : (
        <GridComponent dataSource={products} allowPaging={true} pageSettings={pageSettings}>
          <ColumnsDirective>
            <ColumnDirective field='id' width='70' textAlign='Right' />
            <ColumnDirective field='title' width='150' />
            <ColumnDirective field='category' width='100' />
            <ColumnDirective field='brand' width='100' />
            <ColumnDirective field='price' width='100' textAlign='Right' />
            <ColumnDirective headerText='Actions' width='120' template={actionTemplate} textAlign='Center' />
          </ColumnsDirective>
          <Inject services={[Page]} />
        </GridComponent>
      )}
      {productDialog.isOpen && (
        <AddProductDialog
          open={productDialog.isOpen}
          setOpen={productDialog.onClose}
          data={productDialog.selectedRow}
        />
      )}
    </div>
  )
}

export default App
