import { Stack } from '@mui/material';
import ContactPanel from './contact-panel';
import IconTextItem from './icon-text-item';
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
          <IconTextItem key={ id } Icon={ Icon } label={ label } value={ value } href={ href } />
        )) }
      </Stack>
    </ContactPanel>
  );
}

export default ContactInfoCard;
