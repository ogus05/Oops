import Modal from 'react-modal';
import './scss/exceptionModal.scss';

export const ExceptionModal = (props: {modal: {isOpen: boolean, message: string}, setModal: any, zoom: number}) => {
    return <Modal isOpen={props.modal.isOpen} className="exceptionModal"
    overlayClassName="exceptionModalOverlay" appElement={document.querySelector('.box') as any} style={{
        content: {
            zoom: props.zoom
        }
    }}>
        <div className="content">
            <div className="title">
                오류
            </div>
            <div className="message">
                {props.modal.message}
            </div>
            <div className="buttonBox">
                <div className="confirmButton" onClick={e => location.href = '/'}>
                    확인
                </div>
            </div>
        </div>
    </Modal>
}