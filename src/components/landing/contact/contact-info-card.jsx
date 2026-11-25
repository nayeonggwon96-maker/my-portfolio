import { Box, Stack, Typography } from '@mui/material';
import ContactPanel from './contact-panel';
import { CONTACT_ITEMS } from './contact-data';

/**
 * ContactInfoCard 컴포넌트
 * 이메일 · 전화번호 · 위치를 카드 안에 한 줄씩 정리해서 보여줍니다.
 *
 * Props: 없음 (내용은 contact-data.js 의 CONTACT_ITEMS 에서 수정)
 *
 * Example usage:
 * <ContactInfoCard />
 */
function ContactInfoCard() {
  return (
    <ContactPanel eyebrow="CONTACT" title="연락처" isDark>
      <Stack divider={ <Box sx={{ borderTop: '1px solid rgba(128,128,128,0.35)' }} /> }>
        { CONTACT_ITEMS.map(({ id, label, value, href, Icon }) => (
          <Stack key={ id } direction="row" spacing={ 2 } alignItems="center" sx={{ py: 1.75 }}>
            <Icon sx={{ fontSize: 20, opacity: 0.7 }} aria-hidden />
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.65rem', letterSpacing: '0.18em', opacity: 0.6 }}>
                { label }
              </Typography>
              { href ? (
                <Box
                  component="a"
                  href={ href }
                  sx={{
                    color: 'inherit',
                    fontSize: '0.95rem',
                    wordBreak: 'break-all',
                    '&:hover': { color: 'var(--color-accent)', textDecoration: 'none' },
                  }}
                >
                  { value }
                </Box>
              ) : (
                <Typography sx={{ fontSize: '0.95rem' }}>{ value }</Typography>
              ) }
            </Box>
          </Stack>
        )) }
      </Stack>
    </ContactPanel>
  );
}

export default ContactInfoCard;
