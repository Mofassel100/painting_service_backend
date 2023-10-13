export const userFilterableFields: string[] = [
  'searchTerm',
  'email',
  'phoneNumber',
  'name',
]

export const userSearchableFields: string[] = ['name', 'email', 'phoneNumber']

export const userRelationalFields: string[] = [
  'academicFacultyId',
  'academicDepartmentId',
  'academicSemesterId',
]
export const userRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: 'academicFaculty',
  academicDepartmentId: 'academicDepartment',
  academicSemesterId: 'academicSemester',
}
