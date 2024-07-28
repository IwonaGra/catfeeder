import { supabase } from "../utils/supabase";

export const uploadPhotoToServer = async (file) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const fileName = `${Date.now()}_${file.name}`;
	const filePath = `private/${fileName}`;

	const { data, error } = await supabase.storage
		.from("cats")
		.upload(filePath, file);

	if (error) {
		console.error("Error uploading file:", error);
		throw error;
	}

	const { data: urlData } = supabase.storage
		.from("cats")
		.getPublicUrl(filePath);

	return urlData.publicUrl;
};
