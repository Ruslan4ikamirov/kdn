export type Case = {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;       // позже можно заменить на Date/ISO-строку
  articleOrRefusal: string;
  sentAt: string;
  reviewedAt: string;
  result: string;
}