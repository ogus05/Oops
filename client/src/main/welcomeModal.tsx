import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './scss/welcomeModal.scss';
import Driver from 'driver.js';

export const WelcomeModal = (props: {setButtonListIsOpen: any, zoom: number, configMode: boolean, setWelcomeMode: any}) => {
    const [cookie, setCookie] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    useEffect(() => {
        setModalIsOpen(true);
        if(props.configMode){
            if(document.cookie.split('; ').some(i => 
                i.includes('welcomeModal1=1')
            )){
                setModalIsOpen(false);
            }
        } else{
            if(document.cookie.split('; ').some(i => 
                i.includes('welcomeModal2=1')
            )){
                setModalIsOpen(false);
            }
        }
    }, [props.configMode])

    const writeCookie = () => {
        if(cookie){
            if(props.configMode){
                document.cookie = `welcomeModal1=1; max-age=${60 * 60 * 24};`
            } else{
                document.cookie = `welcomeModal2=1; max-age=${60 * 60 * 24};`
            }
        }
    }

    const onClickProgress = e => {
        e.preventDefault();
        writeCookie();
        props.setWelcomeMode(true);
        setModalIsOpen(false);
        props.setButtonListIsOpen(true);
        const driver = new Driver({
            overlayClickNext: true,
            showButtons: false,
            keyboardControl: true,  
        });
        const driverElement = (element: string, className: string, title: string) => {
            return {
                element,
                popover: {
                    className,
                    title,
                    description: '',
                    position: 'left-center',
                },
            }
        }
        setTimeout(() => {
            const steps = props.configMode ? [
                driverElement('.addButton', 'popover', '웁 새로 생성하기'),
                driverElement('.templateButton', 'popover', '템플릿으로 간편하게 웁스 꾸미기'),
                driverElement('.rectButton', 'popover', '배경 색 설정하기'),
                driverElement('.downloadButton', 'popover', '완성된 웁스 저장하기'),
                {
                    ...driverElement('.plusButton', 'popover', '버튼 닫기 / 열기'),
                    onNext: e => {
                        props.setButtonListIsOpen(false);
                        props.setWelcomeMode(false);
                    }
                },
            ] : [
                driverElement('.createButton', 'popover', '새로운 나만의 웁스 만들어보기'),
                driverElement('.configButton', 'popover', '이 웁스 수정하기'),
                {
                    ...driverElement('.plusButton', 'popover', '버튼 닫기 / 열기'),
                    onNext: e => {
                        props.setButtonListIsOpen(false);
                        props.setWelcomeMode(false);
                    }
                },
            ]
            driver.defineSteps(steps);
            driver.start();
            },  1000);
    }

    const onClickSkip = e => {
        e.preventDefault();
        writeCookie();
        setModalIsOpen(false);
    }


    return <Modal isOpen={modalIsOpen}
    className="welcomeModal" overlayClassName="welcomeModalOverlay" appElement={document.querySelector('body') as any} style={{
        content: {
            zoom: props.zoom, 
        }
    }}>
        <div className="content">
            <div className="title">
                세상에서 가장<br/>
                간편한 자기소개법<br/>
                OOPS!<br/>
                {props.configMode ? "<수정하기>" : "<구경하기>"}
            </div>
            <div className="progressButton" onClick={e => onClickProgress(e)}>
                {">> 튜토리얼 진행하기"}
                <div className="textFilter">
                    {">> 튜토리얼 진행하기"}
                </div>
            </div>
            <div className="skipButton" onClick={e => onClickSkip(e)}>
                {">> 튜토리얼 스킵"}
                <div className="textFilter">
                    {">> 튜토리얼 스킵"}
                </div>
            </div>
                <div className="cookieBox" onClick={e => setCookie(!cookie)}>
                    <div className="text">
                        오늘 이 설명창을 다시 표시하지 않음&nbsp;
                    </div>
                    {
                        cookie ? <>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" crossOrigin=''/>
                            <span className="material-symbols-outlined">check_circle</span>
                        </> : <>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" crossOrigin=''/>
                            <span className="material-symbols-outlined button">radio_button_unchecked</span>
                        </>
                    }
            </div>
        </div>
    </Modal>
}