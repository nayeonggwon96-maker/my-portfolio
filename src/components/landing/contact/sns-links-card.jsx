import { Stack } from '@mui/material';
import ContactPanel from './contact-panel';
import IconTextItem from './icon-text-item';
import { SNS_LINKS } from './contact-data';

/**
 * SnsLinksCard 컴포넌트
 * SNS 계정을 카드 틀 없이 '아이콘 + 텍스트' 한 줄씩 정렬해서 보여줍니다. (연락처와 같은 방식)
 *
 * Props: 없음 (링크는 contact-data.js 의 SNS_LINKS 에서 수정)
 *
 * Example usage:
 * <SnsLinksCard />
 */
function SnsLinksCard() {
  return (
    <ContactPanel eyebrow="FOLLOW" title="SNS" variant="plain">
      <Stack component="ul" spacing={ 2.5 } sx={{ listStyle: 'none', m: 0, p: 0 }}>
        { SNS_LINKS.map(({ id, label, handle, href, Icon }) => (
          <IconTextItem key={ id } Icon={ Icon } label={ label } value={ handle } href={ href } />
        )) }
      </Stack>
    </ContactPanel>
  );
}

export default SnsLinksCard;
