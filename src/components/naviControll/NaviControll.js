import { useEffect, useState } from 'react';
import Nav from '../UI/atoms/Nav';
import NavQuick from '../UI/atoms/NavQuick';
import NavAdmin from '../UI/atoms/NavAdmin';
import jwt_decode from "jwt-decode";
import { closeSnackbar, useSnackbar } from 'notistack';


const NaviControll = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const targetTime =
        [{
          date: new Date('2023-10-05T00:27:00'),
          isNotAlarmed: true,
          ment: '1alram'
        },
        {
          date: new Date('2023-10-05T00:27:10'),
          isNotAlarmed: true,
          ment: '2alram'
        },
        {
          date: new Date('2023-10-05T00:27:20'),
          isNotAlarmed: true,
          ment: '3alram'
        },
        {
          date: new Date('2023-10-05T00:27:30'),
          isNotAlarmed: true,
          ment: '4alram'
        }];

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userAuth, setUserAuth] = useState(null);


  function firstTimeModifier () {
    const now = new Date()
    const second = Math.ceil(now.getSeconds() / 10) * 10
    const time10sec = now.setSeconds(second)
    const difBetweenTime = time10sec - new Date()
    setTimeout(repeatTimeCheck, difBetweenTime)
  }

  function repeatTimeCheck () {
    setInterval(timeCheck, 10000)
  }

  function timeCheck () {
    console.log('몇번 실행될까 10초마다?')
    const currentTime = new Date()
    targetTime.map((a) => {
      if (a.isNotAlarmed) {
        if (currentTime >= a.date) {
          a.isNotAlarmed = false
          alarmUp(a.ment);
          console.log(new Date());
        }
      }
      return null
    })
  };

  const action = snackbarId => (
    <>
      <button onClick={()=>{closeSnackbar(snackbarId)}}>알람끄기</button>
    </>
  );

  const alarmUp = (msg) => {
    enqueueSnackbar(msg, {action, variant: 'info', persist : true});
    console.log('실행됨?');
  };

  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      const token = sessionStorage.getItem('token');
      const decode_token = jwt_decode(token);
      setUserAuth(decode_token.userAuth);
    }

    firstTimeModifier();

  }, []);



  const handlerNavOn = () => {
    setIsNavOpen(true);
  }

  const handlerNavOff = () => {
    setIsNavOpen(false);
  }


  return (
    <>
        {userAuth === 0 ?
          <><NavAdmin /> {children}</>
          :
          (
            <>
              {isNavOpen ?
                <Nav handlerNavOff={handlerNavOff}></Nav> :
                <NavQuick handlerNavOn={handlerNavOn}></NavQuick>
              }
              {children}
            </>
          )
        }
    </>
  )
}
export default NaviControll;