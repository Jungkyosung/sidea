import { useState } from "react";
import Style from "./TodoReportPage.module.css";
import Title from "../../../UI/atoms/Title";
import SelectToggleRound from "../../../UI/atoms/toggle/SelectToggleRound";
import NaviControll from "../../../naviControll/NaviControll";

const TodoReportPage = () => {
  const [selectedReport, setSelectedReport] = useState('오늘')
  const titleProperties = {
    titleName: "리포트"
  };

  const reportList = ['오늘', '주간', '월간'];

  const handlerReportChange = (e) => {
    setSelectedReport(e);
    console.log(e);
  };
  // 선택한 리포트에 따른 컨텐츠 준비
  let reportContent;
  if (selectedReport === "오늘") {
    reportContent = (
      <>
        <div className={Style.report_box}>등록된 투두</div>
        <div className={Style.report_box}>완료 투두</div>
        <div className={Style.report_box}>완료투두 그래프</div>
        <div className={Style.report_point_box}>획득 포인트</div>
      </>
    );
  } else if (selectedReport === "주간") {
    reportContent = (
      <>
        <div className={Style.report_box}>일주일 등록된 투두</div>
        <div className={Style.report_box}>일주일 완료 투두</div>
        <div className={Style.report_box}>일주일 완료투두 그래프</div>
        <div className={Style.report_point_box}>
          <div className={Style.report_point}>일주일 획득 포인트</div>
          <div className={Style.report_point}>일주일 기부 포인트</div>
        </div>
      </>
    );
  } else if (selectedReport === "월간") {
    reportContent = (
      <>
        <div className={Style.report_box}>한달 등록된 투두</div>
        <div className={Style.report_box}>한달 완료 투두</div>
        <div className={Style.report_box}>한달 완료투두 그래프</div>
        <div className={Style.report_point_box}>
          <div className={Style.report_point}>한달 획득 포인트</div>
          <div className={Style.report_point}>한달 기부 포인트</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <div className={Style.header}>
            <Title titleName={titleProperties.titleName} />
            <div className={Style.selectRepot_box}>
              <SelectToggleRound
                toggleList={reportList}
                toggleActive={selectedReport}
                onToggle={handlerReportChange}
              />
            </div>
          </div>
          <div className={Style.report}>{reportContent}</div>
        </div>
      </NaviControll>
    </>
  );
};

export default TodoReportPage;