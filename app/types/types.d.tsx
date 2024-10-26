export type UserFormPost = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
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
  ward_id: string;
  constituency_id: string;
  county_id: string;
};
export type TeamFormPost = {
  name: string;
  ward_id: string;
  sub_county_id: string;
  county_id: string;
};
export type CaptainFormPost = {
  ward_id: Number;
  sub_county_id: string;
  county_id: string;
  player_id: string;
  team_id: string;
};
export type VenueFormPost = {
  ward_id: Number;
  sub_county_id: string;
  county_id: string;
  name: string;
};
export type PlayerFormPost = {
  name: string;
  email: string;
  phone: string;
  team_id: string;
  ward_id: Number;
  sub_county_id: string;
  county_id: string;
};
