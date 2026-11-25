import { Stack } from '@mui/material';
import SectionCard from '../components/ui/section-card';
import ContactSection from '../components/landing/contact/contact-section';

/** Home 페이지 자리 표시 섹션 목록 (화면에 표시되는 순서대로, Contact 는 별도 컴포넌트) */
const homeSections = [
  {
    id: 'hero',
    label: 'SECTION 01 · HERO',
    title: 'Hero',
    description: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
    background: 'var(--gradient-hero)',
    titleComponent: 'h1',
    isFeatured: true,
  },
  {
    id: 'about',
    label: 'SECTION 02 · ABOUT ME',
    title: 'About Me',
    description: '여기는 About Me 섹션입니다. 간단한 자기소개와 \'더 알아보기\' 버튼이 들어갈 예정입니다.',
    background: 'var(--color-bg-primary)',
  },
  {
    id: 'skill-tree',
    label: 'SECTION 03 · SKILL TREE',
    title: 'Skill Tree',
    description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
    background: 'var(--surface-pastel-lavender)',
  },
  {
    id: 'projects',
    label: 'SECTION 04 · PROJECTS',
    title: 'Projects',
    description: '여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 \'더 보기\' 버튼이 들어갈 예정입니다.',
    background: 'var(--color-bg-secondary)',
  },
];

/**
 * HomePage 컴포넌트
 * Hero · About Me · Skill Tree · Projects · Contact 5개 섹션을 세로로 나열합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      { homeSections.map(({ id, ...section }) => (
        <SectionCard key={ id } { ...section } />
      )) }
      <ContactSection />
    </Stack>
  );
}

export default HomePage;
