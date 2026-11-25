import { Box, Typography } from '@mui/material';
import { useGuestbook } from '../../../hooks/use-guestbook';
import ContactInfoCard from './contact-info-card';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';
import SnsLinksCard from './sns-links-card';

/**
 * ContactSection 컴포넌트
 * Home 페이지의 Contact 섹션입니다. 무채색 톤의 2x2 그리드로 구성됩니다.
 * - 윗줄: 연락처 카드 | SNS 링크
 * - 아랫줄: 방명록 쓰기 | 받은 쪽지 목록
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
        bgcolor: 'var(--mono-surface)',
        color: 'var(--mono-ink)',
        border: '1px solid var(--mono-border)',
        borderRadius: 3,
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
        <Typography
          component="span"
          sx={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--mono-text-muted)' }}
        >
          SECTION 05
        </Typography>
        <Typography
          id="contact-title"
          component="h2"
          sx={{
            m: 0,
            mt: 1,
            fontSize: { xs: '2rem', md: '2.75rem' },
            fontWeight: 300,
            letterSpacing: '0.12em',
          }}
        >
          CONTACT
        </Typography>
        <Typography
          sx={{
            mt: 1.5,
            fontSize: { xs: '0.95rem', md: '1rem' },
            fontWeight: 300,
            letterSpacing: '0.05em',
            color: 'var(--mono-text-muted)',
          }}
        >
          방문해주셔서 감사합니다
        </Typography>
        <Box sx={{ width: 32, height: 2, bgcolor: 'var(--color-accent)', mx: 'auto', mt: 2 }} />
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
        <GuestbookForm onSubmit={ addEntry } />
        <GuestbookList entries={ entries } isLoading={ isLoading } loadError={ loadError } />
      </Box>
    </Box>
  );
}

export default ContactSection;
