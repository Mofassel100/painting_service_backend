export type IService = {
  title: string
  name: string
  categoryId: string
  description: string
  userId: string
  image?: string | undefined | null
  price?: string | undefined | null
  oldPrice?: string | undefined | null
  location: string
  phoneNumber: string
  review: string
  rating: string
  quantity: number | 1
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
  categoryId?: string | undefined
  userId?: string | undefined
}
export const IserviceRelationalFields: string[] = ['categoryId', 'userId']
export const IserviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
  userId: 'user',
}
