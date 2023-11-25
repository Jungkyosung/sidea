//기본 조회 데이터 정제

//날짜 확인해서 데이터 업데이트 해주고 갖고 있는 데이터(알람이 꺼졌는지 켜졌는지)랑 
//새로 가져온 데이터(일정이 추가되거나 옵션이 변경된 경우)랑 비교해서 업데이트 해줌.
//(왜? 알림이 작동했는지 여부를 체크해야 하기 때문에)
//

//하루하루 기준으로 해야겠음
//1. 알람 설정 체크(아마 쿼리에서 필터할 듯)
//2. 알람 울림여부 속성 추가
//3. 투두 완료여부 체크
//4. 데이트 속성 추가(new Date) 오늘자로 알람시간 속성 추가
//5. 알람 키고 끄고 처리만 하면 완료
//6. 사용자가 접속했다 > 해당 날짜 데이터를 가져옴 > 데이터를 조정해서 알람 로직이 실행되도록 함 > (조정완료한)알람 데이터는 로컬스토리지에 저장해둠
//7. 1분 마다 함수 실행 > 만약 날짜가 00:00:00을 넘어 변하면(다음날) 알람 데이터를 다음날짜 데이터를 서버에서 가져옴.
//8. 알람들을 다 초기화하고 다시 조정해서 로컬스토리지에 업데이트 함.

//공통. 사용자가 todo를 추가/수정/삭제/완료 처리를 할 경우엔 서버에 데이터를 다시 조회해서 로컬스토리지에 저장해둔 알림 로직과 비교하여 로컬스토리지 알람데이터를 계속 업데이트 해줌.



//1. 알람 설정 체크
function checkAlarmYn(data) {
  const alarmData = data.filter((data)=> data.todoAlarm == 1);
  return alarmData;
}

//2. 알람울림여부 속성 추가, 값을 Boolean으로 할지 Y, N으로 할지 고민되네 큰 상관은 없음.
function addAlarmProperty(alarmData) {
  const alarmPropertyAddedData = addPropertyForObjectArray(alarmData, "alarmTurned", "N");
  return alarmPropertyAddedData;
}

//3. 투두 완료여부 체크
function checkDoneYn(data) {
  const doneData = data.filter((data)=> data.todoDone === 0);
  return doneData;
}

//4. 데이트 속성 추가(new Date)
function addDateProperty(data){
  const todayString = getTodayString();
  const arrAlarmTime = getArrayAlarmTime(data);
  return data.map((obj, index) => ({...obj, alarmTime : new Date(todayString + " " + arrAlarmTime[index])}))
}


//속성추가 메서드(유연하게 하면 인자를 키값 객체배열로 받아도 될 듯?)
function addPropertyForObjectArray(bfData, key, value) {
  return bfData.map((obj) => ({...obj, [key] : value }))
}

//오늘 날짜 문자변환 Date -> "yyyy-mm-dd"
function getTodayString(){
  let today = new Date();
  let todayString = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return todayString;
}

//객체배열에서 알람시간 추출
function getArrayAlarmTime(bfData) {
  let arrAlarmTime = bfData.map((data) => data.todoAlarmTime.slice(-8));
  return arrAlarmTime;
}

//기본 조회 데이터
//(GET) http://localhost:8080/api/todo/alarm/todolist
//@param : userIdx, number
//@param : todoDate, yyyy-mm-dd
const sampleData = [
  {
      "todoIdx": 125,
      "userIdx": 32,
      "todoContents": "에브리 화요일",
      "todoDate": "2023-10-03 01:18:20",
      "todoDone": 0,
      "todoDelete": "N",
      "todoStartDate": "2023-10-03",
      "todoEndDate": "2023-10-03",
      "todoDoneDate": null,
      "todoAlarm": 0,
      "todoAlarmTime": "2023-10-03 04:10:00",
      "userEmail": null,
      "todoPoint": 100,
      "todoMon": 0,
      "todoTue": 1,
      "todoWed": 0,
      "todoThu": 0,
      "todoFri": 0,
      "todoSat": 0,
      "todoSun": 0,
      "todoDoneIdx": 67,
      "todoDoneCheck": 0,
      "todoDoneTime": null
  },
  {
      "todoIdx": 126,
      "userIdx": 32,
      "todoContents": "수요일",
      "todoDate": "2023-10-03 01:19:00",
      "todoDone": 0,
      "todoDelete": "N",
      "todoStartDate": "2023-10-04",
      "todoEndDate": "2023-10-04",
      "todoDoneDate": null,
      "todoAlarm": 0,
      "todoAlarmTime": "2023-10-04 01:00:00",
      "userEmail": null,
      "todoPoint": 100,
      "todoMon": 0,
      "todoTue": 0,
      "todoWed": 0,
      "todoThu": 0,
      "todoFri": 0,
      "todoSat": 0,
      "todoSun": 0,
      "todoDoneIdx": 0,
      "todoDoneCheck": 0,
      "todoDoneTime": null
  },
  {
      "todoIdx": 127,
      "userIdx": 32,
      "todoContents": "매주 목,금,토",
      "todoDate": "2023-10-05 00:34:40",
      "todoDone": 0,
      "todoDelete": "N",
      "todoStartDate": "2023-10-05",
      "todoEndDate": "2023-10-05",
      "todoDoneDate": null,
      "todoAlarm": 0,
      "todoAlarmTime": "2023-10-05 01:05:00",
      "userEmail": null,
      "todoPoint": 100,
      "todoMon": 0,
      "todoTue": 0,
      "todoWed": 0,
      "todoThu": 1,
      "todoFri": 1,
      "todoSat": 1,
      "todoSun": 0,
      "todoDoneIdx": 0,
      "todoDoneCheck": 0,
      "todoDoneTime": null
  },
  {
      "todoIdx": 128,
      "userIdx": 32,
      "todoContents": "today일요일",
      "todoDate": "2023-10-08 00:50:16",
      "todoDone": 0,
      "todoDelete": "N",
      "todoStartDate": "2023-10-08",
      "todoEndDate": "2023-10-08",
      "todoDoneDate": null,
      "todoAlarm": 0,
      "todoAlarmTime": "2023-10-08 02:00:00",
      "userEmail": null,
      "todoPoint": 100,
      "todoMon": 0,
      "todoTue": 0,
      "todoWed": 0,
      "todoThu": 0,
      "todoFri": 0,
      "todoSat": 0,
      "todoSun": 0,
      "todoDoneIdx": 0,
      "todoDoneCheck": 0,
      "todoDoneTime": null
  },
  {
      "todoIdx": 129,
      "userIdx": 32,
      "todoContents": "알람 설정",
      "todoDate": "2023-11-12 23:19:48",
      "todoDone": 0,
      "todoDelete": "N",
      "todoStartDate": "2023-11-12",
      "todoEndDate": "2023-11-12",
      "todoDoneDate": null,
      "todoAlarm": 1,
      "todoAlarmTime": "2023-11-12 01:05:00",
      "userEmail": null,
      "todoPoint": 100,
      "todoMon": 0,
      "todoTue": 0,
      "todoWed": 0,
      "todoThu": 0,
      "todoFri": 0,
      "todoSat": 0,
      "todoSun": 0,
      "todoDoneIdx": 0,
      "todoDoneCheck": 0,
      "todoDoneTime": null
  },
  {
      "todoIdx": 130,
      "userIdx": 32,
      "todoContents": "매주 월요일 알람 설정",
      "todoDate": "2023-11-12 23:20:12",
      "todoDone": 0,
      "todoDelete": "N",
      "todoStartDate": "2023-11-13",
      "todoEndDate": null,
      "todoDoneDate": null,
      "todoAlarm": 1,
      "todoAlarmTime": "2023-11-13 02:00:00",
      "userEmail": null,
      "todoPoint": 200,
      "todoMon": 1,
      "todoTue": 0,
      "todoWed": 0,
      "todoThu": 0,
      "todoFri": 0,
      "todoSat": 0,
      "todoSun": 0,
      "todoDoneIdx": 0,
      "todoDoneCheck": 0,
      "todoDoneTime": null
  }
]
