import { Box, Typography } from '@mui/material';

/**
 * ContactPanel 컴포넌트
 * Contact 섹션에 들어가는 공통 카드 틀입니다. (귀여운 테마: 둥근 모서리 + 핑크 그림자)
 * 작은 영문 라벨 → 제목 → 내용 순서로 표시합니다.
 *
 * Props:
 * @param {string} eyebrow - 제목 위의 작은 영문 라벨 (예: 'CONTACT') [Required]
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 제목 바로 아래 작은 안내 문구 [Optional]
 * @param {React.ReactNode} children - 카드 내용 [Required]
 * @param {'outlined'|'plain'} variant - 'outlined' 는 테두리 카드, 'plain' 은 테두리·배경 없이 내용만 표시 [Optional, 기본값: 'outlined']
 *
 * Example usage:
 * <ContactPanel eyebrow="CONTACT" title="연락처">내용</ContactPanel>
 */
function ContactPanel({ eyebrow, title, description, children, variant = 'outlined' }) {
  const isPlain = variant === 'plain';

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: isPlain ? { xs: 1, md: 4 } : { xs: 3, md: 4 },
        borderRadius: '28px',
        border: '2px solid',
        borderColor: isPlain ? 'transparent' : 'var(--cute-border)',
        bgcolor: isPlain ? 'transparent' : 'var(--cute-card)',
        boxShadow: isPlain ? 'none' : 'var(--cute-shadow)',
        color: 'var(--cute-ink)',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: 'var(--cute-accent)',
          mb: 1,
        }}
      >
        { eyebrow }
      </Typography>
      <Typography
        component="h3"
        sx={{
          m: 0,
          mb: description ? 0.75 : 3,
          fontFamily: 'var(--font-cute)',
          fontSize: { xs: '1.35rem', md: '1.5rem' },
          fontWeight: 400,
        }}
      >
        { title }
      </Typography>
      { description && (
        <Typography sx={{ m: 0, mb: 3, fontSize: '0.9rem', color: 'var(--cute-muted)' }}>
          { description }
        </Typography>
      ) }
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        { children }
      </Box>
    </Box>
  );
}

export default ContactPanel;
