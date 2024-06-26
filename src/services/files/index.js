import { storage } from '@/config/firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

export const getPromoImage = async () => {
	try {
		const imagesRef = ref(storage, 'promos-images/');

		const res = await listAll(imagesRef);
		const images = res.items;

		images.sort((a, b) => b.name.localeCompare(a.name));
		const lastImageRef = images[0];
		const imageUrl = await getDownloadURL(lastImageRef);

		return imageUrl;
	} catch (error) {
		console.error(error);
	}
};

export const uploadImage = async file => {
	const now = new Date();
	const formattedDate = now
		.toISOString()
		.replace(/[:-]/g, '')
		.replace('T', '-')
		.replace(/\.\d{3}Z/, '');
	const imageName = `promo-${formattedDate}`;
	const filePath = `promos-images/${imageName}`;
	const storageRef = ref(storage, filePath);

	const imageSnapshot = await uploadBytes(storageRef, file);

	if (!imageSnapshot) throw new Error('Ocurrió un error al subir la imágen!');

	return imageSnapshot;
};
