let currentCallback = null; // 콜백 함수를 저장할 변수
let state = {}; // 상태

export const 구독 = fn => {
  currentCallback = fn; //콜백 함수를 바로 실행하여 초기 상태를 구독자에게 알립니다.
  return fn();
}

export const 발행기관 = obj => {
  Object.keys(obj).forEach(key => { //각 속성에 대해 반복
    let _value = obj[key]; // 현재 속성의 값을 임시 변수에 저장
    const observers = new Set();
    Object.defineProperty(state, key, { //state:속성을 정의할 객체(반환값). key 새로 정의하거나 수정하려는 속성의 이름, 새로 정의하거나 수정하려는 속성을 기술
      get: () => { //state 사용될때, currentCallback에 observers 추가
        if (currentCallback) observers.add(currentCallback);
        return _value; // 현재 속성의 값을 반환합니다.
      },
      set: (value) => { //state 변경될때, 
        _value = value; //임시 변수에 새 값을 저장
        observers.forEach(observer => observer()); // 모든 observer에게 상태 변화를 알립니다.
      },
    });
  });
  return state;
}
