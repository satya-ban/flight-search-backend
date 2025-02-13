export const getDayOfWeek = (date: string):number =>{
    return new Date(date).getDay(); //It returns which day of the week as a number
}