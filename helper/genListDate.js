const genListDate = () => {
  let listDate = [];
  let currentDate = new Date();
  let daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  for (let i = 0; i < 7; i++) {
    let nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + i);
    listDate.push({
      daysOfWeek: daysOfWeek[nextDate.getDay()],
      date: nextDate.toLocaleDateString(),
      id: nextDate.getDay() ,
      day: nextDate.getDate() + "/" + (nextDate.getMonth() + 1)
    });
  }
  return listDate;
};
export default genListDate
