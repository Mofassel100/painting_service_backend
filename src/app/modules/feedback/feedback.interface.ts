export type IFeedback = {
  email: string
  name?: string | null
  serviceId: string
  ratingScale?: string | null
  comment: string
}
export type IFeedbackFilterRequest = {
  searchTerm?: string | undefined
  name?: string | undefined
  email?: string | undefined
}
