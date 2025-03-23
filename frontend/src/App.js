import React, { useState } from "react";

function App() {
  const [promiseText, setPromiseText] = useState("");
  const [promises, setPromises] = useState([]); // 약속 목록 저장

  const handleSubmit = () => {
    if (promiseText.trim() === "") return; // 빈 내용 막기

    // 새 약속 추가
    const newPromise = {
      id: Date.now(),      // 고유 ID (지금은 임시로 시간 사용)
      text: promiseText
    };

    setPromises([newPromise, ...promises]);
    setPromiseText(""); // 입력창 초기화
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>📆 약속 입력하기</h2>

      <input
        type="text"
        placeholder="약속 내용을 입력하세요"
        value={promiseText}
        onChange={(e) => setPromiseText(e.target.value)}
        style={{ width: "300px", padding: "0.5rem" }}
      />

      <button
        onClick={handleSubmit}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
      >
        등록하기
      </button>

      <hr style={{ margin: "2rem 0" }} />

      <h3>📋 약속 목록</h3>
      <ul>
        {promises.map((item) => (
          <li key={item.id}>• {item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;