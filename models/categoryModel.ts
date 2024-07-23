import { Schema, models, model } from 'mongoose'

const categorySchema = new Schema(
	{
		name: {
			en: { type: String, required: true },
			ru: { type: String, required: true }
		},
		img_path: { type: String }
	},
	{ timestamps: true }
)

export default models.Category || model('Category', categorySchema)
