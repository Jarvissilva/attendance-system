import "style.css";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import Error from "next/error";
import fetchApi from "helpers/fetchApi";
import Loader from "components/loader";
import Link from "next/link";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const App = ({ Component, pageProps }) => {
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateTeacher = async () => {
    setIsLoading(true);
    const res = await fetchApi("/teacher/authenticate", "GET");
    setTeacher(res.success ? res.teacher : null);
    setIsLoading(false);
  };

  useEffect(() => {
    authenticateTeacher();
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <header className="flex justify-between items-center px-[clamp(1rem,5vw,5rem)] py-[clamp(1rem,5vw,2.2rem)] border">
        <Link
          className="text-[clamp(1.5rem,5vw,2rem)] font-black leading-none"
          href="/"
        >
          Attendance System
        </Link>
        {teacher ? (
          <Link
            href="/classrooms"
            className="bg-blue-500 text-white font-medium px-[clamp(1.25rem,5vw,1.5rem)] py-[clamp(0.5rem,5vw,.6rem)] rounded-md hover:bg-blue-700"
          >
            Classrooms
          </Link>
        ) : (
          <Link
            href="/teacher/login"
            className="bg-blue-500 text-white font-medium px-[clamp(1.25rem,5vw,1.5rem)] py-[clamp(0.5rem,5vw,.6rem)] rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </header>
      {Component.protected ? (
        isLoading ? (
          <Loader />
        ) : teacher ? (
          <main className="px-[clamp(1.25rem,6vw,6rem)] py-[clamp(1.25rem,6vw,3rem)] lg:px-[clamp(6rem,14vw,12rem)] space-y-10 ">
            <Component {...pageProps} teacher={teacher} />
          </main>
        ) : (
          <Error statusCode={401} title="Please login to access this page" />
        )
      ) : (
        <main className="flex flex-col justify-center items-center gap-2 px-[clamp(1.25rem,6vw,6rem)] py-24 lg:px-[clamp(6rem,35vw,33rem)]">
          <Component {...pageProps} teacher={teacher} />
        </main>
      )}
    </>
  );
};

export default App;
