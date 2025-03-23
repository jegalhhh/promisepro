import React, { useState } from "react";

function App() {
  const [promiseText, setPromiseText] = useState("");
  const [promises, setPromises] = useState([]);

  const handleSubmit = () => {
    if (promiseText.trim() === "") return;

    const newPromise = {
      id: Date.now(),
      text: promiseText,
      accepted: false, // 👉 수락 여부 상태 추가
    };

    setPromises([newPromise, ...promises]);
    setPromiseText("");
  };

  const handleAccept = (id) => {
    const updatedPromises = promises.map((p) =>
      p.id === id ? { ...p, accepted: true } : p
    );
    setPromises(updatedPromises);
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
          <li key={item.id} style={{ marginBottom: "0.5rem" }}>
            {item.accepted ? (
              <>
                ✅ {item.text} <span style={{ color: "green" }}> (성사됨)</span>
              </>
            ) : (
              <>
                • {item.text}
                <button
                  onClick={() => handleAccept(item.id)}
                  style={{
                    marginLeft: "1rem",
                    padding: "0.2rem 0.5rem",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  수락하기
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;