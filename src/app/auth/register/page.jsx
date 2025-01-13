"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log("DATA", data);

    if (data.password == !data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(res.ok){
      router.push('/auth/login')
    }

    const resJSON = await res.json();
    console.log("RES JSON", resJSON);
  });

  // console.log("ERRORES", errors);

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center ">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Nombre es requerido",
            },
          })}
          placeholder="Ingrese Username"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {" "}
            {errors.username.message}{" "}
          </span>
        )}
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email Username
        </label>

        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email es requerido",
            },
          })}
          placeholder="Ingrese email"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-red-500 text-sm"> {errors.email.message} </span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password
        </label>

        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password es requerido",
            },
          })}
          placeholder="*********"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {" "}
            {errors.password.message}{" "}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password
        </label>

        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirmar password es requerido",
            },
          })}
          placeholder="Confirme password"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {" "}
            {errors.confirmPassword.message}{" "}
          </span>
        )}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
