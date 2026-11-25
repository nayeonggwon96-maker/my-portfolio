import { Box, Typography } from '@mui/material';

/**
 * ContactPanel 컴포넌트
 * Contact 섹션의 2x2 그리드에 들어가는 공통 카드 틀입니다.
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
        borderRadius: 2,
        border: '1px solid',
        borderColor: isPlain ? 'transparent' : 'var(--mono-border)',
        bgcolor: isPlain ? 'transparent' : 'var(--mono-surface)',
        color: 'var(--mono-ink)',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: 'var(--color-accent)',
          mb: 1,
        }}
      >
        { eyebrow }
      </Typography>
      <Typography
        component="h3"
        sx={{ m: 0, mb: description ? 0.75 : 3, fontSize: { xs: '1.15rem', md: '1.3rem' }, fontWeight: 600 }}
      >
        { title }
      </Typography>
      { description && (
        <Typography sx={{ m: 0, mb: 3, fontSize: '0.9rem', color: 'var(--mono-text-muted)' }}>
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
