const Activate = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-500 md:text-5xl">
          Account Activation
        </h2>

        <p className="mt-4 text-gray-500 md:text-lg">
          An activation link has been sent to your email address. Please check
          your inbox and click on the link to activate your account.
        </p>

        <p className="mt-4 text-gray-500 md:text-lg">
          Didn&apos;t receive the email?{" "}
          <a href="#" className="text-red-500 hover:underline">
            Click here to resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default Activate;