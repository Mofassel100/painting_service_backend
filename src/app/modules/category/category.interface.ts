export type ICategory ={
  
    title :string;
    name : string
    image? : string | null
    userId: string
}
export type IStudentMyCoursesRequest = {
    academicSemesterId?: string | undefined
    courseId?: string | undefined
  }
  
  export type IStudentMyCourseSchedulesRequest = {
    academicSemesterId?: string | undefined
    courseId?: string | undefined
  }
  
  export type ICategoryFilterRequest = {
    searchTerm?: string | undefined
    name?: string | undefined
    title?: string | undefined
    userId?: string | undefined
  }
  