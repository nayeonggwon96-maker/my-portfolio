import { Box, Stack, Typography } from '@mui/material';
import ContactPanel from './contact-panel';
import { CONTACT_ITEMS } from './contact-data';

/**
 * ContactInfoCard 컴포넌트
 * 이메일 · 전화번호 · 위치를 카드 틀 없이 '아이콘 + 텍스트' 한 줄씩 정렬해서 보여줍니다.
 *
 * Props: 없음 (내용은 contact-data.js 의 CONTACT_ITEMS 에서 수정)
 *
 * Example usage:
 * <ContactInfoCard />
 */
function ContactInfoCard() {
  return (
    <ContactPanel eyebrow="CONTACT" title="연락처" variant="plain">
      <Stack component="ul" spacing={ 2.5 } sx={{ listStyle: 'none', m: 0, p: 0 }}>
        { CONTACT_ITEMS.map(({ id, label, value, href, Icon }) => (
          <Stack key={ id } component="li" direction="row" spacing={ 2 } alignItems="center">
            {/* 아이콘: 얇은 테두리 원 안에 표시 */}
            <Box
              sx={{
                flexShrink: 0,
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid var(--mono-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--mono-ink)',
              }}
            >
              <Icon sx={{ fontSize: 20 }} aria-hidden />
            </Box>

            {/* 텍스트: 라벨 위, 값 아래 */}
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--mono-text-muted)' }}
              >
                { label }
              </Typography>
              { href ? (
                <Box
                  component="a"
                  href={ href }
                  sx={{
                    color: 'var(--mono-ink)',
                    fontSize: '1rem',
                    wordBreak: 'break-all',
                    '&:hover': { color: 'var(--color-accent)', textDecoration: 'none' },
                  }}
                >
                  { value }
                </Box>
              ) : (
                <Typography sx={{ fontSize: '1rem', color: 'var(--mono-ink)' }}>{ value }</Typography>
              ) }
            </Box>
          </Stack>
        )) }
      </Stack>
    </ContactPanel>
  );
}

export default ContactInfoCard;
