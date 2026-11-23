import { AppBar, Box, Container, Tab, Tabs, Toolbar } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

/** 네비게이션 탭 목록 */
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

/**
 * NavBar 컴포넌트
 * 상단에 고정되는 네비게이션 바입니다. 현재 경로에 맞는 탭에 밑줄이 표시됩니다.
 * 모바일에서는 로고와 탭이 위아래 두 줄로, 태블릿 이상에서는 한 줄 양 끝으로 배치됩니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <NavBar />
 */
function NavBar() {
  const { pathname } = useLocation();
  const isKnownPath = navItems.some((item) => item.path === pathname);
  const currentTab = isKnownPath ? pathname : false;

  return (
    <AppBar
      position="sticky"
      elevation={ 0 }
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        borderBottom: '1px solid var(--color-primary-dark)',
      }}
    >
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 2 },
            pt: { xs: 1.5, sm: 0 },
          }}
        >
          <Box
            component={ RouterLink }
            to="/"
            sx={{
              color: 'var(--color-secondary)',
              fontWeight: 700,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              letterSpacing: '0.5px',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--color-secondary)',
                textDecoration: 'none',
              },
            }}
          >
            My Portfolio
          </Box>

          <Tabs
            value={ currentTab }
            variant="fullWidth"
            aria-label="페이지 이동"
            sx={{
              width: { xs: '100%', sm: 'auto' },
              '& .MuiTabs-indicator': {
                bgcolor: 'var(--color-primary-dark)',
                height: 3,
              },
            }}
          >
            { navItems.map(({ label, path }) => (
              <Tab
                key={ path }
                label={ label }
                value={ path }
                component={ RouterLink }
                to={ path }
                sx={{
                  minWidth: { xs: 0, sm: 100 },
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  color: 'var(--color-text-secondary)',
                  '&:hover': {
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                  },
                  '&.Mui-selected': {
                    color: 'var(--color-text-primary)',
                  },
                }}
              />
            )) }
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
