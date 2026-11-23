import SectionCard from '../components/ui/section-card';

/**
 * ProjectsPage 컴포넌트
 * 포트폴리오 작품 목록이 들어갈 Projects 페이지의 자리 표시용 화면입니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  return (
    <SectionCard
      label="PAGE · PROJECTS"
      title="Projects"
      description="Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다."
      background="var(--color-bg-secondary)"
      titleComponent="h1"
      isFeatured
    />
  );
}

export default ProjectsPage;
