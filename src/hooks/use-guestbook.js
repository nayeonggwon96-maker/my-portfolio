import { useCallback, useEffect, useState } from 'react';
import { GUESTBOOK_PHOTO_BUCKET, supabase } from '../utils/supabase-client';

/**
 * 공개 조회가 허용된 컬럼 목록
 * author_name(실명) · email · phone 은 DB 에서 조회 권한이 막혀 있으므로
 * select('*') 대신 반드시 이 목록만 요청해야 합니다.
 */
const PUBLIC_COLUMNS = 'id, display_name, message, affiliation, age_group, emoji, photo_url, created_at';

/** 한 번에 불러올 방명록 개수 */
const PAGE_SIZE = 30;

/**
 * 빈 문자열은 DB 에 null 로 저장되도록 바꿉니다.
 * @param {string} value - 입력값
 * @returns {string|null}
 */
const toNullable = (value) => {
  const trimmed = (value ?? '').trim();
  return trimmed === '' ? null : trimmed;
};

/**
 * 사진을 Storage 에 올리고 공개 URL 을 돌려줍니다.
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<string>} 공개 URL
 */
async function uploadPhoto(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filePath = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(GUESTBOOK_PHOTO_BUCKET)
    .upload(filePath, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error('사진 업로드에 실패했어요. 5MB 이하의 이미지인지 확인해주세요.');
  }

  return supabase.storage.from(GUESTBOOK_PHOTO_BUCKET).getPublicUrl(filePath).data.publicUrl;
}

/**
 * 최신 방명록 목록을 조회합니다 (공개 컬럼만).
 * @returns {Promise<{ data: Array<object>|null, error: object|null }>}
 */
function fetchEntries() {
  return supabase
    .from('guestbook')
    .select(PUBLIC_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(PAGE_SIZE);
}

/**
 * useGuestbook 훅
 * 방명록 목록 불러오기와 새 방명록 작성(사진 업로드 포함)을 담당합니다.
 *
 * @returns {{
 *   entries: Array<object>,
 *   isLoading: boolean,
 *   loadError: string,
 *   addEntry: (form: object, photoFile: File|null) => Promise<void>,
 * }}
 *
 * Example usage:
 * const { entries, isLoading, addEntry } = useGuestbook();
 */
export function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  /** 조회 결과를 화면 상태에 반영합니다. */
  const applyResult = useCallback(({ data, error }) => {
    if (error) {
      setLoadError('방명록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.');
    } else {
      setEntries(data);
      setLoadError('');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let isIgnored = false;
    fetchEntries().then((result) => {
      if (!isIgnored) applyResult(result);
    });
    // 화면을 떠난 뒤 늦게 도착한 응답은 무시합니다.
    return () => {
      isIgnored = true;
    };
  }, [applyResult]);

  const addEntry = useCallback(async (form, photoFile) => {
    const photoUrl = photoFile ? await uploadPhoto(photoFile) : null;

    // 비공개 컬럼은 다시 읽을 수 없으므로 insert 후 select 하지 않고 목록을 새로 불러옵니다.
    const { error } = await supabase.from('guestbook').insert({
      author_name: form.authorName.trim(),
      message: form.message.trim(),
      email: toNullable(form.email),
      phone: toNullable(form.phone),
      affiliation: toNullable(form.affiliation),
      age_group: toNullable(form.ageGroup),
      emoji: form.emoji,
      photo_url: photoUrl,
    });

    if (error) {
      throw new Error('방명록 저장에 실패했어요. 입력 내용을 확인해주세요.');
    }

    applyResult(await fetchEntries());
  }, [applyResult]);

  return { entries, isLoading, loadError, addEntry };
}
