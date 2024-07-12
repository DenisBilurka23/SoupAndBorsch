export const userDto = data => ({
	phoneNumber: data?.phoneNumber,
	email: data?.email,
	name: data?.name,
	fullName: data?.fullName,
	streetAddress: data?.streetAddress,
	apt: data?.apt,
	city: data?.city,
	postalCode: data?.postalCode,
	profilePhoto: data?.profilePhoto
})
