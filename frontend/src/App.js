import React, { useState, useEffect } from "react";

function App() {
  const [promiseText, setPromiseText] = useState("");
  const [requester, setRequester] = useState("");
  const [promises, setPromises] = useState([]);

  const API_URL = "http://localhost:4000";

  // 약속 목록 불러오기
  useEffect(() => {
    fetch(`${API_URL}/promises`)
      .then((res) => res.json())
      .then((data) => setPromises(data))
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

  // 약속 등록
  const handleSubmit = () => {
    if (promiseText.trim() === "" || requester.trim() === "") return;

    fetch(`${API_URL}/promises`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: promiseText, requester }),
    })
      .then((res) => res.json())
      .then((newPromise) => {
        setPromises([newPromise, ...promises]);
        setPromiseText("");
        setRequester("");
      })
      .catch((err) => console.error("등록 실패:", err));
  };

  // 약속 수락
  const handleAccept = (id) => {
    const responder = prompt("당신의 이름을 입력해주세요:");
    if (!responder) return;

    fetch(`${API_URL}/promises/${id}/accept`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responder }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const updatedList = promises.map((p) =>
          p._id === id ? updated : p
        );
        setPromises(updatedList);
      })
      .catch((err) => console.error("수락 실패:", err));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>📆 약속 입력하기</h2>

      <input
        type="text"
        placeholder="약속 내용을 입력하세요"
        value={promiseText}
        onChange={(e) => setPromiseText(e.target.value)}
        style={{ width: "200px", padding: "0.5rem", marginRight: "1rem" }}
      />

      <input
        type="text"
        placeholder="요청자 이름"
        value={requester}
        onChange={(e) => setRequester(e.target.value)}
        style={{ width: "150px", padding: "0.5rem", marginRight: "1rem" }}
      />

      <button
        onClick={handleSubmit}
        style={{ padding: "0.5rem 1rem" }}
      >
        등록하기
      </button>

      <hr style={{ margin: "2rem 0" }} />

      <h3>📋 약속 목록</h3>
      <ul>
        {promises.map((item) => (
          <li key={item._id} style={{ marginBottom: "0.8rem" }}>
            {item.accepted ? (
              <>
                🙋 {item.requester} ➡️ {item.text} ✅ <strong>{item.responder}</strong>
              </>
            ) : (
              <>
                🙋 {item.requester} ➡️ {item.text}
                <button
                  onClick={() => handleAccept(item._id)}
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
