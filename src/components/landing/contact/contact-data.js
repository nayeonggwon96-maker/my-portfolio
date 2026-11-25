import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

/**
 * ✏️ 연락처 정보 — 실제 정보로 바꿔서 사용하세요.
 * href 가 있으면 클릭 시 메일/전화 앱이 열립니다.
 */
export const CONTACT_ITEMS = [
  { id: 'email', label: 'EMAIL', value: 'hello@example.com', href: 'mailto:hello@example.com', Icon: EmailOutlinedIcon },
  { id: 'phone', label: 'PHONE', value: '010-0000-0000', href: 'tel:01000000000', Icon: PhoneIphoneIcon },
  { id: 'location', label: 'LOCATION', value: 'Seoul, Korea', Icon: PlaceOutlinedIcon },
];

/** ✏️ SNS 링크 — 실제 계정 주소로 바꿔서 사용하세요. */
export const SNS_LINKS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/nayeonggwon96-maker', Icon: GitHubIcon },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: LinkedInIcon },
  { id: 'email', label: 'Email', href: 'mailto:hello@example.com', Icon: EmailOutlinedIcon },
];

/** 방명록에서 고를 수 있는 이모지 */
export const EMOJI_OPTIONS = ['💌', '🌸', '✨', '☕', '👏', '🙌', '💡', '🍀'];

/** 방명록 나이대 선택지 (DB 의 age_group 체크 조건과 같아야 합니다) */
export const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대 이상'];

/** 사진 최대 용량 (DB Storage 버킷 제한과 동일: 5MB) */
export const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
