import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import ContactPanel from './contact-panel';
import { SNS_LINKS } from './contact-data';

/**
 * SnsLinksCard 컴포넌트
 * 짧은 인사말과 SNS 링크를 작은 아이콘 한 줄로 보여줍니다.
 *
 * Props: 없음 (링크는 contact-data.js 의 SNS_LINKS 에서 수정)
 *
 * Example usage:
 * <SnsLinksCard />
 */
function SnsLinksCard() {
  return (
    <ContactPanel eyebrow="FOLLOW" title="SNS">
      <Typography sx={{ color: 'var(--mono-text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
        새로운 프로젝트, 협업 제안, 가벼운 인사 모두 환영해요.
        <br />
        편한 채널로 언제든 연락 주세요.
      </Typography>

      <Stack direction="row" spacing={ 1 } sx={{ mt: 'auto', pt: 3 }}>
        { SNS_LINKS.map(({ id, label, href, Icon }) => {
          const isExternal = href.startsWith('http');
          return (
            <Tooltip key={ id } title={ label }>
              <IconButton
                component="a"
                href={ href }
                target={ isExternal ? '_blank' : undefined }
                rel={ isExternal ? 'noopener noreferrer' : undefined }
                aria-label={ label }
                size="small"
                sx={{
                  width: 40,
                  height: 40,
                  border: '1px solid var(--mono-border)',
                  color: 'var(--mono-ink)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'var(--mono-ink)',
                    borderColor: 'var(--mono-ink)',
                    color: 'var(--mono-ink-inverse)',
                  },
                }}
              >
                <Icon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          );
        }) }
      </Stack>
    </ContactPanel>
  );
}

export default SnsLinksCard;
