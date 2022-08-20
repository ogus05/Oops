import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react';
import './welcome.scss';
import axios from 'axios';

const Welcome = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [nameAlert, setNameAlert] = useState('');
    const [tokenAlert, setTokenAlert] = useState('');
    const [tokens, setTokens] = useState<string[]>([]);
    const [viewSize, setViewSize] = useState({
        width: -1, height: -1, zoom: -1,
    })
    const onClickEnter = e => {
        if(name === ''){
            setNameAlert('이름을 입력 해 주세요.');
        } else{
            location.href =`/main?name=${name}`;
        }
    }
    const onClickPass = e => {
        if(token===''){
            setTokenAlert('토큰을 입력해주세요.');
        }
        else{
            if(tokens.length === 0){
                axios.get('/token').then(res => {
                    setTokens(res.data);
                    const tokenIdx = res.data.findIndex(tokenInArray => tokenInArray === token);
                    if(tokenIdx === -1) {
                        setTokenAlert('존재하지 않는 토큰입니다.');
                    } else{
                        location.href = `/main?token=${token}`;
                    }
                }).catch(err => {
                    setTokenAlert(err.res.data.message);
                });
            } else{
                const tokenIdx = tokens.findIndex(tokenInArray => tokenInArray === token);
                if(tokenIdx === -1) {
                    setTokenAlert('존재하지 않는 토큰입니다.');
                } else{
                    location.href = `/main?token=${token}`;
                }
            }
        }
    }

    const handleKeyPress = (e, func) => {
        if(e.key === 'Enter'){
            func(e);
        }
    }

    useEffect(() => {
        const getView = () => {
            const vh = window.innerHeight;
            const vw = window.innerWidth;
            if(vw < 300){
                setViewSize({
                    zoom: vw / 390,
                    height: vh / vw * 390,
                    width: -1,
                })
            } else{
                setViewSize({
                    zoom: vh / 844,
                    width: vw / vh * 844,
                    height: -1,
                })
            }
        }
        getView();
        window.addEventListener('resize', getView);
    }, []);
    

    return <article style={viewSize}>
        <div className="blank" style={{height: 200}}>

        </div>
        <div className="imageBox">
            <img src="/image/logoImage.png"/>
        </div>
        <div className="textBox">
            <div className="text">
                나를 소개하는 가장 특별한 방법
            </div>
        </div>
        <div className="nameBox">
            <input type="text" placeholder="NAME" value={name} onChange={e => setName(e.target.value)}
            onKeyPress={e => handleKeyPress(e, onClickEnter)}/>
                의 웁스 만들기
        </div>
        <div className="nameAlert">
            {nameAlert}
        </div>
        <div className="enterImageBox">
            <img src="/image/enterImage.png" className="enterImage" onClick={e => onClickEnter(e)}
            onTouchStart={e => onClickEnter(e)}/>
        </div>
        <div className="blank" style={{height: 188}}>
        </div>
        <div className="tokenAlert">
            {tokenAlert}
        </div>
        <div className="tokenBox">
            <div className="inputBox">
                <input type="text" name="token" placeholder="토큰을 입력해주세요." value={token} onChange={e => setToken(e.target.value)}
                onKeyPress={e => handleKeyPress(e, onClickPass)}/>
            </div>
            <div className="passBox" onClick={e => onClickPass(e)}>
                {">"}
            </div>
        </div>
    </article>   
}

ReactDOM.render(<Welcome/>, document.querySelector("#main"));