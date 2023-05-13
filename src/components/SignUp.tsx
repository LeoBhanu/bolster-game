import { useState } from "react";
import "./SignUp.css";
import { useForm, SubmitHandler } from "react-hook-form";

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
}

const SignUp = ({ result, setSign }: Result) => {
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
      topScores.push({
        name: data.firstName + " " + data.lastName,
        score: result,
      });
    } else {
      topScores = [
        { name: data.firstName + " " + data.lastName, score: result },
      ];
    }
    localStorage.setItem("topScores", JSON.stringify(topScores));
    setSign(false);
  };

  return (
    <div>
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
    </div>
  );
};

export default SignUp;
