import { useState } from "react";
import Style from "./ReportPage.module.css";
import Title from "../../../UI/atoms/Title";
import SelectToggleRound from "../../../UI/atoms/toggle/SelectToggleRound";
import NaviControll from "../../../naviControll/NaviControll";

const ReportPage = ({}) => {
  const [selectedReport, setSelectedReport] = useState('오늘')
  const titleProperties = {
    titleName: "리포트"
  };

  const reportList = ['오늘', '주간', '월간'];

  const handlerReportChange = (e) => {
    setSelectedReport(e);
    console.log(e);
  };

  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <div className={Style.header}>
            <Title titleName={titleProperties.titleName}/>
            <div className={Style.selectRepot_box}>
              <SelectToggleRound
                toggleList={reportList}
                toggleActive={selectedReport}
                onToggle={handlerReportChange}
              />
            </div>
          </div>
          <div className={Style.report}>
            <div className={Style.report_box}>
              등록된 투두
            </div>
            <div className={Style.report_box}>
              완료 투두
            </div>
            <div className={Style.report_box}>
              완료투두 그래프
            </div>
            <div className={Style.report_box}>
              획득 포인트
            </div>
          </div>
        </div>

      </NaviControll>
    </>
  );
};

export default ReportPage;