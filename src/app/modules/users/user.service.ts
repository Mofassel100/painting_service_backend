/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { v2 as cloudinary} from 'cloudinary';
import config from '../../../config';
import { Request } from 'express';
// @ts-ignore
const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: config.cloudinary.cloudName, 
  api_key:config.cloudinary.apiKey, 
  api_secret: config.cloudinary.apiSecret 
});

const insertIntoDB = async (req: Request): Promise<void > => {
  // @ts-ignore

  //   const file = req.files.imageURL
  //   console.log(file)
  //  cloudinary.uploader.upload(file.tempFilePath,(err:any,result:any)=>{
  //     console.log(result)
    // })
    // const result = await prisma.academicFaculty.create({
    //     data
    // });

    // if (result) {
    //     await RedisClient.publish(EVENT_ACADEMIC_FACULTY_CREATED, JSON.stringify(result));
    // }


    // return result;
};

// const getAllFromDB = async (
//     filters: IAcademicFacultyFilterRequest,
//     options: IPaginationOptions
// ): Promise<IGenericResponse<AcademicFaculty[]>> => {
//     const { limit, page, skip } = paginationHelpers.calculatePagination(options);
//     const { searchTerm, ...filterData } = filters;

//     const andConditions = [];

//     if (searchTerm) {
//         andConditions.push({
//             OR: academicFacultySearchableFields.map((field) => ({
//                 [field]: {
//                     contains: searchTerm,
//                     mode: 'insensitive'
//                 }
//             }))
//         });
//     }

//     if (Object.keys(filterData).length > 0) {
//         andConditions.push({
//             AND: Object.keys(filterData).map((key) => ({
//                 [key]: {
//                     equals: (filterData as any)[key]
//                 }
//             }))
//         });
//     }

//     const whereConditions: Prisma.AcademicFacultyWhereInput =
//         andConditions.length > 0 ? { AND: andConditions } : {};

//     const result = await prisma.academicFaculty.findMany({
//         where: whereConditions,
//         skip,
//         take: limit,
//         orderBy:
//             options.sortBy && options.sortOrder
//                 ? { [options.sortBy]: options.sortOrder }
//                 : {
//                     createdAt: 'desc'
//                 }
//     });
//     const total = await prisma.academicFaculty.count({
//         where: whereConditions
//     });

//     return {
//         meta: {
//             total,
//             page,
//             limit
//         },
//         data: result
//     };
// };

// const getByIdFromDB = async (id: string): Promise<AcademicFaculty | null> => {
//     const result = await prisma.academicFaculty.findUnique({
//         where: {
//             id
//         }
//     });
//     return result;
// };

// const updateOneInDB = async (
//     id: string,
//     payload: Partial<AcademicFaculty>
// ): Promise<AcademicFaculty> => {
//     const result = await prisma.academicFaculty.update({
//         where: {
//             id
//         },
//         data: payload
//     });

//     if (result) {
//         await RedisClient.publish(EVENT_ACADEMIC_FACULTY_UPDATED, JSON.stringify(result));
//     }
//     return result;
// };

// const deleteByIdFromDB = async (id: string): Promise<AcademicFaculty> => {
//     const result = await prisma.academicFaculty.delete({
//         where: {
//             id
//         }
//     });

//     if (result) {
//         await RedisClient.publish(EVENT_ACADEMIC_FACULTY_DELETED, JSON.stringify(result));
//     }
//     return result;
// };


export const AcademicFacultyService = {
    insertIntoDB,
   
};