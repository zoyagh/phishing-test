import { useCallback, useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { phishingScheme } from "utils";
import { Button, Input } from "components";
import { removeCookie } from "libraries/cookie";
import { AuthSelectors } from "store/auth/selectors";
import { PhishingSelectors } from "store/phishing/selectors";
import PhishingCard from "components/PhishingCard";
import { clearSignIn, userProfile } from "store/auth/actions";
import { useAppDispatch, useAppSelector } from "libraries/redux";
import { phishingAttempts, phishingPost } from "store/phishing/actions";
import { TPhishingCardProps, TPhishingProps } from "types/";

import styles from "./Home.module.scss";


const Home: FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(AuthSelectors.userProfile);
  const phishing = useAppSelector(PhishingSelectors.phishing);

  const logOutHandler = () => {
    removeCookie("token");
    dispatch(clearSignIn());

    window.location.reload();
  };

  const renderPhishingList = phishing?.phishingAttempts?.phishingList?.map(
    ({ id, email, status, content }: TPhishingCardProps) => (
      <PhishingCard
        key={id}
        id={id}
        email={email}
        status={status}
        content={content}
      />
    )
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TPhishingProps>({
    mode: "onChange",
    resolver: yupResolver(phishingScheme),
  });

  const onSubmit = useCallback(
    (data: TPhishingProps) => {
      dispatch(phishingPost({ email: data.email }));
      reset();
    },
    [dispatch, reset]
  );

  useEffect(() => {
    dispatch(userProfile());
    dispatch(phishingAttempts());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <Button className={styles.wrapper__head_btn} onClick={logOutHandler}>
          Sign out
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.wrapper__phishing}
      >
        <Input
          name="email"
          register={register}
          placeholder="Email"
          error={errors?.email?.message as string}
          className={styles.wrapper__phishing__inp}
        />

        <Button className={styles.wrapper__phishing_btn}>Submit</Button>
      </form>
      <div className={styles.wrapper__head}>
        <div className={styles.wrapper__head__profile}>
          <p>Email: {profile?.data?.email}</p>
          <p>FullName: {profile?.data?.fullName}</p>
        </div>
      </div>
      <div className={styles.wrapper__list}>{renderPhishingList}</div>
    </div>
  );
};

export default Home;
