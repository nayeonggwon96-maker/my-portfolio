import SectionCard from '../components/ui/section-card';

/**
 * AboutPage 컴포넌트
 * 상세 자기소개가 들어갈 About Me 페이지의 자리 표시용 화면입니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  return (
    <SectionCard
      label="PAGE · ABOUT ME"
      title="About Me"
      description="About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다."
      background="var(--gradient-hero)"
      titleComponent="h1"
      isFeatured
    />
  );
}

export default AboutPage;
