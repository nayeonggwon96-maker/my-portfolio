import { Box, Typography } from '@mui/material';

/**
 * SectionCard 컴포넌트
 * 섹션/페이지의 역할을 텍스트로 보여주는 카드입니다.
 * 라벨(태그) → 제목 → 설명 순서로 표시합니다.
 *
 * Props:
 * @param {string} label - 제목 위에 표시할 작은 태그 텍스트 [Required]
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 카드 설명 문구 [Required]
 * @param {string} background - 카드 배경 (CSS 값, 예: 'var(--gradient-hero)') [Optional, 기본값: 'var(--color-bg-primary)']
 * @param {string} titleComponent - 제목에 사용할 HTML 태그 [Optional, 기본값: 'h2']
 * @param {boolean} isFeatured - 강조 카드 여부. 여백·글씨를 키우고 태그를 accent 색으로 표시 [Optional, 기본값: false]
 *
 * Example usage:
 * <SectionCard label="SECTION 01" title="Hero" description="설명" background="var(--gradient-hero)" isFeatured />
 */
function SectionCard({
  label,
  title,
  description,
  background = 'var(--color-bg-primary)',
  titleComponent = 'h2',
  isFeatured = false,
}) {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        background,
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border-track)',
        borderRadius: 3,
        px: { xs: 3, md: 5 },
        py: isFeatured ? { xs: 5, md: 8 } : { xs: 3, md: 5 },
      }}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          mb: 2,
          px: 1.5,
          py: 0.5,
          borderRadius: 999,
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '1px',
          bgcolor: isFeatured ? 'var(--color-accent)' : 'var(--color-secondary)',
          color: isFeatured ? '#000000' : 'var(--color-bg-primary)',
        }}
      >
        { label }
      </Box>

      <Typography
        component={ titleComponent }
        sx={{
          m: 0,
          mb: 1.5,
          fontWeight: 700,
          lineHeight: 1.2,
          fontSize: isFeatured
            ? { xs: '2rem', md: '3rem' }
            : { xs: '1.5rem', md: '2rem' },
        }}
      >
        { title }
      </Typography>

      <Typography
        sx={{
          color: 'var(--color-text-secondary)',
          fontSize: { xs: '1rem', md: '1.1rem' },
          lineHeight: 1.6,
        }}
      >
        { description }
      </Typography>
    </Box>
  );
}

export default SectionCard;
