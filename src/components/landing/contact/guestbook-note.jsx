import { Box, Stack, Typography } from '@mui/material';
import { formatDate } from '../../../utils/format-date';

/** 쪽지마다 번갈아 적용할 기울기 (붙여 놓은 메모지 느낌) */
const TILTS = ['-1.2deg', '0.8deg', '-0.4deg', '1.1deg'];

/**
 * 쪽지 배경색 목록 (index.css 의 --note-* 변수, 다크모드 자동 대응)
 * 방명록 id 로 색을 고르므로 새 쪽지가 추가돼도 기존 쪽지 색은 바뀌지 않습니다.
 */
const NOTE_COLORS = [
  'var(--note-pink)',
  'var(--note-lavender)',
  'var(--note-mint)',
  'var(--note-lime)',
  'var(--note-butter)',
];

/**
 * GuestbookNote 컴포넌트
 * 방명록 한 개를 오른쪽 위 모서리가 접힌 쪽지 모양으로 보여줍니다.
 * 쪽지마다 파스텔 배경색이 다르게 적용됩니다.
 *
 * Props:
 * @param {object} entry - 방명록 데이터 (display_name, message, emoji, created_at 등) [Required]
 * @param {number} index - 목록 순서. 기울기를 번갈아 주는 데 사용 [Required]
 * @param {(url: string) => void} onPhotoClick - 사진 클릭 시 호출 [Required]
 *
 * Example usage:
 * <GuestbookNote entry={ entry } index={ 0 } onPhotoClick={ setOpenPhoto } />
 */
function GuestbookNote({ entry, index, onPhotoClick }) {
  const meta = [entry.affiliation, entry.age_group].filter(Boolean).join(' · ');

  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        p: 2,
        pr: 2.5,
        bgcolor: NOTE_COLORS[entry.id % NOTE_COLORS.length],
        borderRadius: '4px',
        transform: `rotate(${TILTS[index % TILTS.length]})`,
        transition: 'transform 0.2s',
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
        '&:hover': { transform: 'rotate(0deg) translateY(-2px)' },
        // 오른쪽 위 접힌 모서리
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 16,
          height: 16,
          background: 'linear-gradient(225deg, var(--mono-surface) 50%, rgba(0, 0, 0, 0.1) 50%)',
          borderBottomLeftRadius: '3px',
        },
      }}
    >
      <Typography sx={{ fontSize: '1.4rem', lineHeight: 1, mb: 1 }} aria-hidden>
        { entry.emoji }
      </Typography>

      <Typography
        sx={{
          fontSize: '0.9rem',
          lineHeight: 1.6,
          color: 'var(--mono-ink)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        { entry.message }
      </Typography>

      { entry.photo_url && (
        <Box
          component="button"
          type="button"
          onClick={ () => onPhotoClick(entry.photo_url) }
          aria-label="사진 크게 보기"
          sx={{ display: 'block', mt: 1.5, p: 0, border: 0, bgcolor: 'transparent', cursor: 'zoom-in', width: '100%' }}
        >
          <Box
            component="img"
            src={ entry.photo_url }
            alt={ `${entry.display_name}님이 첨부한 사진` }
            loading="lazy"
            sx={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: '3px', display: 'block' }}
          />
        </Box>
      ) }

      <Stack sx={{ mt: 1.5, pt: 1.25, borderTop: '1px dashed rgba(128, 128, 128, 0.35)' }}>
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mono-ink)' }}>
          From. { entry.display_name }
        </Typography>
        { meta && (
          <Typography sx={{ fontSize: '0.7rem', color: 'var(--mono-text-muted)' }}>{ meta }</Typography>
        ) }
        <Typography sx={{ fontSize: '0.7rem', color: 'var(--mono-text-muted)' }}>
          { formatDate(entry.created_at) }
        </Typography>
      </Stack>
    </Box>
  );
}

export default GuestbookNote;
