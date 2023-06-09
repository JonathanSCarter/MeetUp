import { useModal } from '../../context/Modal'
import { fetchGroupDelete } from '../../store/group'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function DeleteGroupModal(props) {
  const { groupId } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const goDelete = () => {
    dispatch(fetchGroupDelete(groupId))
    closeModal();
    history.push('/groups')
  }
  const { closeModal } = useModal()
  return (
    <div>
      <h1>Confirm Delete</h1>
      <div>Are you sure you want to remove this group?</div>
      <button onClick={goDelete}>Yes(Delete Group)</button>
      <button onClick={closeModal}>No (Keep Group)</button>
    </div>
  )
}

export default DeleteGroupModal
