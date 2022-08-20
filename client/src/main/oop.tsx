import { useEffect, useState } from "react"
import WebFont from 'webfontloader';
import { IOop } from "../interface/oop.i";
import Draggable from 'react-draggable';
import './scss/oop.scss';
import { IFont } from "../interface/font.i";

export const Oop = (props: {config: IOop, setMyModalOpen: any, setConfig: any, configMode: boolean,
keywordText: string | undefined, fontList: IFont[] | undefined, setFontList: any, zoom: number}) => {
    let timer;
    const touchDuration = 200;
    let isLongTouch = false;
    const [zoom, setZoom] = useState(props.zoom);

    const onTouchStart = e => {
        e.preventDefault();
        if(!timer){
            isLongTouch = false;
            timer = setTimeout(() => isLongTouch = true, touchDuration);
        }
    }

    const onTouchEnd = (e, dragElement) => {
        e.preventDefault();
        props.setConfig({
            ...props.config,
            x: dragElement.x / zoom,
            y: dragElement.y / zoom,
        });
        if(timer){
            if(!isLongTouch){
                props.setMyModalOpen();
            }
            clearTimeout(timer);
            timer = null;
            isLongTouch = false;
        }
    }
    const keywordImageSize = () => {
        return ({["230"]: 37, ["210"]: 31, ["185"] : 32, ["135"] : 24, ["105"]: 19, ["85"]: 16, ["80"]: 15, ["65"]: 15, ["55"]: 15, ["50"]: 15, ["35"]: 15})[props.config.size] || null
    }
    const keywordFontSize = () => {
        return ({["230"]: 20, ["210"]: 20, ["185"] : 19, ["135"] : 15, ["105"]: 11, ["85"]: 9, ["80"]: 6})[props.config.size] || null;
    }

    useEffect(() => {
        if(props.fontList !== undefined && props.fontList.length !== 0){
            const font = props.fontList.find(v => 
                v.ID === props.config.font
            );
            if(font){
                if(!font.isLoaded){
                    WebFont.load({
                        custom: font.type !== 0 ? {
                                families: [font.ID.toString()],
                                urls: [`/font/css/${font.ID.toString()}?type=${font.type}`],
                            } : {
                                families: [font.fontFamily],
                                urls: [`${font.url}`],
                            },
                        active: () => {
                            font.isLoaded = true;
                            props.setConfig({...props.config, font: font.ID})
                            props.setFontList(props.fontList?.map((v, i) => 
                                v.ID === font.ID ? font : v
                            ));
                            (document.querySelector(`.font${props.config.font}`)!.querySelector('.textBox') as HTMLElement).style.fontFamily = font.fontFamily;
                        },
                        inactive: () => {
                        }
                    })
                } else{
                    (document.querySelector(`.font${props.config.font}`)!.querySelector('.textBox') as HTMLElement).style.fontFamily = font.fontFamily;
                }
            }
        }
        window.addEventListener('resize', e => setZoom(window.innerHeight / 844));
    }, [props.fontList, props.config.font]);

    return <Draggable
    onStart={onTouchStart}
    onStop={onTouchEnd}
    position={{x: props.config.x * zoom, y: props.config.y * zoom}}
    disabled={!props.configMode}>
        <div className={`oop font${props.config.font}`} style={{
            color: props.config.fontColor,
            backgroundColor: props.config.color,
            height: (props.config.size - 1.5) * zoom,
            width: (props.config.size - 1.5) * zoom,
            border: `${1.5 * zoom}px solid ${props.config.borderColor}`,
            fontWeight: 700,
            position: 'absolute'
        }}>
            {props.config ? 
                (props.config.keywordID !== 1 && props.config.keywordID) ? <>
                    <div className="keywordBox" style={{
                        height: props.config.size * zoom / 2,
                        alignItems: (props.config.size > 55 && props.config.text) ? 'flex-end' : 'center'
                    }}>
                        <div className="keywordText" style={{
                            fontSize: keywordFontSize() || 0 * zoom,
                        }}>
                            <img src={`/image/keyword/${props.config.keywordID}.png`} style={{
                                height: keywordImageSize() || 24 * zoom,
                                width: keywordImageSize() || 24 * zoom,
                            }}/><br/>
                            {props.config.size > 55 && props.config.text !== "" ? <>
                                {props.keywordText}<br/>
                            </> : null}
                        </div>
                    </div>
                    <div style={{
                        color: '#707070',
                        fontSize: 14 * zoom,
                    }} hidden={!(props.config.size > 55 && props.config.text !== "")}>
                        -
                    </div>
                    <div className="textBox" style={{
                        fontSize: props.config.fontSize * zoom,
                        height: props.config.size * zoom / 2,
                    }} hidden={!(props.config.size > 55 && props.config.text !== "")}>
                            {props.config.text}
                    </div>
                </> : <>
                    <div className="textBox" style={{
                        fontSize: props.config.fontSize * zoom,
                        padding: 0,
                    }} hidden={!(props.config.size > 55)}>
                            {props.config.text}
                    </div>
                </>
            : null}
        </div>
    </Draggable>
}