function getTimeMeet (start, end, startMeet, durationMeet) {
  const startMass = start.split(':'); //Приведение к формату чч:мм
  if(startMass[0] < 10 && startMass[0].length === 1) { //  00:00 вместо 0:00
    startMass.splice(0, 1, `0${startMass[0]}`); //Start
  } //Возможно, стоит улучшить, надо спросить у Дениса
  if(startMass[1] < 10 && startMass[1].length === 1) {
    startMass.splice(1, 1, `0${startMass[1]}`);
  }

  const endMass = end.split(':');
  if(endMass[0] < 10 && endMass[0].length === 1) {
    endMass.splice(0, 1, `0${endMass[0]}`); //End
  }
  if(endMass[1] < 10 && endMass[1].length === 1) {
    endMass.splice(1, 1, `0${endMass[1]}`);
  }

  const meetMass = startMeet.split(':');
  if(meetMass[0] < 10 && meetMass[0].length === 1) { //startMeet
    meetMass.splice(0, 1, `0${meetMass[0]}`);
  }
  if(meetMass[1] < 10 && meetMass[1].length === 1) {
    meetMass.splice(1, 1, `0${meetMass[1]}`);
  }

  const beginning = startMass[0] * 60 + Number(startMass[1]); //Приводим аргументы в минуты, начиная с 00:00
  const finish = endMass[0] * 60 + Number(endMass[1]);
  const beginMeet = meetMass[0] * 60 + Number(meetMass[1]);

  if (beginMeet > beginning && beginMeet < finish && beginMeet + durationMeet < finish) {
    return (true);
  } else {
    return (false);
  }
}
// eslint-disable-next-line no-unused-vars
const timeMeetBegin = getTimeMeet ('9:10', '18:30', '9:19', 10); //Вызов функции с заданными аргументами
