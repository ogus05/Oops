import { useEffect, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from 'react-modal';
import { IFont } from '../interface/font.i';
import { IKeyword } from '../interface/keyword.i';
import { IOop } from '../interface/oop.i';
import { CreateModal } from './createModal';
import './scss/myModal.scss';
export const MyModal = (props: {modal: {isOpen: boolean, selectedOop: number}, setModal: any, keyword: IKeyword[],
oops: IOop[], setOops: any, fontList: IFont[], zoom: number}) => {
    const defaultOopConfig = {
        keywordID: -1, font: 1, fontColor: '#000000', fontSize: 20, color: '#ece8ff', size: 185,
        borderColor: '#7760e3', x: 0, y: 0, text: '',
    }

    const [oop, setOop] = useState<IOop>(defaultOopConfig);
    const [topic, setTopic] = useState<{ID: number, name: string}[]>();
    const [createMoalIsOpen, setCreateModalIsOpen] = useState(false);

    useEffect(() => {
        if(props.modal.selectedOop === -1){
            setOop(defaultOopConfig);
        } else{
            setOop(props.oops[props.modal.selectedOop])
        }
    }, [props.modal.isOpen])

    useEffect(() => {
        const tempTopic: {ID: number, name: string}[] = [];
            props.keyword.forEach(keyword => {
                if(!tempTopic.some(topic => topic.ID === keyword.topic.ID)){
                    tempTopic.push(keyword.topic);
                }
            });
        setTopic(tempTopic);
    }, [props.keyword])
    
    
    const oopSizeStyle = (px: number): React.CSSProperties  => {
        return {
            height: px, width: px, lineHeight: px + "px",
            backgroundColor: (oop.size !== px) ? '#f0edff' : '#785cff',
            color: (oop.size !== px) ? '#000000' : '#FFFFFF',
        }
    }
    const onClickDelete = e => {
        e.preventDefault();
        if(props.modal.selectedOop !== -1){
            props.setOops(props.oops.filter((v,i) => i !== props.modal.selectedOop));
        }
        props.setModal({selectedOop: -1, isOpen: false});
    }

    const onClickConfirm = e => {
        if(props.modal.selectedOop === -1){
            setCreateModalIsOpen(true);
        } else{
            const temp = props.oops;
            temp[props.modal.selectedOop] = oop;
            props.setOops(temp);
        }
        props.setModal({selectedOop: -1, isOpen: false});
    }
    
    const onChangeInput = e => {
        e.preventDefault();
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight) + "px";
        setOop({...oop, text: e.target.value});
    }
    return <>
        <Modal isOpen={props.modal.isOpen} onRequestClose={() => {props.setModal({...props.modal, isOpen: false})}} className="myModal"
        overlayClassName="myModalOverlay" appElement={document.querySelector('.box') as any} style={{
            content: {
                zoom: props.zoom,
            }
        }}>
            {
                oop.keywordID === -1 ?
                <>
                    <div className="title">
                        KEYWORDS
                    </div>
                    <div className="content">

                        {
                            topic ? topic.map((v, i) => {
                                return <div className="topic" key={i}>
                                    <div className="topicName">
                                        {v.name}
                                    </div>
                                    <div className="keyword">
                                        {
                                            props.keyword.map((innerV, innerI) => {
                                                return v.ID === innerV.topic.ID ? <div className="keywordBox" key={innerI} onClick={e => setOop({...oop, keywordID: innerV.ID})}>
                                                <div className="keywordBoxText">
                                                    {innerV.text + " "}
                                                    {innerV.ID !== 1 ? <img src={`/image/keyword/${innerV.ID}.png`}/> : null}
                                                </div>
                                            </div> : null;
                                            })
                                        }
                                    </div>
                                </div>
                            }) : null
                        }
                        <div className="blank" style={{height: 20}}>

                        </div>
                    </div>
                </> :
                <>
                    <div className="title" onClick={e => setOop({...oop, keywordID: -1})}>
                        {"< OOP SETTINGS"}
                    </div>
                    <div className="setting">
                        <div className="keywordBox" onClick={e => setOop({...oop, keywordID: -1})}>
                            <div className="keywordBoxText">
                                {props.keyword.find((v, i) => v.ID === oop.keywordID)!.text + " "}
                                {
                                    oop.keywordID !== 1 ? <img src={`/image/keyword/${oop.keywordID}.png`}/> : null
                                }
                            </div>
                        </div>
                        <BrowserView>
                            <textarea value={oop.text} onChange={e => onChangeInput(e)} className='userInput' placeholder='웁을 채울 내용 입력'
                            
                            />                
                        </BrowserView>
                        <MobileView>
                            <textarea value={oop.text} onChange={e => onChangeInput(e)} className='userInput' placeholder='웁을 채울 내용 입력'
                            onFocus={e => {
                                const mymodal = document.querySelector('.myModal') as HTMLElement;
                                window.addEventListener('resize', e2 => {
                                    mymodal.style.marginTop="30%";
                                    window.addEventListener('resize', e3 => {
                                        mymodal.style.marginTop="";
                                        window.removeEventListener('resize', () => {});
                                    })
                                });
                                
                            }}
                            />
                        </MobileView>
                        <div className="blank" style={{height: 29}}/>
                        <div className="settingText">
                            <div className="subTitle">
                                {"> 텍스트 설정"}
                            </div>
                            <select className='settingTextFont' value={oop.font} onChange={e => {setOop({...oop, font: parseInt(e.target.value)})}}>
                                {
                                    props.fontList.map((v, i) => {
                                        return <option value={v.ID} key={i}>{v.name}</option>
                                    })
                                }
                            </select>
                            <input type="number" className='settingTextFontSize' placeholder='사이즈'
                            onChange={e => {setOop({...oop, fontSize: parseInt(e.target.value)})}}
                            value={oop.fontSize}/>
                            <div className="settingTextFontColorBox">
                                <div className='settingTextFontColor' style={{backgroundColor: oop.fontColor}}>
                                    <input type="color" value={oop.fontColor} onChange={e => {setOop({...oop, fontColor: e.target.value})}}/>
                                </div>
                                <div>
                                    폰트 색상
                                </div>
                            </div>
                        </div>
                        <div className="blank" style={{height: 23}}/>
                        <div className="settingOop">
                            <div className="subTitle">
                                {"> 웁 설정"}
                            </div>
                            <div className="settingOopGrid">
                                <div className="settingOopColorBox">
                                    <div className='settingOopColor' style={{backgroundColor: oop.color}}>
                                        <input type="color" value={oop.color} onChange={e => {setOop({...oop, color: e.target.value})}}/>
                                    </div>
                                </div>
                                <div>
                                    웁 색상
                                </div>
                                <div className="settingOopBorderColorBox">
                                    <div className='settingOopBorderColor' style={{backgroundColor: oop.borderColor}}>
                                        <input type="color" value={oop.borderColor} onChange={e => {setOop({...oop, borderColor: e.target.value})}}/>
                                    </div>
                                </div>
                                <div>
                                    테두리 색상
                                </div>
                            </div>
                            <div className="settingOopSize">
                                <div className="line1">
                                {new Array(65, 85, 105).map((v, i) => {
                                        return <div className={"size" + v} onClick={e => {setOop({...oop, size: v})}}
                                        style={oopSizeStyle(v)} key={i}>{v}</div>
                                    })}
                                </div>
                                <div className="line2">
                                    {new Array(55, 50, 135, 185, 80, 35, 210, 230).map((v, i) => {
                                        return <div className={"size" + v} onClick={e => {setOop({...oop, size: v})}}
                                        style={oopSizeStyle(v)} key={i}>{v}</div>
                                    })}
                                </div>
                                <div className="line3">
                                    {   
                                        props.modal.selectedOop !== -1 ? 
                                        <div className="deleteButton" onClick={e => onClickDelete(e)}>
                                            웁 삭제
                                        </div>
                                        : <span></span>
                                    }
                                        <div className="confirmButton" onClick={e => onClickConfirm(e)}>
                                            OK
                                        </div>
                                </div>
                                <div className="blank" style={{
                                    height: 50
                                }}>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            <img src="/image/modalExitImage.png" className='modalExitImage' onClick={() => {
                props.setModal({...props.modal, isOpen: false});
            }}/>
        </Modal>
        <CreateModal modalIsOpen={createMoalIsOpen} setModalIsOpen={setCreateModalIsOpen} setOops={(x, y) => props.setOops(props.oops.concat({
            ...oop, x, y
        }))} oop={oop}/>
    </>
}