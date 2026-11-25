import { useState } from 'react';
import { Alert, Box, CircularProgress, Dialog, Typography } from '@mui/material';
import GuestbookNote from './guestbook-note';

/**
 * GuestbookList 컴포넌트
 * 방명록 쪽지들을 최신순으로 보여줍니다. (GuestbookPanel 안에서 사용)
 * 많아지면 목록 영역 안에서 스크롤됩니다.
 * 쪽지의 사진을 누르면 크게 볼 수 있습니다.
 *
 * Props:
 * @param {Array<object>} entries - 방명록 목록 [Required]
 * @param {boolean} isLoading - 불러오는 중 여부 [Required]
 * @param {string} loadError - 불러오기 실패 메시지 (없으면 빈 문자열) [Required]
 *
 * Example usage:
 * <GuestbookList entries={ entries } isLoading={ isLoading } loadError={ loadError } />
 */
function GuestbookList({ entries, isLoading, loadError }) {
  const [openPhoto, setOpenPhoto] = useState('');

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={ 24 } sx={{ color: 'var(--mono-ink)' }} />
        </Box>
      );
    }
    if (loadError) {
      return <Alert severity="error">{ loadError }</Alert>;
    }
    if (entries.length === 0) {
      return (
        <Typography sx={{ color: 'var(--mono-text-muted)', textAlign: 'center', py: 6, fontSize: '0.9rem' }}>
          아직 쪽지가 없어요.
          <br />
          첫 번째 쪽지를 남겨주세요 💌
        </Typography>
      );
    }
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 2,
          alignItems: 'start',
          maxHeight: { xs: 480, md: 620 },
          overflowY: 'auto',
          p: 1,
          m: -1,
        }}
      >
        { entries.map((entry, index) => (
          <GuestbookNote key={ entry.id } entry={ entry } index={ index } onPhotoClick={ setOpenPhoto } />
        )) }
      </Box>
    );
  };

  return (
    <>
      { renderContent() }

      <Dialog open={ Boolean(openPhoto) } onClose={ () => setOpenPhoto('') } maxWidth="md">
        { openPhoto && (
          <Box
            component="img"
            src={ openPhoto }
            alt="방명록 사진 원본"
            onClick={ () => setOpenPhoto('') }
            sx={{ display: 'block', maxWidth: '100%', maxHeight: '85vh', cursor: 'zoom-out' }}
          />
        ) }
      </Dialog>
    </>
  );
}

export default GuestbookList;
