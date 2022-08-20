import { useEffect } from 'react';
import Modal from 'react-modal'
import { IOop } from '../interface/oop.i';
import './scss/createModal.scss';

export const CreateModal = (props: {modalIsOpen: boolean, setModalIsOpen: any, setOops: any, oop: IOop}) => {
    let box: HTMLElement;
    useEffect(() => {
    }, [])
    useEffect(() => {
        if(props.modalIsOpen){
            box = document.querySelector('.box') as HTMLElement;
            box.addEventListener('click', addOop);
            box.style.filter = 'brightness(50%)'
        }
    }, [props.modalIsOpen])

    const addOop = (e :MouseEvent) => {
        props.setOops(
            e.offsetX - props.oop.size / 2,
            e.offsetY - props.oop.size / 2);
        box.style.filter = '';
        box.removeEventListener('click', addOop);
        props.setModalIsOpen(false);
    }

    return <>
        <Modal isOpen={props.modalIsOpen} onRequestClose={() => {}} className='createModal'
        overlayClassName='createModalOverlay' appElement={document.querySelector('.box') as any} style={{
            content: {
                zoom: window.innerHeight / 844
            }
        }}>
            <div>
                터치하는 곳에 웁이 생성됩니다!            
            </div>

        </Modal>
    </>
}