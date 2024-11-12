import { useCallback, useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginScheme } from 'utils';
import { Button, Input } from 'components';
import { signIn } from 'store/auth/actions';
import { useAppDispatch } from 'libraries/redux';
import { ERoutePaths, TLogInProps } from 'types/';

import styles from './LogIn.module.scss';

const LogIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<TLogInProps>({
    mode: 'onChange',
    resolver: yupResolver(loginScheme),
  });

  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = useCallback(
    (data: TLogInProps) => {
      dispatch(signIn({ email: data.email, password: data.password }))

    },
    [dispatch, navigate]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          register={register}
          placeholder="Username"
          className={styles.input}
          error={errors?.email?.message as string}
        />
        <Input
          name="password"
          register={register}
          placeholder="Password"
          type="password"
          className={styles.input}
          error={errors?.password?.message as string}
        />
        {formError && <p className={styles.errorMessage}>{formError}</p>}
        <Button
          type="submit"
          disabled={!isValid && isDirty}
          className={styles.submitButton}
        >
          LOGIN
        </Button>
        <p className={styles.registerText}>
          Not registered?{' '}
          <span onClick={() => navigate(ERoutePaths.Register)}>
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
