const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 4000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/promises', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB 연결 성공!');
}).catch((err) => {
  console.error('❌ MongoDB 연결 실패:', err);
});

// 약속 스키마 생성
const promiseSchema = new mongoose.Schema({
  text: String,
  accepted: Boolean,
});

const PromiseModel = mongoose.model('Promise', promiseSchema);

// 약속 전체 조회 API
app.get('/promises', async (req, res) => {
  const promises = await PromiseModel.find().sort({ _id: -1 });
  res.json(promises);
});

// 약속 등록 API
app.post('/promises', async (req, res) => {
  const { text } = req.body;
  const newPromise = new PromiseModel({ text, accepted: false });
  await newPromise.save();
  res.json(newPromise);
});

// 약속 수락 API
app.patch('/promises/:id/accept', async (req, res) => {
  const { id } = req.params;
  const updated = await PromiseModel.findByIdAndUpdate(
    id,
    { accepted: true },
    { new: true }
  );
  res.json(updated);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중! http://localhost:${PORT}`);
});