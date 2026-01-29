import type { ErrorInfo, ErrorProps } from "../types/Errors";

const ERRORS: Record<number, ErrorInfo> = {
  400: {
    title: "Некорректный запрос",
    description: "Проверьте данные и попробуйте снова.",
  },
  401: {
    title: "Нужен вход",
    description: "Авторизуйтесь, чтобы продолжить.",
  },
  403: {
    title: "Доступ запрещён",
    description: "У вас нет прав на это действие.",
  },
  404: {
    title: "Страница не найдена",
    description: "Проверьте адрес или вернитесь назад.",
  },
  500: {
    title: "Ошибка сервера",
    description: "Попробуйте позже.",
  },
};

const ErrrorLayout = ({status = 403, message}: ErrorProps) => {

  const info = ERRORS[status] ?? {title: "Ошибка", description: "Что-то пошло не так"};
  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex justify-center items-center flex-col gap-4">
        <div className="flex flex-col items-center">
            <h1 className="text-2xl">{status}</h1>
            <h2 className="text-xl">{info.title}</h2>
        </div>
        <p>{message ?? info.description}</p>
      </main>
    </div>
  );
}

export default ErrrorLayout;