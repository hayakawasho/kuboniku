import * as Sentry from '@sentry/browser';

const useSentry = () => {
  const initSentry = () => {
    Sentry.init({
      // dsn: config.sentryDsn
    });
  };

  const captureException = (error, errorInfo) => {
    Sentry.withScope(scope => {
      if (errorInfo) {
        // first capture any additional info
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
      }

      // capture the actual error that was thrown
      Sentry.captureException(error);
    });
  };

  return {
    initSentry,
    captureException,
  };
};

export { useSentry };
