import Modal from 'react-modal';
import './scss/loadModal.scss';

export const LoadModal = (props: {isOpen: boolean, zoom: number}) => {
    return <Modal isOpen={props.isOpen} className="loadModal" overlayClassName="loadModalOverlay"
    appElement={document.querySelector(".box") as any} style={{
        content: {
            zoom: props.zoom,
        }
    }}>
        <div className="logoBox">
            <img src="/image/logoImage.png"/>
        </div>
        <div className="textBox">
            Loading...
        </div>
    </Modal>
}