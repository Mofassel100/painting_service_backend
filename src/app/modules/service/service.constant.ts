export const serviceFilterableFields: string[] = [
  'searchTerm',
  'name',
  'title',
  'price',
  'location',
]

export const serviceSearchableFields: string[] = [
  'name',
  'title',
  'price',
  'location',
]

export const serviceRelationalFields: string[] = ['userId', 'categoryId']
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
  categoryId: 'category',
}
