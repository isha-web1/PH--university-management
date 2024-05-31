
export type TMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
export type TAcademicSemester = {
    name : 'Autumn' | 'summer' | 'fall',
    code : '01' | '02' | '03',
    year : Date,
    StartMonth : TMonth,
    endMonth : TMonth

}