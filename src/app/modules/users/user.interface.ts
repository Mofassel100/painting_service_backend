export type IUser = {
  id: string
  name: string
  email: string
  password: string
  phoneNumber?: string | null
  imageURL?: string | null
}

export type IStudentMyCoursesRequest = {
  academicSemesterId?: string | undefined
  courseId?: string | undefined
}

export type IStudentMyCourseSchedulesRequest = {
  academicSemesterId?: string | undefined
  courseId?: string | undefined
}

export type IUserFilterRequest = {
  searchTerm?: string | undefined
  name?: string | undefined
  phoneNumber?: string | undefined
  email?: string | undefined
}
