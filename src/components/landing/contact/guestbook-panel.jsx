import { Box, Typography } from '@mui/material';
import ContactPanel from './contact-panel';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';

/**
 * GuestbookPanel 컴포넌트
 * '쪽지 남기기' 폼과 '받은 쪽지' 목록을 카드 하나로 묶어서 보여줍니다.
 * 위쪽: 작성 폼 / 구분선 / 아래쪽: 받은 쪽지 목록
 *
 * Props:
 * @param {Array<object>} entries - 방명록 목록 [Required]
 * @param {boolean} isLoading - 불러오는 중 여부 [Required]
 * @param {string} loadError - 불러오기 실패 메시지 (없으면 빈 문자열) [Required]
 * @param {(form: object, photoFile: File|null) => Promise<void>} onSubmit - 방명록 저장 함수 [Required]
 *
 * Example usage:
 * <GuestbookPanel entries={ entries } isLoading={ isLoading } loadError={ loadError } onSubmit={ addEntry } />
 */
function GuestbookPanel({ entries, isLoading, loadError, onSubmit }) {
  return (
    <ContactPanel eyebrow="GUESTBOOK" title="쪽지 남기기" description="편하게 쪽지 남겨주세요">
      <GuestbookForm onSubmit={ onSubmit } />

      <Box sx={{ borderTop: '1px solid var(--mono-border)', my: { xs: 4, md: 5 } }} />

      <Typography
        component="h4"
        sx={{ m: 0, mb: 2.5, fontSize: '1rem', fontWeight: 600, color: 'var(--mono-ink)' }}
      >
        받은 쪽지
      </Typography>
      <GuestbookList entries={ entries } isLoading={ isLoading } loadError={ loadError } />
    </ContactPanel>
  );
}

export default GuestbookPanel;
