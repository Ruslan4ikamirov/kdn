type ModalProps = {
    open: boolean,
    onClose: () => void,
    message: string
}

const Modal = ({open, onClose, message}: ModalProps) => {
  return (
  <dialog id="my_modal_3" className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">
            <form method="dialog">
                <button 
                    className="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}
                >
                    ✕
                </button>
            </form>
            <p className="py-4 text-xl text-center">{message}</p>
        </div>
    </dialog>
  );
}

export default Modal;