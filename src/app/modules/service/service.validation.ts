import { z } from 'zod'

const createService = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is requred' }),
    name: z.string({ required_error: 'name is requred' }),
    categoryId: z.string({ required_error: 'categoryId is requred' }),
    description: z.string({ required_error: 'description is requred' }),
    userId: z.string({ required_error: 'userId is requred' }),

    image: z.string().optional(),
    price: z.number({ required_error: 'price is requred' }),
    oldPrice: z.number({ required_error: 'oldPrice is requred' }),
    location: z.string({ required_error: 'location is requred' }),
    phoneNumber: z.number({ required_error: 'phoneNumber is requred' }),
    review: z.string({ required_error: 'review is requred' }),
    rating: z.string({ required_error: 'rating is requred' }),
  }),
})
const updateService = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is requred' }).optional(),
    name: z.string({ required_error: 'name is requred' }).optional(),
    categoryId: z
      .string({ required_error: 'categoryId is requred' })
      .optional(),
    description: z
      .string({ required_error: 'description is requred' })
      .optional(),
    userId: z.string({ required_error: 'userId is requred' }).optional(),

    image: z.string().optional(),
    price: z.number({ required_error: 'price is requred' }).optional(),
    oldPrice: z.number({ required_error: 'oldPrice is requred' }).optional(),
    location: z.string({ required_error: 'location is requred' }).optional(),
    phoneNumber: z
      .number({ required_error: 'phoneNumber is requred' })
      .optional(),
    review: z.string({ required_error: 'review is requred' }).optional(),
    rating: z.string({ required_error: 'rating is requred' }).optional(),
  }),
})
export const ServiceValidation = {
  createService,
  updateService,
}
