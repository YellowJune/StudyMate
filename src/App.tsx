import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { v4 as uuidv4 } from "uuid";

interface PlanItem {
  text: string;
  completed: boolean;
}

interface Plans {
  [userId: string]: {
    [date: string]: PlanItem;
  };
}

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [plans, setPlans] = useState<Plans>({});
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let storedId = localStorage.getItem("studymate_user_id");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("studymate_user_id", storedId);
    }
    setUserId(storedId);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("studymate_plans");
    if (data) {
      setPlans(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    const dateKey = selectedDate.toISOString().split("T")[0];
    const userPlans = plans[userId] || {};
    const planItem = userPlans[dateKey];
    if (planItem) {
      setText(planItem.text);
      setCompleted(planItem.completed);
    } else {
      setText("");
      setCompleted(false);
    }
  }, [selectedDate, userId, plans]);

  const savePlans = (newPlans: Plans) => {
    setPlans(newPlans);
    localStorage.setItem("studymate_plans", JSON.stringify(newPlans));
  };

  const handleSave = () => {
    if (!userId) return;
    const dateKey = selectedDate.toISOString().split("T")[0];
    const userPlans = plans[userId] || {};
    userPlans[dateKey] = { text, completed };
    const newPlans = { ...plans, [userId]: userPlans };
    savePlans(newPlans);
  };

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">📅 StudyMate 스터디 플래너</h1>
      <Calendar
        onChange={(date: Date) => setSelectedDate(date)}
        value={selectedDate}
        view="month"
      />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          선택 날짜: {selectedDate.toISOString().split("T")[0]}
        </h2>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={5}
          placeholder="학습 내용을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label className="flex items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={toggleCompleted}
            className="mr-2"
          />
          완료함
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
