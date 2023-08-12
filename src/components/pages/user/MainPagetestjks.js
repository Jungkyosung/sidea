//프레임

import AskList from "../../UI/atoms/AskList";
import CampaignList from "../../UI/atoms/CampaignList";
import Menu from "../../UI/atoms/Menu";
import Nav from "../../UI/atoms/Nav";
import NavQuick from "../../UI/atoms/NavQuick";
import { BsPersonFill } from 'react-icons/bs';
import ProfileImg from "../../UI/atoms/ProfileImg";
import ProfileText from "../../UI/atoms/ProfileText";
import Title from "../../UI/atoms/Title";
import TodoContent from "../../UI/atoms/TodoContent";

//메인 퀵버튼

const MainPage = () => {


  const askLists = [
    {
      id : 1,
      askIsCommented: true,
      askNumber: 12,
      askTitle: "문의 타이틀"
    },
    {
      id : 2,
      askIsCommented: false,
      askNumber: 11,
      askTitle: "문의 타이틀"
    }
  ]

  const campProperties = {
    campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
    campTitle: "camp타이틀",
    campOrganizer: "camp주최자",
    campProgress: 20
  }

  const menuProperties = {
    menuTitle: "계정설정"
  }

  const profileImgProperties = {
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg"
  }

  const profileTextProperties = {
    profileText: "프로필 닉네임"
  }

  const titleProperties = {
    titleName: "타이틀 제목"
  }

  const todoContents = [
    {
      id: 1,
      todoFinishCheck: false,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    },
    {
      id: 2,
      todoFinishCheck: false,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: true
    },
    {
      id: 3,
      todoFinishCheck: true,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    }
  ]

  return (
    <>
      <p>MainPage</p>
      <p>--AskList--</p>
      {askLists.map((askList) => (
        <AskList
        key={askList.id}
        askIsCommented={askList.askIsCommented}
        askNumber={askList.askNumber}
        askTitle={askList.askTitle}
      />
      ))}

      
      <div><p></p></div>
      <p>--CampaignList--</p>
      <CampaignList
        campImgSource={campProperties.campImgSource}
        campTitle={campProperties.campTitle}
        campOrganizer={campProperties.campOrganizer}
        campProgress={campProperties.campProgress}
      />
      <div><p></p></div>
      <p>--Nav--</p>
      <Nav />

      <div><p></p></div>
      <p>--NavQuick--</p>
      <NavQuick />

      <div><p></p></div>
      <p>--Menu--</p>
      <Menu menuTitle={menuProperties.menuTitle}><BsPersonFill /></Menu>

      <div><p></p></div>
      <p>--ProfileImg--</p>
      <ProfileImg profileImgSrc={profileImgProperties.profileImgSrc} />

      <div><p></p></div>
      <p>--ProfileText--</p>
      <ProfileText profileText={profileTextProperties.profileText} />

      <div><p></p></div>
      <p>--Title--</p>
      <Title titleName={titleProperties.titleName} />

      <div><p></p></div>
      <p>--TodoContent--</p>
      {todoContents.map(todo => (
        <TodoContent
          key={todo.id}
          todoFinishCheck={todo.todoFinishCheck}
          todoTitle={todo.todoTitle}
          todoHasAlarm={todo.todoHasAlarm}
        />
      ))}
    </>
  )
}
export default MainPage;