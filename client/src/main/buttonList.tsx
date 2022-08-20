import './scss/buttonList.scss';

export const ButtonList = (props: {setMyModal: any, 
    listIsOpen: boolean, setListIsOpen: any, 
    setBackgroundModalIsOpen: any, setPasswordModal: any, configMode: boolean,
    setTemplateModalIsOpen: any, welcomeMode: boolean}) => {

    const onClickButtonList = e => {
        if(props.welcomeMode){
            return false;
        } else{
            props.setListIsOpen(!props.listIsOpen);
            return true;
        }
    }

    const onClickAddButton = e => {
        if(!onClickButtonList(e)) return;
        props.setMyModal({
            isOpen: true,
            selectedOop: -1,
        });
    }

    const onClickTemplateButton = e => {
        if(!onClickButtonList(e)) return;
        props.setTemplateModalIsOpen(true);
    }

    const onClickRectButton = e => {
        if(!onClickButtonList(e)) return;
        props.setBackgroundModalIsOpen(true);
    }
    const onClickDownloadButton = e => {
        if(!onClickButtonList(e)) return;
        props.setPasswordModal({isOpen: true, mode: 1});
    }
    const onClickConfigButton = e => {
        if(!onClickButtonList(e)) return;
        props.setPasswordModal({isOpen: true, mode: 0});
    }

    const onClickCreateButton = e => {
        if(!onClickButtonList(e)) return;
        location.href = '/'
    }

    const onClickPlusButton = e => {
        if(!onClickButtonList(e)) return;
    }

    return <div className="buttonList" onClick={e => onClickButtonList(e)}>
        {props.configMode ? <>
        <div className={"addButton" + (props.listIsOpen ? " selected": "")} onClick={e => onClickAddButton(e)}>
            <img src="/image/plusImage.png"/>
        </div>
        <div className={"templateButton" + (props.listIsOpen ? " selected": "")} onClick={e => onClickTemplateButton(e)}>
            <img src="/image/templateImage.png"/>
        </div>
        <div className={"rectButton" + (props.listIsOpen ? " selected": "")} onClick={e => onClickRectButton(e)}>
            <img src="/image/rectImage.png"/>
        </div>
        <div className={"downloadButton" + (props.listIsOpen ? " selected": "")} onClick={e => onClickDownloadButton(e)}>
            <img src="/image/downloadImage.png"/>
        </div>
        <div className={"plusButton" + (props.listIsOpen ? " selected": "")} onClick={e => onClickPlusButton(e)}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" crossOrigin=''/>
            <span className="material-symbols-outlined">add</span>
        </div>
        </> : <>
        <div className={"createButton" + (props.listIsOpen ? " selected": "")} onClick={e => onClickCreateButton(e)}>
            <img src="/image/createImage.png"/>
        </div>
        <div className={"configButton" + (props.listIsOpen ? " selected": "")} onClick={e => onClickConfigButton(e)}>
            <img src="/image/configImage.png"/>
        </div>
        <div className={"plusButton" + (props.listIsOpen ? " selected": "")} onClick={e => onClickPlusButton(e)}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" crossOrigin=''/>
            <span className="material-symbols-outlined">add</span>
        </div>
    </>}
</div>
}