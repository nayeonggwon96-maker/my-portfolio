import { Box, Stack, Typography } from '@mui/material';

/**
 * IconTextItem 컴포넌트
 * 얇은 테두리 원 안의 아이콘 + 라벨/값 텍스트를 한 줄로 정렬해서 보여줍니다.
 * href 가 있으면 값 부분이 링크가 되고, 외부 주소(http)는 새 탭으로 엽니다.
 *
 * Props:
 * @param {React.ElementType} Icon - MUI 아이콘 컴포넌트 [Required]
 * @param {string} label - 위쪽 작은 라벨 (예: 'EMAIL') [Required]
 * @param {string} value - 아래쪽 표시 값 [Required]
 * @param {string} href - 링크 주소 (mailto:, tel:, https:// 등) [Optional]
 *
 * Example usage:
 * <IconTextItem Icon={ GitHubIcon } label="GITHUB" value="@my-id" href="https://github.com/my-id" />
 */
function IconTextItem({ Icon, label, value, href }) {
  const isExternal = href?.startsWith('http');

  return (
    <Stack component="li" direction="row" spacing={ 2 } sx={{ alignItems: 'center' }}>
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

      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--mono-text-muted)' }}>
          { label }
        </Typography>
        { href ? (
          <Box
            component="a"
            href={ href }
            target={ isExternal ? '_blank' : undefined }
            rel={ isExternal ? 'noopener noreferrer' : undefined }
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
  );
}

export default IconTextItem;
