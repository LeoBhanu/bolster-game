import { useState } from "react";
import "./SignUp.css";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
}

interface Result {
  result: number;
  setSign: React.Dispatch<React.SetStateAction<boolean>>;
  signed: boolean;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = ({ result, setSign, signed, setSigned }: Result) => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    score: 0,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // Format the date and time as a string
    const dateTimeString = `${year}-${month}-${day}`;
    setUser((prevUser: User) => ({
      ...prevUser,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      score: result,
    }));
    // @ts-ignore: local Storage type ignored
    let topScores = JSON.parse(localStorage.getItem("topScores"));
    if (topScores) {
      if (topScores.length >= 10) {
        // @ts-ignore: a,b type ignored
        topScores.sort((a, b) => b?.score - a?.score);
        topScores.pop();
      }
      topScores.push({
        name: data.firstName + " " + data.lastName,
        score: result,
        date: dateTimeString,
      });
    } else {
      topScores = [
        {
          name: data.firstName + " " + data.lastName,
          score: result,
          date: dateTimeString,
        },
      ];
    }
    localStorage.setItem("topScores", JSON.stringify(topScores));
    setSign(false);
    setSigned(true);
  };

  return (
    <div>
      {signed ? (
        <div>
          <h3>Results already signed</h3>
          <div>
            <div
              onClick={() => {
                setSign(false);
              }}
              className="button-box color-text"
            >
              Go Back to results
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("firstName", { required: true, maxLength: 20 })}
              placeholder="First Name"
              type="text"
            />
          </div>
          <div>
            <input
              {...register("lastName", { required: true, maxLength: 20 })}
              placeholder="Last Name"
              type="text"
            />
          </div>
          <div>
            <input
              {...register("email", {
                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i,
              })}
              type="email"
              placeholder="Email"
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUp;
