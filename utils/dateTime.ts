export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}/${day}`;
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// 날짜 범위 생성
export const getDateRange = (start: string, end: string) => {
  const startObj = new Date(start);
  const endObj = new Date(end);
  const dates: { key: string; label: string; weekday: string }[] = [];

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const cur = new Date(startObj);
  while (cur <= endObj) {
    const key = cur.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const month = (cur.getMonth() + 1).toString().padStart(2, "0");
    const day = cur.getDate().toString().padStart(2, "0");
    const weekday = dayNames[cur.getDay()];
    
    dates.push({
      key,
      label: `${month}/${day}`,
      weekday,
    });

    cur.setDate(cur.getDate() + 1);
  }

  return dates;
};

export const toKSTIsoString = (date: string, time: string) => {
  if (!date || !time) return null;

  const [hour, minute] = time.split(":").map(Number);

  // KST 기준 Date 객체 생성
  const kstDate = new Date(`${date}T${time}:00+09:00`);

  return kstDate.toISOString();  
};