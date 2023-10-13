export const categoryFilterableFields: string[] = [
    'searchTerm',
    'name',
    'title',
    'userId',
  ]
  
  export const categorySearchableFields: string[] = ['name', 'title', 'userId']
  
  export const categoryRelationalFields: string[] = [
    'userId',
    
  ]
  export const categoryRelationalFieldsMapper: { [key: string]: string } = {
    userId: 'user',
   
  }
  