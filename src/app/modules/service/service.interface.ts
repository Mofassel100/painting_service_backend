export type IService = {
  title: string
  name: string
  categoryId: string
  description: string
  userId: string
  image?: string | undefined
  price?: string | undefined
  oldPrice?: string | undefined
  location: string
  phoneNumber: string
  review: string
  rating: string
  
}


export type IStudentMyCoursesRequest = {
  academicSemesterId?: string | undefined
  courseId?: string | undefined
}

export type IStudentMyCourseSchedulesRequest = {
  academicSemesterId?: string | undefined
  courseId?: string | undefined
}

export type IServiceFilterRequest = {
  searchTerm?: string | undefined
  name?: string | undefined
  title?: string | undefined
  location?: string | undefined
  price?: number | undefined
}
