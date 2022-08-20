import axios from 'axios';
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './scss/templateModal.scss'

export const TemplateModal = (props: {modalIsOpen: boolean, setModalIsOpen: any, zoom: number, setOops: any, 
setBackgroundColor: any, setExceptionModal: any}) => {
    const [templateCount, setTemplateCount] = useState(0);
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    useEffect(() => {
        axios.get('/template/count').then(res => {
            setTemplateCount(res.data);
        });
    }, []);

    const onClickConfirm = e => {
        e.preventDefault();
        axios.get(`/template/${selectedTemplate}`).then(res => {
            const name = new URLSearchParams(location.search).get('name');
            props.setOops(res.data.oops.map((v, i) => i === 0 ? {...v, text: name || ''} : v));
            props.setBackgroundColor('#f4f4f4')
            props.setModalIsOpen(false);
        }).catch(err => {
            props.setExceptionModal({
                isOpen: true,
                message: err.response.data.message,
            })
        });
    }

    return <Modal isOpen={props.modalIsOpen} className="templateModal"
    overlayClassName="templateModalOverlay" appElement={document.querySelector('.box') as any} style={{
        content: {
            zoom: props.zoom
        }
    }} onRequestClose={() => props.setModalIsOpen(false)}>
        <div className="title">
            Templates
        </div>
        <div className="blank" style={{
            height: 40
        }}/>
        <div className="content">
            <div className="templateGrid">
                {
                    new Array(templateCount).fill(0).map((v, i) => {
                        return <div className="templateImageBox" onClick={e => setSelectedTemplate(i + 1)}  key={i + 1}>
                            <img className='templateImage' src={`/image/template/${i + 1}.png`} style={{
                            border: `2px solid ${selectedTemplate === i + 1 ? "#7c2bff" : "#FFFFFF"}`
                        }}/>
                        </div>
                    })
                }
            </div>
            <div className="buttonBox">
                <div className="confirmButton" onClick={e => onClickConfirm(e)}>
                    OK
                </div>
            </div>
        </div>
        <img className="modalExitImage" src="/image/modalExitImage.png" onClick={() => {
            props.setModalIsOpen(false);
        }}/>
    </Modal>
}