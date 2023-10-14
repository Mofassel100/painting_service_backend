export type IService = {
  title: string
  name: string
  categoryId: string
  description: string
  userId: string
  image?: string | null
  price: number
  oldPrice: number
  location: string
  phoneNumber: string
  review: string
  rating: number
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
