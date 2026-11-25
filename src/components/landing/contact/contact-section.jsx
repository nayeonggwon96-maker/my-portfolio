import { Box, Typography } from '@mui/material';
import { useGuestbook } from '../../../hooks/use-guestbook';
import ContactInfoCard from './contact-info-card';
import GuestbookPanel from './guestbook-panel';
import SnsLinksCard from './sns-links-card';

/**
 * ContactSection 컴포넌트
 * Home 페이지의 Contact 섹션입니다. 파스텔 · 둥근 모양의 귀여운 테마로 구성됩니다.
 * - 윗줄: 연락처 | SNS (좌우 2칸)
 * - 아랫줄: 방명록 (쪽지 남기기 + 받은 쪽지, 가로 전체 1칸)
 * 모바일에서는 한 줄에 하나씩 세로로 쌓입니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const { entries, isLoading, loadError, addEntry } = useGuestbook();

  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-title"
      sx={{
        width: '100%',
        background: 'var(--cute-bg)',
        color: 'var(--cute-ink)',
        border: '2px solid var(--cute-border)',
        borderRadius: '36px',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
        <Typography
          component="span"
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            bgcolor: 'var(--cute-card)',
            border: '1px solid var(--cute-border)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: 'var(--cute-accent)',
          }}
        >
          SECTION 05
        </Typography>
        <Typography
          id="contact-title"
          component="h2"
          sx={{
            m: 0,
            mt: 1,
            fontFamily: 'var(--font-cute)',
            fontSize: { xs: '2.25rem', md: '3rem' },
            fontWeight: 400,
            letterSpacing: '0.05em',
          }}
        >
          <Box component="span" aria-hidden sx={{ fontSize: '0.6em', mr: 1 }}>🎀</Box>
          CONTACT
          <Box component="span" aria-hidden sx={{ fontSize: '0.6em', ml: 1 }}>✨</Box>
        </Typography>
        <Typography
          sx={{
            mt: 1.5,
            fontSize: { xs: '0.95rem', md: '1rem' },
            fontFamily: 'var(--font-cute)',
            color: 'var(--cute-muted)',
          }}
        >
          방문해주셔서 감사합니다
        </Typography>
        {/* 파스텔 점 3개 장식 */}
        <Box aria-hidden sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mt: 2 }}>
          { ['var(--cute-accent)', 'var(--color-pastel-lavender)', 'var(--color-pastel-mint)'].map((color) => (
            <Box key={ color } sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
          )) }
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
        }}
      >
        <ContactInfoCard />
        <SnsLinksCard />
        <Box sx={{ gridColumn: '1 / -1' }}>
          <GuestbookPanel entries={ entries } isLoading={ isLoading } loadError={ loadError } onSubmit={ addEntry } />
        </Box>
      </Box>
    </Box>
  );
}

export default ContactSection;
