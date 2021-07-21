import Link from 'next/link';

const ErrorScreen = ({ title }: { title: string }) => {
  return (
    <div tw="w-full h-full flex justify-center items-center">
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
