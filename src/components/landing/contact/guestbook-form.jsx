import { useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AGE_GROUPS, EMOJI_OPTIONS, MAX_PHOTO_SIZE } from './contact-data';

const INITIAL_FORM = {
  authorName: '',
  message: '',
  emoji: EMOJI_OPTIONS[0],
  affiliation: '',
  ageGroup: '',
  email: '',
  phone: '',
};

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_PATTERN = /^[0-9+\- ]{7,20}$/;

/** 테두리형 입력칸 공통 스타일 (귀여운 테마: 둥근 모서리 + 핑크 포커스) */
const fieldSx = {
  '& .MuiInputLabel-root': { color: 'var(--cute-muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--cute-accent)' },
  '& .MuiInputLabel-root.Mui-error': { color: 'error.main' },
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    bgcolor: 'var(--cute-soft)',
    color: 'var(--cute-ink)',
    '& fieldset': { borderColor: 'var(--cute-border)', borderWidth: 2 },
    '&:hover fieldset': { borderColor: 'var(--cute-accent)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--cute-accent)', borderWidth: 2 },
    '&.Mui-error fieldset': { borderColor: 'error.main' },
  },
  '& .MuiFormHelperText-root': { mx: 0.5 },
  '& .MuiSvgIcon-root': { color: 'var(--cute-muted)' },
};

/**
 * 입력값을 검사하고 문제가 있는 칸의 에러 메시지를 돌려줍니다.
 * @param {object} form - 폼 입력값
 * @returns {object} { 필드명: 에러 메시지 }
 */
function validate(form) {
  const errors = {};
  if (!form.authorName.trim()) errors.authorName = '이름을 입력해주세요.';
  if (!form.message.trim()) errors.message = '메시지를 입력해주세요.';
  if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) errors.email = '이메일 형식을 확인해주세요.';
  if (form.phone.trim() && !PHONE_PATTERN.test(form.phone.trim())) errors.phone = '숫자와 - 만 입력해주세요.';
  return errors;
}

/**
 * GuestbookForm 컴포넌트
 * 쪽지 형태의 방명록을 작성하는 폼입니다. (GuestbookPanel 안에서 사용)
 * 이모지 선택과 사진 1장 업로드를 지원합니다.
 * 이메일 · 전화번호는 비공개로 저장되고, 이름은 화면에 '권ㅇ영' 처럼 가려져서 표시됩니다.
 *
 * Props:
 * @param {(form: object, photoFile: File|null) => Promise<void>} onSubmit - 저장 함수 [Required]
 *
 * Example usage:
 * <GuestbookForm onSubmit={ addEntry } />
 */
function GuestbookForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const fileInputRef = useRef(null);

  // 현재 미리보기 URL (컴포넌트가 사라질 때 해제하기 위해 ref 에도 보관)
  const previewRef = useRef('');

  /**
   * 사진 선택 상태를 바꾸고 미리보기 URL 을 만듭니다. 이전 미리보기 URL 은 메모리에서 해제합니다.
   * @param {File|null} file - 새로 선택한 사진 (지울 때는 null)
   */
  const updatePhoto = (file) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const nextPreview = file ? URL.createObjectURL(file) : '';
    previewRef.current = nextPreview;
    setPhotoFile(file);
    setPhotoPreview(nextPreview);
  };

  useEffect(() => () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', text: '이미지 파일만 올릴 수 있어요.' });
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setStatus({ type: 'error', text: '사진은 5MB 이하만 올릴 수 있어요.' });
      return;
    }
    setStatus(null);
    updatePhoto(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setStatus(null);
    try {
      await onSubmit(form, photoFile);
      setForm(INITIAL_FORM);
      updatePhoto(null);
      setStatus({ type: 'success', text: '방명록이 등록되었어요. 고마워요! 💌' });
    } catch (error) {
      setStatus({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack component="form" spacing={ 2.5 } onSubmit={ handleSubmit } noValidate>
      {/* 이모지 선택 */}
      <Box>
        <Typography sx={{ fontSize: '0.75rem', color: 'var(--cute-muted)', mb: 1 }}>
          오늘의 기분
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }} role="radiogroup" aria-label="이모지 선택">
          { EMOJI_OPTIONS.map((emoji) => {
            const isSelected = form.emoji === emoji;
            return (
              <Box
                key={ emoji }
                component="button"
                type="button"
                role="radio"
                aria-checked={ isSelected }
                onClick={ () => setForm((prev) => ({ ...prev, emoji })) }
                sx={{
                  width: 40,
                  height: 40,
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: isSelected ? 'var(--cute-accent)' : 'var(--cute-border)',
                  bgcolor: isSelected ? 'var(--note-pink)' : 'var(--cute-card)',
                  transform: isSelected ? 'scale(1.12)' : 'none',
                  transition: 'all 0.15s',
                  '&:hover': { borderColor: 'var(--cute-accent)', transform: 'scale(1.12) rotate(-6deg)' },
                }}
              >
                { emoji }
              </Box>
            );
          }) }
        </Stack>
      </Box>

      <TextField
        variant="outlined"
        label="이름 *"
        value={ form.authorName }
        onChange={ handleChange('authorName') }
        error={ Boolean(errors.authorName) }
        helperText={ errors.authorName || '화면에는 권ㅇ영 처럼 가려서 표시돼요.' }
        slotProps={{ htmlInput: { maxLength: 20 } }}
        sx={ fieldSx }
      />

      <TextField
        variant="outlined"
        label="메시지 *"
        value={ form.message }
        onChange={ handleChange('message') }
        error={ Boolean(errors.message) }
        helperText={ errors.message || `${form.message.length} / 500` }
        multiline
        minRows={ 3 }
        slotProps={{ htmlInput: { maxLength: 500 } }}
        sx={ fieldSx }
      />

      {/* 사진 업로드 */}
      <Box>
        <input
          ref={ fileInputRef }
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          hidden
          onChange={ handlePhotoChange }
        />
        { photoPreview ? (
          <Box sx={{ position: 'relative', width: 96, height: 96 }}>
            <Box
              component="img"
              src={ photoPreview }
              alt="업로드할 사진 미리보기"
              sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
            />
            <IconButton
              size="small"
              aria-label="사진 삭제"
              onClick={ () => updatePhoto(null) }
              sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                bgcolor: 'var(--cute-accent)',
                color: 'var(--cute-on-accent)',
                '&:hover': { bgcolor: 'var(--cute-accent-hover)' },
              }}
            >
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="text"
            startIcon={ <AddPhotoAlternateOutlinedIcon /> }
            onClick={ () => fileInputRef.current?.click() }
            sx={{ color: 'var(--cute-accent)', textTransform: 'none', px: 0, '&:hover': { color: 'var(--cute-accent-hover)', bgcolor: 'transparent' } }}
          >
            사진 첨부 (선택 · 5MB 이하)
          </Button>
        ) }
      </Box>

      {/* 선택 정보: 처음부터 입력칸으로 표시 */}
      <Box>
        <Typography sx={{ fontSize: '0.75rem', color: 'var(--cute-muted)', mb: 1.5 }}>
          추가 정보 (선택)
        </Typography>
        <Stack spacing={ 2 }>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={ 2 }>
            <TextField
              variant="outlined"
              label="소속 / 직업"
              value={ form.affiliation }
              onChange={ handleChange('affiliation') }
              slotProps={{ htmlInput: { maxLength: 50 } }}
              sx={{ ...fieldSx, flex: 1 }}
            />
            <TextField
              select
              variant="outlined"
              label="나이대"
              value={ form.ageGroup }
              onChange={ handleChange('ageGroup') }
              sx={{ ...fieldSx, flex: 1 }}
            >
              <MenuItem value="">선택 안 함</MenuItem>
              { AGE_GROUPS.map((age) => (
                <MenuItem key={ age } value={ age }>{ age }</MenuItem>
              )) }
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={ 2 }>
            <TextField
              variant="outlined"
              label="이메일"
              type="email"
              value={ form.email }
              onChange={ handleChange('email') }
              error={ Boolean(errors.email) }
              helperText={ errors.email }
              sx={{ ...fieldSx, flex: 1 }}
            />
            <TextField
              variant="outlined"
              label="전화번호"
              type="tel"
              value={ form.phone }
              onChange={ handleChange('phone') }
              error={ Boolean(errors.phone) }
              helperText={ errors.phone }
              sx={{ ...fieldSx, flex: 1 }}
            />
          </Stack>
          <Stack direction="row" spacing={ 0.75 } sx={{ alignItems: 'center' }}>
            <LockOutlinedIcon sx={{ fontSize: 14, color: 'var(--cute-muted)' }} />
            <Typography sx={{ fontSize: '0.75rem', color: 'var(--cute-muted)' }}>
              이메일과 전화번호는 비공개로 저장되며 방명록에 표시되지 않아요.
            </Typography>
          </Stack>
        </Stack>
      </Box>

      { status && (
        <Alert severity={ status.type } onClose={ () => setStatus(null) } sx={{ borderRadius: '16px' }}>
          { status.text }
        </Alert>
      ) }

      <Button
        type="submit"
        variant="contained"
        disableElevation
        disabled={ isSubmitting }
        sx={{
          py: 1.3,
          px: 5,
          alignSelf: { md: 'flex-end' },
          borderRadius: 999,
          bgcolor: 'var(--cute-accent)',
          color: 'var(--cute-on-accent)',
          fontFamily: 'var(--font-cute)',
          fontSize: '1.05rem',
          boxShadow: '0 4px 0 var(--cute-accent-hover)',
          transition: 'all 0.15s',
          '&:hover': { bgcolor: 'var(--cute-accent-hover)', transform: 'translateY(-1px)', boxShadow: '0 5px 0 var(--cute-accent-hover)' },
          '&:active': { transform: 'translateY(3px)', boxShadow: '0 1px 0 var(--cute-accent-hover)' },
        }}
      >
        { isSubmitting ? '보내는 중...' : '쪽지 보내기 💌' }
      </Button>
    </Stack>
  );
}

export default GuestbookForm;
