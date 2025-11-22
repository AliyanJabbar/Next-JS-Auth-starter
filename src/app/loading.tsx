import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed h-screen w-screen bg-white/50 backdrop-blur-2xl flex items-center justify-center z-50">
      <Image
        src="/Logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="mx-auto"
      />
    </div>
  );
};

export default Loading;
