import React, { useState } from "react";

function App() {
  const [promiseText, setPromiseText] = useState("");

  const handleSubmit = () => {
    console.log("입력된 약속:", promiseText);
    setPromiseText(""); // 입력창 초기화
  };

  return (
    <div style={{ padding: "2rem" }}>
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
        style={{
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        등록하기
      </button>
    </div>
  );
}

export default App;
