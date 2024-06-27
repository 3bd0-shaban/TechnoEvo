'use client';
import { getError } from '@/helpers/getError';
import { useSignInMutation } from '@/services/Apis/AuthApi';
import Link from 'next/link';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { UserValidation } from '@/validations/auth.validate';

interface SigninFormProps {}
interface SignInData {
  email: string;
  password: string;
}

const SigninForm: FC<SigninFormProps> = ({}) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: joiResolver(UserValidation.loginSchema),
  });
  const { mutateAsync } = useSignInMutation();

  const onSubmit = async (data: SignInData) => {
    const { email, password } = data;
    await mutateAsync(data)
      .then(async () => {
        await signIn('credentials', {
          email,
          password,
          redirect: true,
          callbackUrl: '/',
        });
        reset();
      })
      .catch((error) => {
        toast.error(getError(error));
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-6 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="signin" className="text-sm font-light text-gray-500">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="Enter Email Address"
          className="form-Input"
        />
        {errors.email && (
          <p className="text-sm font-light text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="signin" className="text-sm font-light text-gray-500">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          placeholder="Enter Email Address"
          className="form-Input"
        />
        {errors.password && (
          <p className="text-sm font-light text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      <Link href="/auth/forget-password" className="text-sm text-red-400">
        Forget Passowrd ?
      </Link>
      <button className="flex h-10 w-full items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-400 active:bg-red-600">
        Sign In
      </button>
      <span className="flex w-full items-center justify-center gap-2 whitespace-nowrap text-sm">
        <p>{`Don't have an account ?`}</p>
        <Link href="/auth/forget-password" className="text-sm text-red-400">
          Sign up
        </Link>
      </span>
    </form>
  );
};

export default SigninForm;
