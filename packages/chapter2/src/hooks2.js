
export function createHooks(callback) {
  const stateContext = {
    current: 0,
    states: [],
    frameId: {} // 새로운 프로퍼티: 각 상태 업데이트에 대한 frame ID를 저장
  };

  const memoContext = {
    current: 0,
    memos: [],
  };

  function resetContext() {
    stateContext.current = 0;
    memoContext.current = 0;
    stateContext.frameId = {};  
  }

  const useState = (initState) => {
    // 현재 컴포넌트의 상태와 requestAnimationFrame ID를 저장하는 context 추가
    const { current, states, frameId} = stateContext;
    stateContext.current += 1;
    states[current] = states[current] ?? initState;
   
    const setState = (newState) => {
      if (newState === states[current]) return; // 새 상태가 현재 상태와 같다면 업데이트하지 않음

      // 이전의 frame 요청이 있다면 취소
      if (frameId[current]) {
        cancelAnimationFrame(frameId[current]);
      }

      states[current] = newState;

      frameId[current] = requestAnimationFrame(() => {
        callback(); 
        console.log(states); // 현재 상태 로깅
      });
    };

    return [states[current], setState];
  };
  
  


  const useMemo = (fn, refs) => {
    const { current, memos } = memoContext;
    memoContext.current += 1;


    const memo = memos[current];

    const resetAndReturn = () => {
      const value = fn();
      memos[current] = {
        value,
        refs,
      };
      return value;
    };

    if (!memo) {
      return resetAndReturn();
    }

    if (refs.length > 0 && memo.refs.find((v, k) => v !== refs[k])) {
      return resetAndReturn();
    }
    return memo.value;
  };

  return { useState, useMemo, resetContext };
}
