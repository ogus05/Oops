import { useEffect, useState } from "react";

export const Download = (props:{downloadMode: boolean, token: string, image: string, zoom: number}) => {

    const onClickDownload = e => {
        e.preventDefault();
        const link = document.createElement('a');
        link.download =`oops.png`;
        link.href= props.image;
        link.click();
    };
    const onClickCopy = e => {
        e.preventDefault();
        navigator.clipboard.writeText(props.token);
    };

    const onClickShare = e => {
        const shareData = {
            title: 'Oops!',
            text: '세상에서 가장 간편한 자기소개법 OOPS!',
            url: `/main/token=${props.token}`,
        }
        e.preventDefault();
        if(navigator.canShare(shareData)){
            navigator.share(shareData);
        }else{
            alert('오류입니다 잠시 후 다시 시도해 주세요.');
        }
    };
    
    return <div className="download" hidden={!props.downloadMode} style={{
        zoom: props.zoom
    }}>
        <div className={"logoBox"}>
            <img src="/image/logoImage.png" onClick={e => location.href = '/'}/>
        </div>
            <div className="imageBox">
                <img src={props.image}/>
            </div>
            <div className="blank">

            </div>
            <div className="textBox">
                <div className="text">
                    TOKEN
                </div>
            </div>
            <div className="tokenBox">
                <div className="token">
                    {props.token}
                </div>
                <div className="image" onClick={e => onClickCopy(e)}>
                    <img src="/image/copyImage.png"/>
                </div>
            </div>
            <div className={"buttonBox" + (navigator.canShare({
                title: '',
                text: '',
                url: '/',
            }) ? "" : " onlyDownload")}>
                <div className="downloadButton" onClick={e => onClickDownload(e)}>
                    <div className="image">
                        <img src="/image/photoImage.png"/>
                    </div>
                    <div className="text">
                        PNG로 저장
                    </div>
                </div>
                {
                    navigator.canShare({
                        title: '',
                        text: '',
                        url: '/',
                    }) ? 
                    <div className="shareButton" onClick={e => onClickShare(e)}>
                        <div className="image">
                            <img src="/image/shareImage.png"/>
                        </div>
                        <div className="text">
                            웁스 공유하기
                        </div>
                    </div> : null
                }
            </div>
    </div>
}