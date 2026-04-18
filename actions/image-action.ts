'use server';

import { ProductImage } from '@prisma/client';

const apiKey = process.env.STORAGE_BUCKET_API_KEY!;
const appName = process.env.STORAGE_BUCKET_APP_NAME!;
const uploadEndpoint = process.env.STORAGE_BUCKET_UPLOAD_ENDPOINT!;
const bucketUrl = process.env.STORAGE_BUCEKT_URL!;

type UploadedImage = {
	public_id: string;
	image_url: string;
	altText: string;
};

export const uploadImageAction = async (
	files: File[],
	subFolder = ''
): Promise<UploadedImage[]> => {
	const formData = new FormData();
	files.forEach(file => formData.append('file', file));
	formData.append('subFolder', subFolder);

	const res = await fetch(`${uploadEndpoint}/upload`, {
		method: 'POST',
		body: formData,
		headers: {
			'x-api-key': apiKey,
			'x-app-name': appName,
			'x-sub-folder': subFolder
		}
	});

	const data = await res.json();

	if (!res.ok || !data.success) {
		console.log(data.message || 'Upload failed');
	}

	return data.data.files.map(
		(image: { id: any; url: any; storedName: string }) => {
			return {
				public_id: image.id,
				image_url: image.url,
				altText: image.storedName || ''
			};
		}
	);
};

export const deleteImageAction = async (
	id: string
): Promise<boolean> => {
	try {
		const res = await fetch(`${uploadEndpoint}/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': apiKey,
				'x-app-name': appName
			},
			body: JSON.stringify({ id })
		});

		const data = await res.json();

		if (!res.ok || !data.success) {
			console.error(
				'❌ Failed to delete image:',
				data.message || res.statusText
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error('❌ Exception while deleting image:', error);
		return false;
	}
};
