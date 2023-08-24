import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchApi from "helpers/fetchApi";

const Protect = (Page) => {
  return function Protect(props) {
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const authenticateTeacher = async () => {
      try {
        const res = await fetchApi("/teacher/authenticate");
        if (res.success) {
          setTeacher(res.teacher);
          setLoading(false);
        } else {
          router.push("/teacher/login"); // Redirect if not authenticated
        }
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/teacher/login"); // Redirect on error
      }
    };

    useEffect(() => {
      authenticateTeacher();
    }, []);

    if (!teacher) {
      return null; // Return null to prevent rendering before redirection
    }

    return (
      <>
        <main className="px-[clamp(1.25rem,6vw,6rem)] py-[clamp(1.25rem,6vw,3rem)] lg:px-[clamp(6rem,14vw,12rem)] space-y-10">
          <Page teacher={teacher} {...props} />
        </main>
      </>
    );
  };
};

export default Protect;
