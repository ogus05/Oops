import axios from 'axios';
import {toPng} from 'html-to-image';

import { useState } from 'react';
import Modal from 'react-modal';
import { IOop } from '../interface/oop.i';
import './scss/passwordModal.scss';
export const PasswordModal = (props: {modal: {isOpen: boolean, mode: number}, setModal: any, setConfigMode: any,
oops: IOop[], setDownloadMode: any, backgroundColor: string, setToken: any, token: string, zoom: number
setImage: any, setLoadModalIsOpen: any}) => {
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');

    const onClickConfirm = e => {
        //수정모드 진입 시
        if(props.modal.mode === 0){
            const token = new URLSearchParams(location.search).get('token');
            if(!token){
                setAlert('오류입니다. 잠시 후 다시 시도해 주세요.');
            }
            axios.post(`/auth`, {
                token,
                password
            }).then(res => {
                props.setConfigMode(true);
                props.setModal({
                    ...props.modal,
                    isOpen: false,
                });
                setAlert('');
            }).catch(err => {
                if(err.response.status === 400){
                    setAlert("비밀번호가 일치하지 않습니다.");
                }
            }).finally(() => {
                setPassword('');
            })
        }
        //다운로드 화면 진입 시
        else if(props.modal.mode === 1){
            const captureBox = () => {
                props.setLoadModalIsOpen(true);
                (document.querySelector(".buttonList") as HTMLElement).hidden = true;
                toPng(document.querySelector('.box') as HTMLElement, {
                    width: 390 * props.zoom,
                    height: 844 * props.zoom,
                    skipAutoScale: true,
                    style: {
                        margin: 'auto',
                    }
                }).then(dataUrl => {
                    props.setImage(dataUrl);
                    props.setLoadModalIsOpen(false);
                    props.setDownloadMode(true);
                })
            }

            
            if(password === ''){
                setAlert('비밀번호를 입력 해 주세요.');
            }
            if(props.token){
                axios.patch('/box', {
                    password,
                    backgroundColor: props.backgroundColor,
                    oops: props.oops,
                    token: props.token,
                }).then(res => {
                    captureBox();
                    props.setModal({...props.modal, isOpen: false});
                    setAlert('');
                }).catch(err => {
                    if(err.response.status === 400){
                        setAlert('비밀번호가 일치하지 않습니다.');
                    }else{
                        setAlert(err.res.data.message);
                    }
                });
            }else{
                axios.post('/box', {
                    password,
                    backgroundColor: props.backgroundColor,
                    oops: props.oops,
                }).then(res => {
                    props.setToken(res.data.token);
                    captureBox();
                    props.setModal({...props.modal, isOpen: false});
                    setAlert('');
                }).catch(err => {
                    setAlert(err.res.data.message);
                });
            }
            setPassword('');
        }
    }

    return <>
        <Modal isOpen={props.modal.isOpen} className="passwordModal"
        overlayClassName="passwordModalOverlay" appElement={document.querySelector('.box') as any} style={{
            content: {
                zoom: props.zoom
            }
        }}>
            <div className="content">
                <div className="title">
                    PASSWORD
                </div>
                <div className="input">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder={props.modal.mode === 0 || props.token ? '비밀번호를 입력하세요.' : '비밀번호를 설정하세요.'}
                    onKeyPress={e => e.key==="Enter" ? onClickConfirm(e) : null}/>
                </div>
                <div className="alert">
                    {alert}
                </div>
                <div className="buttonBox">
                    <div className="confirmButton" onClick={e => onClickConfirm(e)}>
                        OK
                    </div>
                </div>
            </div>
            <img src="/image/modalExitImage.png" className='modalExitImage' onClick={e => {
                e.preventDefault();
                setPassword('');
                props.setModal({
                    ...props.modal,
                    isOpen: false
                });
            }}/>
        </Modal>
    </>
}