import { createClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트
 * 접속 정보는 프로젝트 루트의 .env 파일(VITE_ 로 시작하는 변수)에서 읽어옵니다.
 * 로그인 기능이 없으므로 세션 저장은 끕니다.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

/** 방명록 사진이 저장되는 Storage 버킷 이름 */
export const GUESTBOOK_PHOTO_BUCKET = 'guestbook-photos';
