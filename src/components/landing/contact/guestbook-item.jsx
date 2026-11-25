import { Box, Stack, Typography } from '@mui/material';
import { formatDate } from '../../../utils/format-date';

/**
 * 말풍선 배경색 목록 (index.css 의 --note-* 변수, 다크모드 자동 대응)
 * 방명록 id 로 색을 고르므로 새 글이 추가돼도 기존 글 색은 바뀌지 않습니다.
 */
const BUBBLE_COLORS = [
  'var(--note-pink)',
  'var(--note-lavender)',
  'var(--note-mint)',
  'var(--note-lime)',
  'var(--note-butter)',
];

/**
 * GuestbookItem 컴포넌트
 * 방명록 한 개를 리스트의 한 줄(파스텔 말풍선)로 보여줍니다.
 * 왼쪽: 이모지 동그라미 / 가운데: 이름·소속·날짜 + 메시지 / 오른쪽: 첨부 사진(있을 때)
 *
 * Props:
 * @param {object} entry - 방명록 데이터 (id, display_name, message, emoji, created_at 등) [Required]
 * @param {(url: string) => void} onPhotoClick - 사진 클릭 시 호출 [Required]
 *
 * Example usage:
 * <GuestbookItem entry={ entry } onPhotoClick={ setOpenPhoto } />
 */
function GuestbookItem({ entry, onPhotoClick }) {
  const meta = [entry.affiliation, entry.age_group].filter(Boolean).join(' · ');

  return (
    <Stack
      component="li"
      direction="row"
      spacing={ 2 }
      sx={{
        alignItems: 'flex-start',
        p: { xs: 1.75, sm: 2 },
        borderRadius: '20px',
        bgcolor: BUBBLE_COLORS[entry.id % BUBBLE_COLORS.length],
      }}
    >
      {/* 이모지 */}
      <Box
        aria-hidden
        sx={{
          flexShrink: 0,
          width: 44,
          height: 44,
          borderRadius: '50%',
          bgcolor: 'var(--cute-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
        }}
      >
        { entry.emoji }
      </Box>

      {/* 작성자 정보 + 메시지 */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'baseline' },
            gap: { xs: 0.25, sm: 2 },
            mb: 0.75,
          }}
        >
          <Typography sx={{ fontSize: '0.9rem', color: 'var(--cute-ink)' }}>
            <Box component="span" sx={{ fontWeight: 600 }}>{ entry.display_name }</Box>
            { meta && (
              <Box component="span" sx={{ color: 'var(--cute-muted)', fontSize: '0.8rem' }}>
                { ` · ${meta}` }
              </Box>
            ) }
          </Typography>
          <Typography
            component="time"
            dateTime={ entry.created_at }
            sx={{ flexShrink: 0, fontSize: '0.75rem', color: 'var(--cute-muted)' }}
          >
            { formatDate(entry.created_at) }
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: 'var(--cute-ink)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          { entry.message }
        </Typography>
      </Box>

      {/* 첨부 사진 썸네일 */}
      { entry.photo_url && (
        <Box
          component="button"
          type="button"
          onClick={ () => onPhotoClick(entry.photo_url) }
          aria-label="사진 크게 보기"
          sx={{ flexShrink: 0, p: 0, border: 0, bgcolor: 'transparent', cursor: 'zoom-in' }}
        >
          <Box
            component="img"
            src={ entry.photo_url }
            alt={ `${entry.display_name}님이 첨부한 사진` }
            loading="lazy"
            sx={{ display: 'block', width: 64, height: 64, objectFit: 'cover', borderRadius: '12px' }}
          />
        </Box>
      ) }
    </Stack>
  );
}

export default GuestbookItem;
