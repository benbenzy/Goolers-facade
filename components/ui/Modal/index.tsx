const Modal = ({ children, show, onclose }: any) => {
  return (
    <dialog id="my_modal_3" className={`modal ${show ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={onclose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">update</h3>
        {children}
      </div>
    </dialog>
  );
};
export default Modal;
