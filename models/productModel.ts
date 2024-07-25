import { Schema, model, models } from 'mongoose'

const productSchema = new Schema(
	{
		name: { type: { en: String, ru: String }, required: true },
		price: {
			type: Schema.Types.Mixed,
			required: true
		},
		ingredients: { type: { en: String, ru: String } },
		description: { type: { en: String, ru: String } },
		img_path: { type: String },
		category_id: { type: Schema.Types.ObjectId, ref: 'Category' }
	},
	{ timestamps: true }
)

export default models.Product || model('Product', productSchema)
