export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

  export type TAcademicSemesterName = 'Autumn' | 'summer' | 'fall';
  export type TAcademicSemesterCode = '01' | '02' | '03';
export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: Date;
  StartMonth: TMonths;
  endMonth: TMonths;
};
