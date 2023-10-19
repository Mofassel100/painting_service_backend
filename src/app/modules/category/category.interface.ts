export type ICategory ={
  
    title :string;
    name : string
    image? : string | null
    userId: string
}
  
  
  export type ICategoryFilterRequest = {
    searchTerm?: string | undefined
    name?: string | undefined
    title?: string | undefined
  }
  