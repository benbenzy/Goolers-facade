export type UserFormPost = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};
export type TeamFormPost = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  salary: string;
  team: {};
};
export type CourseFormPost = {
  title: string;
  audience: string;
  description: string;
  price: Number;
  course_duration: Number;
  category_id: string;
};
export type ChapterFormPost = {
  title: string;
  body: string;
};
export type LeagueFormPost = {
  name: string;
  budget: string;
  start_date: string;
  end_date: Number;
  ward_id: Number;
  constituency_id: string;
  county_id: string;
};
