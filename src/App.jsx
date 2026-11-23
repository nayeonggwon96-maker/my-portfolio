import { Box, Container } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/common/nav-bar';
import HomePage from './pages/home-page';
import AboutPage from './pages/about-page';
import ProjectsPage from './pages/projects-page';

/**
 * 앱 최상위 레이아웃
 * - 상단: 네비게이션 바
 * - 본문: 반응형 중앙 정렬 영역 안에 페이지별 라우트 표시
 */
function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <NavBar />

      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/about" element={ <AboutPage /> } />
            <Route path="/projects" element={ <ProjectsPage /> } />
            <Route path="*" element={ <Navigate to="/" replace /> } />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
