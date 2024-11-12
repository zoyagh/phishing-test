import { useCallback, FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerScheme } from 'utils';
import { Button, Input } from 'components';
import { signUp } from 'store/auth/actions';
import { useAppDispatch } from 'libraries/redux';
import { ERoutePaths, TRegisterProps } from 'types/';

import styles from './Register.module.scss';

const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<TRegisterProps>({
    mode: 'onChange',
    resolver: yupResolver(registerScheme),
  });


  const onSubmit = useCallback(
    (data: TRegisterProps) => {
        dispatch(
          signUp({
            email: data.email,
            password: data.password,
            fullName: data.fullName,
          })
        )

      reset();
    },
    [dispatch, navigate, reset]
  );

  return (
    <div className={styles.wrapper}>
      <form className={styles.wrapper__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="fullName"
          register={register}
          placeholder="Full Name"
          className={styles.wrapper__form__inp}
          error={errors?.fullName?.message as string}
        />

        <Input
          name="email"
          register={register}
          placeholder="Email"
          className={styles.wrapper__form__inp}
          error={errors?.email?.message as string}
        />

        <Input
          name="password"
          type="password"
          register={register}
          className={styles.wrapper__form__inp}
          placeholder="Enter password"
          error={errors?.password?.message as string}
        />


        <Button
          type="submit"
          disabled={!isValid || !isDirty}
          className={styles.wrapper__form__btn}
        >
          Sign Up
        </Button>

        <p className={styles.wrapper__register}>
          Already have an account?{' '}
          <span onClick={() => navigate(ERoutePaths.LogIn)}>Log In</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
