import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Oop } from './oop';
import "./scss/main.scss";
import { MyModal } from './myModal';
import axios from 'axios'
import { IKeyword } from '../interface/keyword.i';
import { IOop } from '../interface/oop.i';
import { ButtonList } from './buttonList';
import { Download } from './download';
import './scss/download.scss';
import { IFont } from '../interface/font.i';
import 'driver.js/dist/driver.min.css';
import { WelcomeModal } from './welcomeModal';
import { BackgroundModal } from './backgroundModal';
import { PasswordModal } from './passwordModal';
import { LoadModal } from './loadModal';
import { TemplateModal } from './templateModal';
import { ExceptionModal } from './exceptionModal';


const Main = () => {
    const [myModal, setMyModal] = useState({
        isOpen: false, selectedOop: -1,
    });
    const [buttonListIsOpen, setButtonListIsOpen] = useState(false);
    const [backgroundModalIsOpen, setBackgroundModalIsOpen] = useState(false);
    const [loadModalIsOpen, setLoadModalIsOpen] = useState(false);
    const [passwordModal, setPasswordModal] = useState({
        isOpen: false,  mode: 0
    });
    const [templateModalIsOpen, setTemplateModalIsOpen] = useState(false);
    const [exceptionModal, setExceptionModal] = useState({
        isOpen: false, message: '',
    });

    const [welcomeMode, setWelcomeMode] = useState(false);
    const [configMode, setConfigMode] = useState(false);
    const [downloadMode, setDownloadMode] = useState(false);
    
    const [zoom, setZoom] = useState<number>(1);
    const [backgroundColor, setBackgroundColor] = useState('#f4f4f4');
    const [oops, setOops] = useState<IOop[]>([]);
    const [token, setToken] = useState('');
    const [image, setImage] = useState('');
    const [fontList, setFontList] = useState<IFont[]>([{
        ID: -1,
        isLoaded: false,
        name: '',
        type: -1,
        url: '',
        fontFamily: ''
    }]);
    const [keyword, setKeyword] = useState<IKeyword[]>([{
        ID: -1,
        text: '',
        topic: {
            ID: -1,
            name: '',
        },
    }]);
    useEffect(() => {
        setZoom(window.innerHeight / 844);
        axios.get('/keyword').then(res => {
            setKeyword(res.data);
        }).catch(err => {
            setExceptionModal({
                isOpen: true,
                message: err.response.data.message,
            });
        });

        axios.get('/font').then(res => {
            let tempFonts = res.data;
            tempFonts = tempFonts.map((v, i) =>{
                return {...v, isLoaded: false}
            });
            setFontList(res.data);
        }).catch(err => {
            setExceptionModal({
                isOpen: true,
                message: err.response.data.message,
            });
        })
        handleToken();
    }, []);


    const handleToken = () => {
        const token = new URLSearchParams(location.search).get('token');
       
        if(token){
            setConfigMode(false);
            setToken(token);
            axios.get<{oops: IOop[], backgroundColor: string}>(`/box?token=${token}`).then(res => {
                setOops(res.data.oops);
                setBackgroundColor(res.data.backgroundColor);
            }).catch(err => {
                location.href ='/main';
            })
        } else{
            const name = new URLSearchParams(location.search).get('name');
            setOops([{
                keywordID: 1, font: 1, fontColor: '#000000', fontSize: 25, text: name || '',
                color: '#ece8ff', size: 185, borderColor: '#7760e3', x: 110, y: 310,
            }]);
            setConfigMode(true);
        }
    }

    return <>
        <div className="box" style={{
            aspectRatio: '390 / 844',
            height: window.innerHeight,
            backgroundColor: backgroundColor,
            margin: "auto",
            position: "relative",
            overflow: 'hidden',
        }} hidden={downloadMode}>
            <ButtonList setMyModal={setMyModal} listIsOpen={buttonListIsOpen} setListIsOpen={setButtonListIsOpen}
            setBackgroundModalIsOpen={setBackgroundModalIsOpen} setPasswordModal={setPasswordModal} configMode={configMode}
            setTemplateModalIsOpen={setTemplateModalIsOpen} welcomeMode={welcomeMode}/>
            {
                oops.length === 0 ? null : oops.map((v, i) => {
                    return <Oop config={v}  key={i} setMyModalOpen={()=> {
                        setMyModal({isOpen: true, selectedOop: i})
                    }}
                    setConfig={oop => {
                        const tempOops = oops;
                        tempOops.splice(i, 1);
                        setOops(tempOops.concat(oop));
                    }} 
                    keywordText={keyword.find(innerV => v.keywordID === innerV.ID)?.text}
                    configMode={configMode} fontList={fontList} setFontList={setFontList}
                    zoom={zoom}/>})
            }
        </div>


        <MyModal modal={myModal} setModal={setMyModal} keyword={keyword} oops={oops} setOops={setOops}
        fontList={fontList} zoom={zoom}/>
        <WelcomeModal setButtonListIsOpen={setButtonListIsOpen} setWelcomeMode={setWelcomeMode} 
        configMode={configMode} zoom={zoom}/>
        <BackgroundModal modalIsOpen={backgroundModalIsOpen} setModalIsOpen={setBackgroundModalIsOpen} backgroundColor={backgroundColor} 
        setBackgroundColor={setBackgroundColor}/>
        <PasswordModal modal={passwordModal} setModal={setPasswordModal} setConfigMode={setConfigMode} oops={oops}
        setDownloadMode={setDownloadMode} backgroundColor={backgroundColor} setToken={setToken} token={token} zoom={zoom}
        setImage={setImage} setLoadModalIsOpen={setLoadModalIsOpen}/>
        <TemplateModal modalIsOpen={templateModalIsOpen} setModalIsOpen={setTemplateModalIsOpen} zoom={zoom} setOops={setOops}
        setBackgroundColor={setBackgroundColor} setExceptionModal={setExceptionModal}/>
        <ExceptionModal modal={exceptionModal} setModal={setExceptionModal} zoom={zoom}/>
        <LoadModal isOpen={loadModalIsOpen} zoom={zoom}/>
        <Download downloadMode={downloadMode} token={token} image={image} zoom={zoom}/>
    </>
}

ReactDOM.render(<Main/>, document.querySelector("#main"));