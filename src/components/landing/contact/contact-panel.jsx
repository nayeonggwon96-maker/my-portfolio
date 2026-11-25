import { Box, Typography } from '@mui/material';

/**
 * ContactPanel 컴포넌트
 * Contact 섹션의 2x2 그리드에 들어가는 공통 카드 틀입니다.
 * 작은 영문 라벨 → 제목 → 내용 순서로 표시합니다.
 *
 * Props:
 * @param {string} eyebrow - 제목 위의 작은 영문 라벨 (예: 'CONTACT') [Required]
 * @param {string} title - 카드 제목 [Required]
 * @param {React.ReactNode} children - 카드 내용 [Required]
 * @param {boolean} isDark - 검정 배경(반전) 카드 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <ContactPanel eyebrow="CONTACT" title="연락처">내용</ContactPanel>
 */
function ContactPanel({ eyebrow, title, children, isDark = false }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 3, md: 4 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: isDark ? 'var(--mono-ink)' : 'var(--mono-border)',
        bgcolor: isDark ? 'var(--mono-ink)' : 'var(--mono-surface)',
        color: isDark ? 'var(--mono-ink-inverse)' : 'var(--mono-ink)',
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
        sx={{ m: 0, mb: 3, fontSize: { xs: '1.15rem', md: '1.3rem' }, fontWeight: 600 }}
      >
        { title }
      </Typography>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        { children }
      </Box>
    </Box>
  );
}

export default ContactPanel;
