export const feedbackFilterableFields: string[] = [
  'searchTerm',
  'name',
  'email',
]

export const feedbackSearchableFields: string[] = ['name', 'email']

export const feedbackRelationalFields: string[] = ['serviceId']
export const feedbackRelationalFieldsMapper: { [key: string]: string } = {
  serviceId: 'service',
}
