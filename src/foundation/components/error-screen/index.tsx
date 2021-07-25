import Link from 'next/link';
import tw from 'twin.macro';

const ErrorScreen = ({ title }: { title: string }) => {
  return (
    <div tw="w-full h-screen flex justify-center items-center text-center">
      <div>
        <h1>{title}</h1>
        <Link scroll={false} href="/">
          <a>BACK TO TOP</a>
        </Link>
      </div>
    </div>
  );
};

export { ErrorScreen };
