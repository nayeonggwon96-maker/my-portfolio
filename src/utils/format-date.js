/**
 * 날짜를 '2026.11.25 14:30' 형태의 문자열로 바꿉니다.
 *
 * @param {string} isoString - ISO 형식 날짜 문자열 (예: DB 의 created_at)
 * @returns {string} 화면 표시용 날짜 문자열
 *
 * Example usage:
 * formatDate('2026-11-25T05:30:00Z') // '2026.11.25 14:30'
 */
export function formatDate(isoString) {
  const date = new Date(isoString);
  const pad = (value) => String(value).padStart(2, '0');

  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} `
    + `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
