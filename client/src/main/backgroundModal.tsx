import Modal from 'react-modal';
import './scss/backgroundModal.scss';

export const BackgroundModal = (props: {modalIsOpen: boolean, setModalIsOpen: any, backgroundColor: string,
    setBackgroundColor: any}) => {
        return <Modal isOpen={props.modalIsOpen} onRequestClose={() => {props.setModalIsOpen(false)}} className="backgroundModal"
        overlayClassName="backgroundModalOverlay">
            <div className="title">
                BACKGROUND COLOR
            </div>
            <div className="content">
                <div className="settingBackgroundBox">
                    <div className='settingBackground' style={{backgroundColor: props.backgroundColor}}>
                        <input type="color" value={props.backgroundColor} onChange={e => {props.setBackgroundColor(e.target.value)}}/>
                    </div>
                </div>
            </div>
                <div className="buttonBox">
                    <div className="confirmButton" onClick={e => props.setModalIsOpen(false)}>
                        OK
                    </div>
                </div>
        </Modal>
    }