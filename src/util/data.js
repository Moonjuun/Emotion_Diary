export const getStringDate = (date) => {
  // toISOString은 date객체를 yyyy-mm-dd(hh:mm:ss)로 문자열로 반환해줌
  return date.toISOString().slice(0, 10);
};
